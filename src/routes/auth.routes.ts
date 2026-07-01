import { Router } from "express";

import { AuthController } from "../controllers/AuthController";

import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { permissionMiddleware } from "@/middlewares/permission.middleware";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/register", authController.registerStudent);
authRoutes.post("/admin/servidores", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), authController.registerDEPPI);
authRoutes.post("/deppi/servidores", AuthMiddleware, permissionMiddleware("DEPPI_ROLES"),authController.registerProfessor);
authRoutes.post("/login", authController.login);

authRoutes.get(
  "/me",
  AuthMiddleware,
  authController.me
);

export { authRoutes };