import jwt from "jsonwebtoken";
import express, { Request, Response, RequestHandler } from "express";
import prisma from "../utils/prisma";
import { generateCsrfToken } from "../utils/csrf";
import { verifyCsrfToken } from "../middleware/csrfMiddleware";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "abacaxi123"; // Lembrar de mudar no futuro

// Rota para obter o token CSRF
router.get("/csrf-token", (req: Request, res: Response) => {
  const csrfToken = generateCsrfToken();
  res.cookie("csrfToken", csrfToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });
  res.json({ csrfToken });
});

// Rota de Registro do Usuário
router.post(
  "/register",
  verifyCsrfToken as RequestHandler,
  async (req: Request, res: Response): Promise<void> => {
    const { password, name, email: rawEmail } = req.body;
    const email =
      typeof rawEmail === "string" ? rawEmail.toLowerCase() : undefined;

    if (!email || !password) {
      res
        .status(400)
        .json({ message: "Email e senha são obrigatórios." });
      return;
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        res.status(409).json({ message: "Email já cadastrado." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: Role.USER,
        },
      });

      res.status(201).json({
        message: "Usuário registrado com sucesso!",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Erro no registro:", error);
      res
        .status(500)
        .json({ message: "Erro interno no servidor ao registrar usuário." });
      return;
    }
  },
);

// Rota de Login de Usuário
router.post("/login", verifyCsrfToken as RequestHandler, async (req: Request, res: Response): Promise<void> => {
  const { password } = req.body;
  const email =
    typeof req.body.email === "string"
      ? req.body.email.toLowerCase()
      : undefined;

  if (!email || !password) {
    res.status(400).json({ message: "Email e senha são obrigatórios." });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: "Credenciais inválidas." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciais inválidas." });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    const csrfToken = generateCsrfToken();
    res.cookie("csrfToken", csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      csrfToken: csrfToken,
    });
  } catch (error) {
      console.error("Erro no login:", error);
      res
        .status(500)
        .json({ message: "Erro interno no servidor ao logar usuário." });
      return;
    }
});

export default router;
