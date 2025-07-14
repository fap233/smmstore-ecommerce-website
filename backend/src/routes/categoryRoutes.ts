import express, { RequestHandler } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { authenticateJWT, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

// Rotas para Category (CRUD completo, apenas para administradores)
router.post(
  "/",
  authenticateJWT as RequestHandler,
  authorizeAdmin as RequestHandler,
  createCategory,
);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put(
  "/:id",
  authenticateJWT as RequestHandler,
  authorizeAdmin as RequestHandler,
  updateCategory,
);
router.delete(
  "/:id",
  authenticateJWT as RequestHandler,
  authorizeAdmin as RequestHandler,
  deleteCategory,
);

export default router;
