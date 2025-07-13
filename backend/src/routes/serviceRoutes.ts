import express, { Request, Response } from "express";
import {
  AuthenticatedRequest,
  authenticateJWT,
  authorizeAdmin,
} from "../middleware/authMiddleware";
import { verifyCsrfToken } from "../middleware/csrfMiddleware";
import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";

const router = express.Router();

// Criar um novo serviço (POST /)
router.post(
  "/",
  authenticateJWT,
  authorizeAdmin,
  verifyCsrfToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const {
      name,
      description,
      price,
      category,
      minPackages,
      unitCount,
      unitType,
      maxPackages,
      providerServiceId,
      providerRate,
    } = req.body;

    if (
      !name ||
      !description ||
      typeof price !== "number" ||
      price <= 0 ||
      !category ||
      typeof unitCount !== "number" ||
      unitCount <= 0 ||
      !unitType ||
      typeof unitType !== "string" ||
      typeof providerServiceId !== "number" ||
      typeof providerRate !== "number" ||
      providerRate <= 0
    ) {
      return res.status(400).json({
        message:
          "Todos os campos (nome, descrição, preço, categoria, unidades por pacote, tipo de unidade, min/max pacotes, ID e taxa do fornecedor) são obrigatórios e válidos.",
      });
    }

    try {
      const service = await prisma.service.create({
        data: {
          name,
          description,
          price: new Prisma.Decimal(price),
          category,
          unitCount,
          unitType,
          minPackages: minPackages,
          maxPackages: maxPackages,
          providerServiceId: providerServiceId.toString(),
          providerRate: new Prisma.Decimal(providerRate),
        },
      });
      res.status(201).json({ message: "Serviço criado com sucesso!", service });
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("name")) {
        return res
          .status(409)
          .json({ message: "Já existe um serviço com esse nome." });
      }
      console.error("Erro ao criar serviço:", error);
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao criar serviço." });
    }
  },
);

// Listar todos os serviços (GET /)
router.get("/", async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
    res.status(200).json(services);
  } catch (error) {
    console.error("Erro ao listar serviços:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao listar serviços." });
  }
});

export default router;
