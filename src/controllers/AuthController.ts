import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

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
}