import { PrismaClient, Role } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import crypto from "crypto";

const app = express();
const prisma = new PrismaClient(); // Instancia do Prisma
const port = process.env.PORT || 5000; // Porta para o backend, pode ser 5000 ou 3000
const JWT_SECRET = process.env.JWT_SECRET || "abacaxi123"; // WARNING ALTERAR CHAVE ANTES DO DEPLOY

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
    credentials: true,
  }),
);

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());
app.use(cookieParser());

// Função para gerar um token CSRF
function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex"); // Token de 32 bytes (64 caracteres hexadecimais)
}

// Middleware de verificação CSRF
function verifyCsrfToken(req: Request, res: Response, next: NextFunction) {
  const csrfCookie = req.cookies["csrfToken"];
  const csrfHeader = req.headers["x-csrf-token"];

  if (!csrfCookie || !csrfHeader) {
    return res.status(403).json({ message: "Token CSRF inválido." });
  }

  try {
    const csrfCookieBuffer = Buffer.from(csrfCookie, "hex");
    const csrfHeaderBuffer = Buffer.from(csrfHeader, "hex");

    if (
      csrfCookieBuffer.length !== csrfHeaderBuffer.length ||
      !crypto.timingSafeEqual(csrfCookieBuffer, csrfHeaderBuffer)
    ) {
      return res.status(403).json({ message: "Token CSRF inválido." });
    }
  } catch (error) {
    return res
      .status(403)
      .json({ messagem: "Formato de Token CSRF inválido." });
  }
  next();
}

// Rota para obter o token CSRF
app.get("/auth/csrf-token", (req: Request, res: Response) => {
  const csrfToken = generateCsrfToken();
  //Envie o token em um cookie NÃ́O httpOnly
  res.cookie("csrfToken", csrfToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });
  res.json({ csrfToken }); // Enviar o token em JSON
});

// Rota de teste simples
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bem-vindo ao Backend do E-commerce SMM! API está online.",
  });
});

// Rota de registro de Usuário
app.post(
  "/auth/register",
  verifyCsrfToken,
  async (req: Request, res: Response) => {
    const { password, name, email: rawEmail } = req.body;
    const email =
      typeof rawEmail === "string" ? rawEmail.toLowerCase() : undefined;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios." });
    }

    try {
      // Verificar se o usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(409).json({ message: "Email já cadastrado." });
      }

      // Gerar hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar o novo usuário no banco de dados
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: Role.USER,
        },
      });

      // Resposta de sucesso
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
      console.error("Erro no registro", error);
      res
        .status(500)
        .json({ message: "Erro interno no servidor ao registrar usuário." });
    }
  },
);

// Rota de login de Usuário
app.post(
  "/auth/login",
  verifyCsrfToken,
  async (req: Request, res: Response) => {
    const { password } = req.body;
    const email =
      typeof req.body.email === "string"
        ? req.body.email.toLowerCase()
        : undefined;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios." });
    }

    try {
      // Encontrar o usuário pelo email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas." });
      }

      // Comparar a senha fornecida com o hash salvo
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciais inválidas." });
      }

      // Gerar um token JWT
      const token = jwt.sign(
        { userID: user.id, role: user.role }, // Payload do Token
        JWT_SECRET, // Sua chave secreta
        { expiresIn: "1h" }, // Token expira em 1 hora (exemplo)
      );
      // token httpOnly
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      });

      // Gera e envia novo token CSRF no login
      const csrfToken = generateCsrfToken();
      res.cookie("csrfToken", csrfToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      });

      // Resposta de sucesso (não envie a senha hashed de volta!)
      res.status(200).json({
        message: "Login realizado com sucesso",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        csrfToken: csrfToken,
      });
    } catch (error) {
      console.error("Erro no login", error);
      res
        .status(500)
        .json({ message: "Erro interno no servidor ao logar usuário." });
    }
  },
);

app.post(
  "/api/protected-data",
  verifyCsrfToken,
  (req: Request, res: Response) => {
    res.json({ message: "Dados protegidos por CSRF e JWT (futuramente)." });
  },
);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
  console.log(`Acesse: http://localhost:${port}`);
});

// Desconectar o Prisma Client ao fechar a aplicação
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
