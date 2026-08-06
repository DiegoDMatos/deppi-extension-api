import { Request, Response } from 'express';
import { CourseService } from '../services/CourseService'; 

const courseService = new CourseService();

export class CourseController {

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
      const { search, thematicArea, offeringModel } = req.query;

      const courses = await courseService.findAll({
        search: search as string,
        thematicArea: thematicArea as string,
        offeringModel: offeringModel as string,
      });
      
      return res.status(200).json(courses);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Erro interno do servidor." });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: "ID inválido ou ausente." });
      }

      const course = await courseService.findById(id);

      return res.status(200).json(course);
    } catch (error: any) {
      return res.status(404).json({ message: error.message || "Curso não encontrado." });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: "ID inválido ou ausente." });
      }

      if (!status) {
        return res.status(400).json({ message: "O status é obrigatório." });
      }

      const updatedCourse = await courseService.updateStatus(id, status);
      return res.status(200).json(updatedCourse);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Erro ao atualizar status do curso." });
    }
  }

  async assignTeacher(req: Request, res: Response): Promise<Response> {
    try {
      const  id  = req.params.id;
      const  idTeacher  = req.params.idTeacher;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: "ID de curso inválido ou ausente." });
      }

      if (!idTeacher || typeof idTeacher !== 'string') {
        return res.status(400).json({ message: "O ID do professor é obrigatório." });
      }

      const updatedCourse = await courseService.assignTeacher(id, idTeacher);
      return res.status(200).json(updatedCourse);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Erro ao vincular professor." });
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
      const id = req.params.id; 

      if(!id || typeof id !== 'string'){
        return res.status(400).json({message: "ID inválido ou ausente." });
      }
      await courseService.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ message: error.message || "Curso não encontrado" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id; 
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