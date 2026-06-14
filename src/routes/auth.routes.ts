import { Router } from "express";

import { AuthController } from "../controllers/AuthController";

import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/register", authController.registerStudent);
authRoutes.post("/admin/servidores", authController.registerServidor);
authRoutes.post("/login", authController.login);

authRoutes.get(
  "/me",
  AuthMiddleware,
  authController.me
);

export { authRoutes };