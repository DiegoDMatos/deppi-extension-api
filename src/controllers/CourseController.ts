import { Request, Response } from 'express';
// Ajuste o caminho abaixo se o seu arquivo for "course.service" em minúsculo
import { CourseService } from '../services/CourseService'; 

const courseService = new CourseService();

export class CourseController {
  // 1. CRIAR CURSO
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const courseData = req.body;
      const newCourse = await courseService.create(courseData);
      return res.status(201).json(newCourse);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Internal server error" });
    }
  }

  // 2. LISTAR TODOS OS CURSOS
  async list(req: Request, res: Response): Promise<Response> {
    try {
      // Chama o método findAll do Service
      const courses = await courseService.findAll();
      
      // Retorna a lista de cursos com status 200 (OK)
      return res.status(200).json(courses);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  }

  // 3. DELETAR UM CURSO
  async remove(req: Request, res: Response): Promise<Response> {
    try {
      // Pega o ID que vem na URL (ex: /courses/id-do-curso)
      const { id } = req.params; 
      
      // Chama o método delete do Service passando esse ID
    
      if(!id || typeof id !== 'string'){
      return res.status(400).json({message: "Invalid or missing course ID." });
      }
       await courseService.delete(id);
      // Retorna status 204 (No Content) indicando sucesso sem corpo de resposta
      return res.status(204).send();
    } catch (error: any) {
      // Se o curso não for encontrado (erro que tratamos no service), cai aqui
      return res.status(404).json({ message: error.message || "Course not found" });
    }
  }
}