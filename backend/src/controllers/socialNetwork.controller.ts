import { Request, Response } from "express";
import prisma from "../utils/prisma";

// Criar uma nova rede social
export const createSocialNetwork = async (req: Request, res: Response): Promise<void> => {
  const { name, icon } = req.body;

  if (!name) {
    res.status(400).json({ message: "Nome da rede social é obrigatório." });
    return;
  }

  try {
    const socialNetwork = await prisma.socialNetwork.create({
      data: {
        name,
        icon,
      },
    });
    res.status(201).json(socialNetwork);
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(409).json({ message: "Rede social com este nome já existe." });
      return;
    }
    console.error("Erro ao criar rede social:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Listar todas as redes sociais
export const getAllSocialNetworks = async (req: Request, res: Response): Promise<void> => {
  try {
    const socialNetworks = await prisma.socialNetwork.findMany({
      orderBy: { name: "asc" },
    });
    res.status(200).json(socialNetworks);
  } catch (error) {
    console.error("Erro ao buscar redes sociais:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Obter uma rede social por ID
export const getSocialNetworkById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const socialNetwork = await prisma.socialNetwork.findUnique({
      where: { id },
    });

    if (!socialNetwork) {
      res.status(404).json({ message: "Rede social não encontrada." });
      return;
    }
    res.status(200).json(socialNetwork);
  } catch (error) {
    console.error("Erro ao buscar rede social por ID:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Atualizar uma rede social
export const updateSocialNetwork = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, icon } = req.body;

  if (!name) {
    res.status(400).json({ message: "Nome da rede social é obrigatório." });
    return;
  }

  try {
    const socialNetwork = await prisma.socialNetwork.update({
      where: { id },
      data: {
        name,
        icon,
      },
    });
    res.status(200).json(socialNetwork);
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(409).json({ message: "Rede social com este nome já existe." });
      return;
    }
    if (error.code === "P2025") {
      res.status(404).json({ message: "Rede social não encontrada." });
      return;
    }
    console.error("Erro ao atualizar rede social:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Deletar uma rede social
export const deleteSocialNetwork = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.socialNetwork.delete({
      where: { id },
    });
    res.status(204).send(); // No Content
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Rede social não encontrada." });
      return;
    }
    console.error("Erro ao deletar rede social:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
