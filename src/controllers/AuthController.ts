import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { prisma } from "../lib/prisma";
import { RegisterStudentDto } from "@/model/RegisterStudentDto";
import { RegisterCivilServantDto } from "@/model/RegisterCivilServantDto";

export class AuthController {

  async registerStudent(request: Request, response: Response){

    const student: RegisterStudentDto = request.body;

    const authService = new AuthService();

    const user = await authService.registerStudent(student);

    return response.status(201).json(user);
  }

  async registerDEPPI(request: Request, response: Response){
    const civilServant: RegisterCivilServantDto = request.body;

    const authService = new AuthService();

    const user = await authService.registerDEPPI(civilServant);

    return response.status(201).json(user);
   }

   async registerProfessor(request: Request, response: Response){
    const civilServant: RegisterCivilServantDto = request.body;

    const authService = new AuthService();

    const user = await authService.registerProfessor(civilServant);

    return response.status(201).json(user);
   }

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