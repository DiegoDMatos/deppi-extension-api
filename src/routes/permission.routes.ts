import { Router } from "express";
import { PermissionController } from "../controllers/PermissionController";
import { permissionMiddleware } from "@/middlewares/permission.middleware";
import { AuthMiddleware } from "@/middlewares/AuthMiddleware";

const router = Router();

const controller = new PermissionController();

router.use(AuthMiddleware);
router.post("/permissions", permissionMiddleware())

