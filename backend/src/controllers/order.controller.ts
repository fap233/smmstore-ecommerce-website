// backend/src/controllers/order.controller.ts

import { Request, Response, RequestHandler } from "express";
import prisma from '../utils/prisma';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// A MUDANÇA ESTÁ AQUI: : Promise<void>
export const createOrderHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { serviceId, packages, link } = req.body;
  const userId = req.user?.id;

  if (!serviceId || !packages || !link || !userId) {
    res.status(400).json({ message: 'Dados do pedido incompletos.' });
    return; // Este 'return' corresponde ao tipo 'void'
  }

  try {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service || service.providerRate === null) {
      res.status(404).json({ message: 'Serviço não encontrado ou inválido.' });
      return;
    }

    const totalAmount = (service.providerRate?.toNumber() ?? 0) * packages;

    const newOrder = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: 'PENDING_PAYMENT',
        paymentStatus: 'PENDING',
        providerStatus: 'PENDING',
        orderLines: {
          create: {
            serviceId,
            quantity: packages,
            unitPrice: service.providerRate ?? 0,
            link,
          },
        },
      },
      include: {
        orderLines: true,
      },
    });

    res.status(201).json(newOrder);
    // Não precisa de 'return' aqui, o fim da função já é um retorno void.

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao criar pedido.' });
  }
};

// A MUDANÇA ESTÁ AQUI: : Promise<void>
export const getMyOrdersHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado." });
    return;
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        orderLines: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(orders);
    return;
  } catch (error) {
    console.error("Erro ao buscar pedidos", error);
    res.status(500).json({ message: "Erro ao buscar histórico de pedidos." });
    return;
  }
};

// Handler para buscar todos os pedidos (apenas para administradores)
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { email: true, name: true } }, // Incluir informações básicas do usuário
        orderLines: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(orders);
    return;
  } catch (error) {
    console.error("Erro ao buscar todos os pedidos:", error);
    res.status(500).json({ message: "Erro ao buscar todos os pedidos." });
    return;
  }
};