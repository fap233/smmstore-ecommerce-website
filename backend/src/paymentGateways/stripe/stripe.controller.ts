import Stripe from "stripe";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";
import { Request, Response } from "express";
import { OrderStatus } from "@prisma/client";
import prisma from "../../utils/prisma";

// Configuração do Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-06-30.basil",
});

// Payment Intent
export const createPaymentIntentHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { orderId } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }
  if (!orderId) {
    return res.status(400).json({ message: "ID do pedido é obrigatório." });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId, userId: req.user.id },
      include: { orderLines: { include: { service: true } } },
    });

    if (!order) {
      return res.status(404).json({
        message: "Pedido não encontrado ou não pertence a este usuário.",
      });
    }
    if (order.status !== OrderStatus.PENDING) {
      return res
        .status(400)
        .json({ message: "Pedido já processado ou em status inválido." });
    }

    const amountInCents = Math.round(order.totalAmount.toNumber() * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "brl",
      metadata: {
        integration_check: "accept_a_payment",
        order_id: order.id,
        userId: req.user.id,
      },
      automatic_payment_methods: { enabled: true },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentGateway: "Stripe",
        paymentId: paymentIntent.id,
        paymentStatus: paymentIntent.status,
      },
    });

    res.status(200).json({
      message: "Payment Intent criado!",
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error("Erro ao criar Payment Intent:", error);
    res.status(500).json({
      message: error.message || "Erro interno ao criar Payment intent.",
    });
  }
};

// Função para lidar com o Webhook do Stripe (Será usada na rota)
export const stripeWebhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;

  //TODO: Em produção, você deve validar a assinatura do webhook!
  // const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  // try {
  //  event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  // } catch (err: any){
  //  console.error(`Webhook Error: ${err.message}`);
  //  return res.status(400).send(`Webhook Error: ${err.message}`);
  // }

  event = req.body;

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;
      console.log(
        `PaymentIntent for ${paymentIntentSucceeded.amount} was successful!`,
      );
      await prisma.order.update({
        where: { id: paymentIntentSucceeded.metadata?.order_id as string },
        data: {
          status: OrderStatus.COMPLETED,
          paymentStatus: "approved",
          paymentId: paymentIntentSucceeded.id,
        },
      });
      break;
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
      console.log(`PaymentIntent for ${paymentIntentFailed.amount} failed!`);
      await prisma.order.update({
        where: { id: paymentIntentFailed.metadata?.order_id as string },
        data: {
          status: OrderStatus.CANCELLED,
          paymentStatus: "rejected",
          paymentId: paymentIntentFailed.id,
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
};
