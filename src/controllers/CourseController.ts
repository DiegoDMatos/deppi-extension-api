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
      return res.status(400).json({ message: error.message || "Internal server error" });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      // Chama o método findAll do Service
      const courses = await courseService.findAll();
      
      return res.status(200).json(courses);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      // Pega o ID que vem na URL (ex: /courses/id-do-curso)
      const { id } = req.params; 
      
    
      if(!id || typeof id !== 'string'){
      return res.status(400).json({message: "Invalid or missing course ID." });
      }
       await courseService.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ message: error.message || "Course not found" });
    }
  }
}