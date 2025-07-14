import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import prisma from "./utils/prisma";

// rotas modularizadas
import authRoutes from "./routes/authRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import orderRoutes from "./routes/orderRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import statisticsRoutes from "./routes/statisticsRoutes";
import socialNetworkRoutes from "./routes/socialNetworkRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();
const port = process.env.PORT || 5000; // porta para o backend, pode ser 5000 ou 3000

// Configuração do Stripe
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-06-30.basil",
});

// configuração do cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["get", "post", "put", "delete"],
    allowedHeaders: ["content-type", "authorization", "x-csrf-token"],
    credentials: true,
  }),
);

// middleware para parsear json no corpo das requisições
app.use(express.json());
app.use(cookieParser());

// rota de teste simples
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "bem-vindo ao backend do e-commerce smm! api está online.",
  });
});

// registro de rotas
app.use("/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/social-networks", socialNetworkRoutes);
app.use("/api/categories", categoryRoutes);

// inicia o servidor
app.listen(port, () => {
  console.log(`backend rodando na porta ${port}`);
  console.log(`acesse: http://localhost:${port}`);
});
