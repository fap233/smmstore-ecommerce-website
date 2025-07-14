import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || "abacaxi123"; // Trocar a senha depois

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.authToken;

  if (!token) {
    res
      .status(401)
      .json({ message: "Autenticação necessária: Token não fornecido." });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      res
        .status(403)
        .json({ message: "Autenticação falhou: Token inválido ou expirado." });
      return;
    }
    req.user = user;
    next();
  });
};

export const authorizeAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user || req.user.role !== Role.ADMIN) {
    res.status(403).json({
      message:
        "Acesso negado: Apenas administradores podem realizar esta ação.",
    });
    return;
  }
  next();
};
