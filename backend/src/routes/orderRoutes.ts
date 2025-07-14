import { Router, RequestHandler } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import {
  createOrderHandler,
  getMyOrdersHandler,
} from "../controllers/order.controller";

const router = Router();

router.post("/", authenticateJWT as RequestHandler, createOrderHandler);

router.get("/me", authenticateJWT as RequestHandler, getMyOrdersHandler);

export default router;
