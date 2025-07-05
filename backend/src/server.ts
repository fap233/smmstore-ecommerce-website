import { PrismaClient, Role, OrderStatus, Prisma } from "@prisma/client";
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
    return res.status(403).json({ message: "Formato de Token CSRF inválido." });
  }
  next();
}

// MiddleWare para verificar o token JWT e autenticar o usuário
// IIMPORTANTE: Este middleware ainda NÃO está completo para vericicar admin/roles
interface AuthenticatedRequest extends Request {
  user?: {
    // Adiciona a propriedade 'user' ao Request
    id: string;
    email: string;
    role: Role; // Use o enum Role aqui
  };
}

const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.authToken; // Pega o token de cookie httpOnly

  if (!token) {
    return res
      .status(401)
      .json({ message: "Autenticação necessária: Token não fornecido." });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Autenticação falhou: Token inválido ou expirado." });
    }
    req.user = user; // Anexa as informações do usuário ao objeto de requisição
    next();
  });
};

// Middleware para verificar se o usuário é ADMIN
const authorizeAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user || req.user.role !== Role.ADMIN) {
    return res.status(403).json({
      message:
        "Acesso negado: Apenas administradores podem realizar esta ação.",
    });
  }
  next();
};

// Rota de teste simples
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bem-vindo ao Backend do E-commerce SMM! API está online.",
  });
});

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
        { id: user.id, role: user.role }, // Payload do Token
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

// ----- Rotas de gestão de serviço (APENAS ADMIN POR ENQUANTO) -----

// Criar um novo serviço (POST /api/services)
app.post(
  "/api/services",
  authenticateJWT,
  authorizeAdmin,
  verifyCsrfToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const { name, description, price, category, minQuantity, maxQuantity } =
      req.body;

    if (
      !name ||
      !description ||
      typeof price !== "number" ||
      price <= 0 ||
      !category
    ) {
      return res.status(400).json({
        message:
          "Nome , descrição, preço (Válido)  e categoria são obrigatórios.",
      });
    }

    try {
      const service = await prisma.service.create({
        data: {
          name,
          description,
          price: new Prisma.Decimal(price), //converte para o tipo decimal do prisma
          category,
          minQuantity: minQuantity || 1, // Default 1
          maxQuantity: maxQuantity || 999999, // Default alto
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

// Listar todos os serviços (GET /api/services)
app.get("/api/services", async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
    res.status(200).json(services);
  } catch (error) {
    console.error("Erro ao listar serviços", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao listar serviços." });
  }
});

// ----- Rotas de Gestão de Pedidos (Requer Autenticação e CSRF) -----

// Criar um novo Pedido (POST /api/orders)
app.post(
  "/api/orders",
  authenticateJWT,
  verifyCsrfToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const { serviceId, quantity } = req.body; // serviceId deve ser o ID de um serviço existente

    if (!req.user) {
      //Apenas para garantir que o middleware JWT funcionou
      return res.status(401).json({ message: "Usuário não autenticado." });
    }
    if (!serviceId || typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({
        message: "ID do serviço e quantidade válidos são obrigatórios.",
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

      // Validação da quantidade mínima/máxima do serviço
      if (quantity < service.minQuantity || quantity > service.maxQuantity) {
        return res.status(400).json({
          message: `Quantidade fora dos limites permitidos para este serviço (${service.minQuantity}-${service.maxQuantity}).`,
        });
      }

      const unitPrice = service.price;
      const totalAmount = new Prisma.Decimal(quantity).mul(unitPrice); // Calcula o total

      const order = await prisma.order.create({
        data: {
          userId: req.user.id, // ID do usuário logado
          status: OrderStatus.PENDING, // Status inicial
          totalAmount,
          orderLines: {
            create: {
              serviceId: service.id,
              quantity,
              unitPrice,
              subtotal: totalAmount, // Para um único item, subtotal é o total
            },
          },
        },
        include: {
          orderLines: true, //Inclui os itens do pedido na Resposta
          user: { select: { id: true, email: true, name: true } }, // Incui dados básicos do usuário
        },
      });

      res.status(201).json({ message: "Pedido criado com sucesso!", order });
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao criar pedido. " });
    }
  },
);

// Listar pedidos do usuário (GET /api/orders/me)
app.get(
  "/api/orders/me",
  authenticateJWT,
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const orders = await prisma.order.findMany({
        where: { userId: req.user.id },
        include: {
          orderLines: { include: { service: true } }, // Inclui detalhes dos serviços nos itens
        },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(orders);
    } catch (error) {
      console.error("Erro ao listar pedidos do usuário:", error);
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao listar pedidos." });
    }
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
