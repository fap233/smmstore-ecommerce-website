import { Request, Response } from "express";
import prisma from "../utils/prisma";

// Criar uma nova categoria
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Nome da categoria é obrigatório." });
    return;
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).json(category);
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(409).json({ message: "Categoria com este nome já existe." });
      return;
    }
    console.error("Erro ao criar categoria:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Listar todas as categorias
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Obter uma categoria por ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      res.status(404).json({ message: "Categoria não encontrada." });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Erro ao buscar categoria por ID:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Atualizar uma categoria
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Nome da categoria é obrigatório." });
    return;
  }

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });
    res.status(200).json(category);
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(409).json({ message: "Categoria com este nome já existe." });
      return;
    }
    if (error.code === "P2025") {
      res.status(404).json({ message: "Categoria não encontrada." });
      return;
    }
    console.error("Erro ao atualizar categoria:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Deletar uma categoria
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: { id },
    });
    res.status(204).send(); // No Content
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Categoria não encontrada." });
      return;
    }
    console.error("Erro ao deletar categoria:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
