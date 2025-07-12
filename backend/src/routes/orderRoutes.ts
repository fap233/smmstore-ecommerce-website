import express, { Response } from "express";
import {
  AuthenticatedRequest,
  authenticateJWT,
} from "../middleware/authMiddleware";
import { verifyCsrfToken } from "../middleware/csrfMiddleware";
import prisma from "../utils/prisma";
import { OrderStatus, Prisma } from "@prisma/client";

const router = express.Router();

// Criar um novo pedido (POST /)
router.post(
  "/",
  authenticateJWT,
  verifyCsrfToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const { serviceId, quantity } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }
    if (!serviceId || typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({
        message: "ID do serviço e quantidade válidos são obrigatórios.",
      });
    }

    try {
      const service = await prisma.service.findUnique({
        where: { id: serviceId, isActive: true },
      });

      if (!service) {
        return res
          .status(404)
          .json({ message: "Serviço não encontrado ou inativo." });
      }

      if (quantity < service.minQuantity || quantity > service.maxQuantity) {
        return res.status(400).json({
          message: `Quantidade fora dos limites permitidos para este serviço (${service.minQuantity}-${service.maxQuantity}).`,
        });
      }

      const unitPrice = service.price;
      const totalAmount = new Prisma.Decimal(quantity).mul(unitPrice);

      const order = await prisma.order.create({
        data: {
          userId: req.user.id,
          status: OrderStatus.PENDING,
          totalAmount,
          orderLines: {
            create: {
              serviceId: service.id,
              quantity,
              unitPrice,
              subtotal: totalAmount,
            },
          },
        },
        include: {
          orderLines: true,
          user: { select: { id: true, email: true, name: true } },
        },
      });

      res.status(201).json({ message: "Pedido criado com sucesso!", order });
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao criar pedido." });
    }
  },
);

// Listar Pedidos do Usuário (GET /me)
router.get(
  "/me",
  authenticateJWT,
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const orders = await prisma.order.findMany({
        where: { userId: req.user.id },
        include: {
          orderLines: { include: { service: true } },
        },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error("Erro ao listar pedidos do usuário:", error);
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao listar pedidos." });
    }
  },
);

export default router;
