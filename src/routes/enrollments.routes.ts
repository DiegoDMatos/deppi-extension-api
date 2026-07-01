import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import {
  enroll,
  updateStatus,
  listMyEnrollments,
  listCourseEnrollments,
  listHistory,
  approveEnrollment,
  rejectEnrollment,
  cancelEnrollment,
} from "../controllers/EnrollmentController";

const router = Router();
router.use(AuthMiddleware);

router.post("/", enroll);
router.get("/me", listMyEnrollments);
router.patch("/:enrollmentId/status", updateStatus);
router.get("/:enrollmentId/history", listHistory);
router.get("/course/:courseId", listCourseEnrollments);

router.patch("/:enrollmentId/approve", permissionMiddleware("enrollment.approve"), approveEnrollment);
router.patch("/:enrollmentId/reject", permissionMiddleware("enrollment.reject"), rejectEnrollment);
router.patch("/:enrollmentId/cancel", permissionMiddleware("enrollment.cancel"), cancelEnrollment);

export default router;