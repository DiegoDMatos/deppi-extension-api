import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export class AuthService {

  async register({ name, email, password }: RegisterData) {

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if(userAlreadyExists){
      throw new Error("Usuário já existe");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash
      }
    });

    return {
            id: user.id,
            name: user.name,
            email: user.email
        };
  }
}