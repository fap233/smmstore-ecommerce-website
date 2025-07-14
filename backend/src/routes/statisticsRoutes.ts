import express, { RequestHandler } from "express";
import { authenticateJWT, authorizeAdmin } from "../middleware/authMiddleware";
import { getGeneralStatistics } from "../controllers/statistics.controller";

const router = express.Router();

// Rota para obter estatísticas gerais (apenas para administradores)
router.get(
  "/general",
  authenticateJWT as RequestHandler,
  authorizeAdmin as RequestHandler,
  getGeneralStatistics,
);

export default router;
