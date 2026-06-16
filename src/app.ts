import express from "express";
import { authRoutes } from "./routes/auth.routes";
import { permissionRouter } from "./routes/permission.routes";
import { roleRouter } from "./routes/role.routes";
import { courseRouter } from "./routes/courser.routes";
import enrollmentRoutes from "./routes/enrollments.routes";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use(permissionRouter);
app.use(roleRouter);
app.use('/courses', courseRouter);
app.use("/enrollments", enrollmentRoutes);
export { app };