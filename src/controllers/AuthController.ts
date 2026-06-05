import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { prisma } from "../lib/prisma";

export class AuthController {

  async register(request: Request, response: Response){

    const { name, email, password } = request.body;

    const authService = new AuthService();

    const user = await authService.register({
      name,
      email,
      password
    });

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