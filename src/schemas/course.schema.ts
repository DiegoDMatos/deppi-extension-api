import { z } from "zod";
import { COURSE_STATUS } from "../constants/course";

const validStatuses = Object.values(COURSE_STATUS) as [string, ...string[]];

const dateStringSchema = z
  .string({ error: "Data é obrigatória" })
  .min(1, "Data é obrigatória")
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida. Use o formato 2026-01-15",
  });

export const createCourseSchema = z.object({
  institutionId: z.string({ error: "institutionId é obrigatório" }),
  title: z.string({ error: "Título é obrigatório" }).min(3).max(100),
  description: z.string().optional(),
  actionType: z.string({ error: "Tipo de ação é obrigatório" }),
  thematicArea: z.string({ error: "Área temática é obrigatória" }),
  extensionLine: z.string({ error: "Linha de extensão é obrigatória" }),
  startDate: dateStringSchema,
  endDate: dateStringSchema,
  minParticipants: z
    .number({ error: "Mínimo de participantes é obrigatório" })
    .int()
    .nonnegative(),
  maxParticipants: z
    .number({ error: "Máximo de participantes é obrigatório" })
    .int()
    .positive(),
  workload: z
    .number({ error: "Carga horária é obrigatória" })
    .int()
    .positive(),
  location: z.string({ error: "Local é obrigatório" }),
  funding: z.string().optional(),
  institutionalProgram: z.string().optional(),
  offeringModel: z.string({ error: "Modelo de oferta é obrigatório" }),
  targetMunicipalities: z.string({ error: "Municípios-alvo é obrigatório" }),
  evaluationMethods: z.string({ error: "Métodos de avaliação é obrigatório" }),
  marketingMethods: z.string({ error: "Métodos de divulgação é obrigatório" }),
  activitiesPerformed: z.string({ error: "Atividades a serem realizadas é obrigatório" }),
  responsibleName: z.string({ error: "Nome do responsável é obrigatório" }),
  presentation: z.string({ error: "Apresentação é obrigatória" }),
  justification: z.string({ error: "Justificativa é obrigatória" }),
  targetAudience: z.string({ error: "Público-alvo é obrigatório" }),
  generalObjective: z.string({ error: "Objetivo geral é obrigatório" }),
  specificObjective: z.string({ error: "Objetivo específico é obrigatório" }),
  methodology: z.string({ error: "Metodologia é obrigatória" }),
});

export const updateCourseSchema = createCourseSchema.partial();

export const updateCourseStatusSchema = z.object({
  status: z.enum(validStatuses, {
    error: `Status inválido. Valores permitidos: ${validStatuses.join(", ")}`,
  }),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type UpdateCourseStatusInput = z.infer<typeof updateCourseStatusSchema>;