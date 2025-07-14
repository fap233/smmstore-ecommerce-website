import { Router, RequestHandler } from "express";
import { authenticateJWT, authorizeAdmin } from "../middleware/authMiddleware";
import {
  createOrderHandler,
  getMyOrdersHandler,
  getAllOrders,
} from "../controllers/order.controller";

const router = Router();

router.post("/", authenticateJWT as RequestHandler, createOrderHandler);

router.get("/me", authenticateJWT as RequestHandler, getMyOrdersHandler);

router.get(
  "/all",
  authenticateJWT as RequestHandler,
  authorizeAdmin as RequestHandler,
  getAllOrders as RequestHandler,
);

export default router;
