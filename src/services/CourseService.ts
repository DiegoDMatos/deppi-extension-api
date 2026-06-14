import { prisma } from '../lib/prisma';

// Interface com os dados acadêmicos que o banco espera receber
export interface CreateCourseInput {
  institutionId: string;
  title: string;
  description?: string;
  actionType: string;
  thematicArea: string;
  extensionLine: string;
  startDate: Date;
  endDate: Date;
  minParticipants: number;
  maxParticipants: number;
  workload: number;
  location: string;
  funding?: string;
  institutionalProgram?: string;
  offeringModel: string;
  targetMunicipalities: string;
  evaluationMethods: string;
  marketingMethods: string;
  activitiesPerformed: string;
  responsibleName: string;
  presentation: string;
  justification: string;
  targetAudience: string;
  generalObjective: string;
  specificObjective: string;
  methodology: string;
  coverImage?: string;
}

export class CourseService {
  // 1. CRIAR CURSO
  async create(data: CreateCourseInput) {
    // Regra de negócio simples: Validação de datas
    if (new Date(data.startDate) >= new Date(data.endDate)) {
      throw new Error("The start date must be before the end date.");
    }

    // Salvando no banco através do Prisma
    return await prisma.course.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      }
    });
  }

  // 2. LISTAR TODOS OS CURSOS
  async findAll() {
    return await prisma.course.findMany({
      orderBy: {
        startDate: 'desc' // Ordena trazendo os cursos mais recentes primeiro
      }
    });
  }

  // 3. DELETAR UM CURSO PELO ID
  async delete(id: string) {
    // Validação: Verifica se o curso existe antes de tentar deletar
    const courseExists = await prisma.course.findUnique({
      where: { id }
    });

    if (!courseExists) {
      throw new Error("Course not found.");
    }

    // Se existir, deleta do banco de dados
    return await prisma.course.delete({
      where: { id }
    });
  }
}