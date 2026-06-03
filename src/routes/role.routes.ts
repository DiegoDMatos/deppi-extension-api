import { Router } from "express";

import { RoleController } from "@/controllers/RoleController";
import { permissionMiddleware } from "@/middleware/permission.middleware";

const router = Router();
const controller = new RoleController();

