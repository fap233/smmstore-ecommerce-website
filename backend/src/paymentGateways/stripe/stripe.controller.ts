import { Request, Response } from "express";
import Stripe from "stripe";
import prisma from "../../utils/prisma";
import { supplierService } from "../../services/supplierService";

// Configuração do Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
  typescript: true,
});

export const createPaymentIntentHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { amount, orderId } = req.body;

  if (!amount || !orderId) {
    res
      .status(400)
      .json({ message: "Valor e id do pedido são obrigatórios." });
    return;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "brl",
      metadata: {
        orderId: orderId,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

export const stripeWebhookHandler = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`Erro na assinatura do webhook: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log("Pagamento bem-sucedido recebido:", paymentIntent.id);

    const orderId = paymentIntent.metadata.orderId;

    if (!orderId) {
      console.error("Webhook de sucesso sem orderId na metadata!");
      res.status(400).send("Erro: orderId não encontrado na metadata.");
    return;
    }

    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { orderLines: { include: { service: true } } },
      });

      if (!order) {
        console.error(
          `Pedido ${orderId} não encontrado no banco.`,
        );
        res.status(404).send("Pedido não encontrado.");
        return;
      }

      if (order.status !== "PENDING_PAYMENT") {
        console.log(`Pedido ${orderId} já foi processado. Ignorando.`);
        res.status(200).send("Pedido já processado.");
        return;
      }

      console.log(`Enviando pedido ${orderId} para o fornecedor...`);
      // const providerOrder = await supplierService.placeOrder(
      //   order.orderLines[0].service.providerServiceId,
      //   order.orderLines[0].quantity,
      //   order.orderLines[0].link,
      // );

      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PENDING",
          paymentStatus: "PAID",
          providerStatus: "SENT",
          // providerOrderId: providerOrder.order,
          paymentIntentId: paymentIntent.id,
        },
      });

      console.log(
        `Pedido ${orderId} atualizado e enviado para o fornecedor com sucesso!`,
      );
    } catch (error) {
      console.error(
        `Erro ao processa pedido ${orderId} após o pagamento:`,
        error,
      );
      res.status(500).send("Erro interno ao processar o pedido.");
      return;
    }
  }

  res.status(200).json({ recieved: true });
  return;
};
