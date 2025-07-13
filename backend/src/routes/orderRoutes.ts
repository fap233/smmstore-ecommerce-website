// backend/src/routes/orderRoutes.ts
import express, { Response } from "express";
import {
  AuthenticatedRequest,
  authenticateJWT,
} from "../middleware/authMiddleware";
import { verifyCsrfToken } from "../middleware/csrfMiddleware";
import prisma from "../utils/prisma";
import { OrderStatus, Prisma } from "@prisma/client";
import { supplierService } from "../services/supplierService"; // <--- Importe o supplierService

const router = express.Router();

// REMOVIDO: const SUPPLIER_API_KEY = process.env.SUPPLIER_API_KEY; // Agora em upmidiass.api.ts
// REMOVIDO: const SUPPLIER_API_URL = process.env.SUPPLIER_API_URL; // Agora em upmidiass.api.ts
// REMOVIDO: import fetch from 'node-fetch'; // Agora em upmidiass.api.ts

// Criar um novo Pedido (POST /)
router.post(
  "/",
  authenticateJWT,
  verifyCsrfToken,
  async (req: AuthenticatedRequest, res: Response) => {
    // quantity AQUI É O NÚMERO DE PACOTES A SEREM COMPRADOS
    // link é a URL da mídia do cliente (Instagram, YouTube, etc.)
    const { serviceId, quantity, link: rawLink } = req.body; // <--- AGORA DESESTRUTURA O LINK
    const link = typeof rawLink === "string" ? rawLink : ""; // <--- GARANTE QUE LINK É STRING

    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }
    if (!serviceId || typeof quantity !== "number" || quantity <= 0 || !link) {
      // <--- VALIDAÇÃO CORRETA DO LINK E QUANTIDADE
      return res
        .status(400)
        .json({
          message:
            "ID do serviço, quantidade (de pacotes) e link da mídia são obrigatórios.",
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

      // Validação da quantidade MÍNIMA/MÁXIMA de PACOTES para este serviço
      if (quantity < service.minPackages || quantity > service.maxPackages) {
        // <--- USA minPackages/maxPackages
        return res
          .status(400)
          .json({
            message: `Quantidade de pacotes fora dos limites permitidos para este serviço (${service.minPackages}-${service.maxPackages}).`,
          });
      }

      const unitPrice = service.price; // Este é o PREÇO DE UM PACOTE
      const totalAmount = new Prisma.Decimal(quantity).mul(unitPrice); // totalAmount = (número de pacotes) * (preço por pacote)

      // --- VALORES A SEREM ENVIADOS PARA A API DO FORNECEDOR ---
      const totalUnitsToDeliver = quantity * service.unitCount; // Ex: 3 pacotes * 1000 seguidores/pacote = 3000 seguidores
      const supplierServiceId = service.providerServiceId; // ID do serviço no fornecedor
      const supplierProviderId = "upmidiass"; // ID do provedor que usaremos (fixo por enquanto, para futuros múltiplos provedores)

      if (!supplierServiceId) {
        console.error(
          "Erro de configuração do fornecedor: ID do serviço do fornecedor ausente no serviço cadastrado.",
        );
        return res
          .status(500)
          .json({ message: "Erro de configuração do fornecedor no serviço." });
      }

      // --- CHAMADA PARA A API DO FORNECEDOR VIA supplierService ---
      const supplierData = await supplierService.addOrder(
        supplierProviderId, // ID do provedor (ex: "upmidiass")
        supplierServiceId, // ID do serviço NO FORNECEDOR
        link, // Link da mídia do cliente
        totalUnitsToDeliver, // Quantidade TOTAL de unidades para o fornecedor
      );
      console.log("Resposta da API do Fornecedor (add order):", supplierData);

      if (supplierData.error) {
        console.error("Erro da API do Fornecedor:", supplierData.error);
        return res
          .status(500)
          .json({ message: `Erro do fornecedor: ${supplierData.error}` });
      }
      if (!supplierData.order) {
        // Verificar se o ID do pedido foi retornado
        console.error(
          "API do Fornecedor não retornou ID do pedido:",
          supplierData,
        );
        return res
          .status(500)
          .json({
            message:
              "Erro do fornecedor: Não foi possível obter o ID do pedido.",
          });
      }

      const providerOrderId = supplierData.order.toString();
      // -------------------------------------------------------------

      const order = await prisma.order.create({
        data: {
          userId: req.user.id,
          status: OrderStatus.PENDING, // Status inicial: PENDING
          totalAmount,
          orderLines: {
            create: {
              serviceId: service.id,
              quantity: quantity, // Quantidade de pacotes
              unitPrice: unitPrice, // Preço por pacote
              subtotal: totalAmount,
              link: link, // Campo 'link' salvo no OrderLine
            },
          },
          providerOrderId: providerOrderId,
          providerServiceId: supplierServiceId.toString(),
          providerStatus: "pending", // Status inicial no fornecedor
        },
        include: {
          orderLines: true,
          user: { select: { id: true, email: true, name: true } },
        },
      });

      // --- CORREÇÃO: FORMATAR VALORES DECIMAIS PARA STRING COM 2 CASAS DECIMAIS ---
      const formattedOrder = {
        ...order,
        totalAmount: order.totalAmount.toFixed(2),
        orderLines: order.orderLines.map((ol) => ({
          ...ol,
          unitPrice: ol.unitPrice.toFixed(2),
          subtotal: ol.subtotal.toFixed(2),
        })),
      };
      // -------------------------------------------------------------------------

      res
        .status(201)
        .json({ message: "Pedido criado com sucesso!", order: formattedOrder });
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao criar pedido. " });
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

      // --- CORREÇÃO: FORMATAR VALORES DECIMAIS PARA STRING COM 2 CASAS DECIMAIS AQUI TAMBÉM ---
      const formattedOrders = orders.map((order) => ({
        ...order,
        totalAmount: order.totalAmount.toFixed(2),
        orderLines: order.orderLines.map((ol) => ({
          ...ol,
          unitPrice: ol.unitPrice.toFixed(2),
          subtotal: ol.subtotal.toFixed(2),
        })),
      }));
      // -----------------------------------------------------------------------------------

      res.status(200).json(formattedOrders); // <--- Envia os pedidos formatados
    } catch (error) {
      console.error("Erro ao listar pedidos do usuário:", error);
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao listar pedidos." });
    }
  },
);

export default router;
