import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { RegisterData } from "../model/Auth";
import { RegisterStudentDto } from "@/model/RegisterStudentDto";
import { RegisterServidorDto } from "@/model/RegisterServidorDto";

export class AuthService {

  async registerStudent(student: RegisterStudentDto) {

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: student.email
      }
    });

    if(userAlreadyExists){
      throw new Error("Usuário já existe");
    }

    const passwordHash = await bcrypt.hash(student.password, 10);

    const user = await prisma.user.create({
      data: {
        name: student.name,
        email: student.email,
        passwordHash,

        student: {
          create: {
            educationLevel: student.educationLevel,
            occupation: student.occupation,
            perCapitaIncome: student.perCapitaIncome
          }
        },

        roles: {
          create: {
            role: {
              connect: {
                slug: "ALUNO"
              }
            }
          }
        }
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