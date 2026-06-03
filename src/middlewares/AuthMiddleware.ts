import { Request, Response, NextFunction } from "express";

export async function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  request.user = {
    id: "123"
  };

  next();
}