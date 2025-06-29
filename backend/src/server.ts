import express from "express";

const app = express();
const port = process.env.PORT || 5000; // Porta para o backend, pode ser 5000 ou 3000

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Rota de teste simples
app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: "Bem-vindo ao Backend do E-commerce SMM! API está online.",
    });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
  console.log(`Acesse: http://localhost:${port}`);
});
