import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient(); // Instancia do Prisma
const port = process.env.PORT || 5000; // Porta para o backend, pode ser 5000 ou 3000
const JWT_SECRET = process.env.JWT_SECRET || "abacaxi123"; // WARNING ALTERAR CHAVE ANTES DO DEPLOY

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Rota de teste simples
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bem-vindo ao Backend do E-commerce SMM! API está online.",
  });
});

// Rota de registro de Usuário
app.post("/auth/register", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
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
        role: "user",
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
});

// Rota de login de Usuário
app.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ messagem: "Email e senha são obrigatórios." });
  }

  try {
    // Encontrar o usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciais invalidas." });
    }

    // Comparar a senha fornecida com o hash salvo
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ messge: "Credenciais inválidas." });
    }

    // Gerar um token JWT
    const token = jwt.sign(
      { userID: user.id, role: user.role }, // Payload do Token
      JWT_SECRET, // Sua chave secreta
      { expiresIn: "1h" }, // Token expira em 1 hora (exemplo)
    );

    // Resposta de sucesso (não envie a senha hashed de volta!)
    res.status(200).json({
      message: "Login realizado com sucesso",
      token, // Envie o token JWT
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erro no login", error);
    res
      .status(500)
      .json({ message: "Erro interno no servidor ao logar usuário." });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
  console.log(`Acesse: http://localhost:${port}`);
});

// Desconectar o Prisma Client ao fechar a aplicação
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
