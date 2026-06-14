import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { prisma } from "../lib/prisma";
import { RegisterStudentDto } from "@/model/RegisterStudentDto";

export class AuthController {

  async registerStudent(request: Request, response: Response){

    const student: RegisterStudentDto = request.body;

    const authService = new AuthService();

    const user = await authService.registerStudent(student);

    return response.status(201).json(user);
  }

  async registerServidor(request: Request, response: Response){ }

  async login(request: Request, response: Response){

    const { email, password } = request.body;

    const authService = new AuthService();

    const result = await authService.login(
      email,
      password
    );

    return response.json(result);
  }

  async me(request: Request, response: Response){

    const users = await prisma.user.findMany();

    console.log(users);

    return response.json(users);
}
}