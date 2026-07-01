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
      return res.status(400).json({ message: error.message || "Erro interno do servidor." });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const courses = await courseService.findAll();
      
      // Retorna a lista de cursos com status 200 (OK)
      return res.status(200).json(courses);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Erro interno do servidor." });
    }
  }

  async getCourseEnrollmentsReport(req: Request, res: Response){
    try{
      const { id } = req.params;

      if(!id || typeof id !== 'string'){
      return res.status(400).json({message: "ID inválido ou ausente." });
      }
      const courseEnrollments = await courseService.getCourseEnrollmentsReport(id);

      if(!courseEnrollments){
        return res.status(404).json({message: "Curso não encontrado"});
      }

      return res.status(200).json(courseEnrollments);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getGeneralReport(req: Request, res: Response) {
    try {
      const generalReport = await courseService.getGeneralReport();

      return res.status(200).json(generalReport);
    } catch (error) {
      return res.status(500).json({
        message: "Erro interno do servidor.",
      });
    }
}

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params; 
      
      // Chama o método delete do Service passando esse ID
    
      if(!id || typeof id !== 'string'){
      return res.status(400).json({message: "ID inválido ou ausente." });
      }
       await courseService.delete(id);
      // Retorna status 204 (No Content) indicando sucesso sem corpo de resposta
      return res.status(204).send();
    } catch (error: any) {
      // Se o curso não for encontrado (erro que tratamos no service), cai aqui
      return res.status(404).json({ message: error.message || "Curso não encontrado" });
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params; 
      const updateData = req.body;
      if(!id || typeof id !== 'string'){
        return res.status(400).json({message: "ID inválido ou ausente." });
      }
      const updatedCourse = await courseService.update(id, updateData);
      return res.status(200).json(updatedCourse);
    } catch (error: any) {
      return res.status(404).json({ message: error.message || "Curso não encontrado" });
    }
  }
}