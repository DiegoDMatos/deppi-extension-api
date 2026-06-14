import { Router } from 'express';
import { CourseController } from '../controllers/CourseController';

const courseRoutes = Router();
const courseController = new CourseController();

// 1. Rota para CRIAR: POST http://localhost:3333/courses
courseRoutes.post('/', courseController.create);

// 2. Rota para LISTAR: GET http://localhost:3333/courses
courseRoutes.get('/', courseController.list);

// 3. Rota para DELETAR: DELETE http://localhost:3333/courses/:id
courseRoutes.delete('/:id', courseController.remove);

export { courseRoutes };