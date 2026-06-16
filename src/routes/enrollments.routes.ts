import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import {
  enroll,
  updateStatus,
  listMyEnrollments,
  listCourseEnrollments,
  listHistory,
} from "../controllers/EnrollmentController";

const router = Router();
router.use(AuthMiddleware);

router.post("/", enroll);
router.get("/me", listMyEnrollments);
router.patch("/:enrollmentId/status", updateStatus);
router.get("/:enrollmentId/history", listHistory);
router.get("/course/:courseId", listCourseEnrollments);

export default router;