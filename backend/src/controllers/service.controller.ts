import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";

// Criar um novo serviço
export const createService = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    description,
    price,
    categoryId,
    socialNetworkId,
    unitCount,
    unitType,
    minPackages,
    maxPackages,
    providerServiceId,
    providerRate,
  } = req.body;

  if (
    !name ||
    !description ||
    typeof price !== "number" ||
    price <= 0 ||
    !categoryId ||
    !socialNetworkId ||
    typeof unitCount !== "number" ||
    unitCount <= 0 ||
    !unitType ||
    typeof unitType !== "string" ||
    typeof providerServiceId !== "string" || // providerServiceId pode ser string
    typeof providerRate !== "number" ||
    providerRate <= 0
  ) {
    res.status(400).json({
      message:
        "Todos os campos (nome, descrição, preço, categoria, rede social, unidades por pacote, tipo de unidade, min/max pacotes, ID e taxa do fornecedor) são obrigatórios e válidos.",
    });
    return;
  }

  try {
    const service = await prisma.service.create({
      data: {
        name,
        description,
        price: new Prisma.Decimal(price),
        category: { connect: { id: categoryId } },
        socialNetwork: { connect: { id: socialNetworkId } },
        unitCount,
        unitType,
        minPackages,
        maxPackages,
        providerServiceId,
        providerRate: new Prisma.Decimal(providerRate),
      },
    });
    res.status(201).json(service);
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("name")) {
      res.status(409).json({ message: "Já existe um serviço com esse nome." });
      return;
    }
    console.error("Erro ao criar serviço:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Listar todos os serviços
export const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await prisma.service.findMany({
      include: { category: true, socialNetwork: true }, // Incluir relações
      orderBy: { name: "asc" },
    });
    res.status(200).json(services);
  } catch (error) {
    console.error("Erro ao listar serviços:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Obter um serviço por ID
export const getServiceById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const service = await prisma.service.findUnique({
      where: { id },
      include: { category: true, socialNetwork: true },
    });

    if (!service) {
      res.status(404).json({ message: "Serviço não encontrado." });
      return;
    }
    res.status(200).json(service);
  } catch (error) {
    console.error("Erro ao buscar serviço por ID:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Atualizar um serviço
export const updateService = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    categoryId,
    socialNetworkId,
    unitCount,
    unitType,
    minPackages,
    maxPackages,
    isActive,
    providerServiceId,
    providerRate,
  } = req.body;

  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        description,
        price: price !== undefined ? new Prisma.Decimal(price) : undefined,
        categoryId: categoryId !== undefined ? categoryId : undefined,
        socialNetworkId: socialNetworkId !== undefined ? socialNetworkId : undefined,
        unitCount,
        unitType,
        minPackages,
        maxPackages,
        isActive,
        providerServiceId,
        providerRate: providerRate !== undefined ? new Prisma.Decimal(providerRate) : undefined,
      },
    });
    res.status(200).json(service);
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("name")) {
      res.status(409).json({ message: "Já existe um serviço com esse nome." });
      return;
    }
    if (error.code === "P2025") {
      res.status(404).json({ message: "Serviço não encontrado." });
      return;
    }
    console.error("Erro ao atualizar serviço:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Deletar um serviço
export const deleteService = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.service.delete({
      where: { id },
    });
    res.status(204).send(); // No Content
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Serviço não encontrado." });
      return;
    }
    console.error("Erro ao deletar serviço:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
