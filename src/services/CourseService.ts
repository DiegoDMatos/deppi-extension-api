import { prisma } from '../lib/prisma';
import { CreateCourseInput } from "../model/Course";

export class CourseService {
  async create(data: CreateCourseInput) {
     if (new Date(data.startDate) >= new Date(data.endDate)) {
      throw new Error("A data de início deve ser anterior à data de término.");
    }

    return await prisma.course.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      }
    });
  }

  async findAll() {
    return await prisma.course.findMany({
      orderBy: {
        startDate: 'desc'
      }
    });
  }

  async delete(id: string) {
    const courseExists = await prisma.course.findUnique({
      where: { id }
    });

    if (!courseExists) {
      throw new Error("Curso não encontrado.");
    }

    return await prisma.course.delete({
      where: { id }
    });
  }

  async update(id: string, data: Partial<CreateCourseInput>) {
    const courseExists = await prisma.course.findUnique({
      where: { id }
    });

    if (!courseExists) {
      throw new Error("Curso não encontrado.");
    }

    const finalStartDate = data.startDate ? new Date(data.startDate) : courseExists.startDate;
    const finalEndDate = data.endDate ? new Date(data.endDate) : courseExists.endDate;

    if (finalStartDate >= finalEndDate) {
      throw new Error("A data de início deve ser anterior à data de término.");
    }

    const updateData = { ...data };
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate) updateData.endDate = new Date(data.endDate);

    return await prisma.course.update({
      where: { id },
      data: updateData
    });
  }
}