import path from "path";
import { prisma } from "@/prisma/client";
import { showCoverRequest, uploadCoverRequest } from "../model/CourseCoverRequest";

export class CourseCoverService {
  async show({ courseId }: showCoverRequest) {
    const course = await prisma.course.findFirst({
      where: {
        id: courseId
      },
      include: {
        coverImage: true,
      },
    });

    if (!course) {
      throw new Error("Curso não encontrado");
    }

    if (!course.coverImage) {
      throw new Error("Imagem não encontrada");
    }

    return path.resolve(course.coverImage.path);
  }
  
  async upload({ courseId, file }: uploadCoverRequest) {

    if (!file) {
      throw new Error("Arquivo obrigatório");
    }

    // if folder uploads nao existe

    const course = await prisma.course.findFirst({
      where: {
        id: courseId
      },
    });

    if (!course) {
      throw new Error("Curso não encontrada");
    }

    const uploadedFile = await prisma.file.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
      },
    });

    await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        coverImage: {
          connect: { id: uploadedFile.id },
        },
      },
    });

    return uploadedFile;
  }
}