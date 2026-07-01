import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { CourseCoverController } from "../controllers/CourseCoverController";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { upload } from "../middlewares/UploadMiddleware";

const router = Router();
const controller = new CourseController();
const coverController = new CourseCoverController();

router.use(AuthMiddleware);

router.post("/courses", permissionMiddleware("CREATE_COURSES"), controller.create);
router.get("/courses", permissionMiddleware("VIEW_COURSES"), controller.list);
router.put("/courses/:id", permissionMiddleware("UPDATE_COURSES"), controller.update);
router.delete("/courses/:id", permissionMiddleware("DELETE_COURSES"), controller.remove);

router.post("courses/:courseid/cover", AuthMiddleware, upload.single("cover"), coverController.upload);
router.get("courses/:courseId/cover", AuthMiddleware, coverController.show);

export { router as courseRouter };