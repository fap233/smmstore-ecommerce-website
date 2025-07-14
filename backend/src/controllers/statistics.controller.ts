import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getGeneralStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    // Total de usuários
    const totalUsers = await prisma.user.count();

    // Total de serviços
    const totalServices = await prisma.service.count();

    // Total de pedidos
    const totalOrders = await prisma.order.count();

    // Faturamento total (soma de totalAmount de todos os pedidos concluídos)
    const totalRevenueResult = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: "COMPLETED", // Apenas pedidos concluídos
      },
    });
    const totalRevenue = totalRevenueResult._sum.totalAmount?.toNumber() || 0;

    // Pedidos concluídos (para KPI)
    const completedOrders = await prisma.order.count({
      where: {
        status: "COMPLETED",
      },
    });

    // Novos usuários (ex: nos últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsersLast30Days = await prisma.user.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    res.status(200).json({
      totalUsers,
      totalServices,
      totalOrders,
      totalRevenue,
      completedOrders,
      newUsersLast30Days,
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas gerais:", error);
    res.status(500).json({ message: "Erro interno do servidor ao buscar estatísticas." });
  }
};
