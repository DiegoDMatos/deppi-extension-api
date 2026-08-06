import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const controller = new CourseController();


router.get("/courses/reports/general", AuthMiddleware, permissionMiddleware("MANAGE_COURSES"), controller.getGeneralReport);
router.get("/courses/:id/reports/enrollments", AuthMiddleware, permissionMiddleware("MANAGE_COURSES"), controller.getCourseEnrollmentsReport);


router.get("/courses", controller.list);
router.get("/courses/:id", controller.findById);


router.post("/courses", AuthMiddleware, permissionMiddleware("CREATE_COURSES"), controller.create);
router.put("/courses/:id", AuthMiddleware, permissionMiddleware("UPDATE_COURSES"), controller.update);
router.patch("/courses/:id/status", AuthMiddleware, permissionMiddleware("UPDATE_COURSES"), controller.updateStatus);
router.patch("/courses/:id/teacher/:idTeacher", AuthMiddleware, permissionMiddleware("UPDATE_COURSES"), controller.assignTeacher);
router.delete("/courses/:id", AuthMiddleware, permissionMiddleware("DELETE_COURSES"), controller.remove);

export { router as courseRouter };