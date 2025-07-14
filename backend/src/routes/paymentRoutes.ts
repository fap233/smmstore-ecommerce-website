import express, { RequestHandler } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import { verifyCsrfToken } from "../middleware/csrfMiddleware";
import {
  createPaymentIntentHandler,
  stripeWebhookHandler,
} from "../paymentGateways/stripe/stripe.controller";

const router = express.Router();

// Rota para criar Payment Intent (POST /api/payments/create-payment-intent)
router.post(
  "/create-payment-intent",
  authenticateJWT as RequestHandler,
  verifyCsrfToken as RequestHandler,
  createPaymentIntentHandler,
);

// Rota para Webhook/Notificações do Stripe (POST /api/payments/webhook/stripe)
// OBS: O express.raw precisa vir aqui, antes do handler, pois ele altera o req.body
router.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }) as RequestHandler,
  stripeWebhookHandler,
);

export default router;
