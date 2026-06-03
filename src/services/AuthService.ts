import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

async login(email: string, password: string){

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if(!user){
    throw new Error("Email ou senha inválidos");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if(!passwordMatch){
    throw new Error("Email ou senha inválidos");
  }

  const token = jwt.sign(
    {
      sub: user.id
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d"
    }
  );

  return {
    token
  };
}

}