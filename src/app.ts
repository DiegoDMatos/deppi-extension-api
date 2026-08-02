import express from "express";
import { authRoutes } from "./routes/auth.routes";
import { permissionRouter } from "./routes/permission.routes";
import { roleRouter } from "./routes/role.routes";
import { courseRouter } from "./routes/courses.routes";
import enrollmentRoutes from "./routes/enrollments.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use(permissionRouter);
app.use(roleRouter);
app.use(courseRouter);
app.use("/enrollments", enrollmentRoutes);
export { app };