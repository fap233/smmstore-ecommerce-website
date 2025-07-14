import express, { RequestHandler } from "express";
import {
  createSocialNetwork,
  getAllSocialNetworks,
  getSocialNetworkById,
  updateSocialNetwork,
  deleteSocialNetwork,
} from "../controllers/socialNetwork.controller";
import { authenticateJWT, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

// Rotas para SocialNetwork (CRUD completo, apenas para administradores)
router.post(
  "/",
  authenticateJWT as RequestHandler,
  authorizeAdmin as RequestHandler,
  createSocialNetwork,
);
router.get("/", getAllSocialNetworks);
router.get("/:id", getSocialNetworkById);
router.put(
  "/:id",
  authenticateJWT as RequestHandler,
  authorizeAdmin as RequestHandler,
  updateSocialNetwork,
);
router.delete(
  "/:id",
  authenticateJWT as RequestHandler,
  authorizeAdmin as RequestHandler,
  deleteSocialNetwork,
);

export default router;
