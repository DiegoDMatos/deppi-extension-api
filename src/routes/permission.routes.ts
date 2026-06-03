import { Router } from "express";
import { PermissionController } from "../controllers/PermissionController";
import { permissionMiddleware } from "@/middleware/permission.middleware";

const router = Router();

const controller = new PermissionController();


