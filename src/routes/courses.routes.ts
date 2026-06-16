import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const controller = new CourseController();

router.use(AuthMiddleware);

router.post("/courses", permissionMiddleware("CREATE_COURSES"), controller.create);
router.get("/courses", permissionMiddleware("VIEW_COURSES"), controller.list);
router.put("/courses/:id", permissionMiddleware("UPDATE_COURSES"), controller.update);
router.delete("/courses/:id", permissionMiddleware("DELETE_COURSES"), controller.remove);

export { router as courseRouter };