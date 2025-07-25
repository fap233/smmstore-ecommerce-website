import express, { RequestHandler } from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controller";
import { authenticateJWT, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

// Rotas para Service (CRUD completo, apenas para administradores)
router.post(
  "/",
  authenticateJWT as RequestHandler,
  authorizeAdmin as RequestHandler,
  createService,
);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put(
  "/:id",
  authenticateJWT as RequestHandler,
  authorizeAdmin as RequestHandler,
  updateService,
);
router.delete(
  "/:id",
  authenticateJWT as RequestHandler,
  authorizeAdmin as RequestHandler,
  deleteService,
);

export default router;