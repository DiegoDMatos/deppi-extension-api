import { z } from "zod";

const dateStringSchema = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida. Use o formato ISO 8601 (ex: 2024-01-15)",
  })
  .optional();

export const registerCivilServantSchema = z.object({
  name: z
    .string({ error: "Nome é obrigatório" })
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  email: z
    .string({ error: "E-mail é obrigatório" })
    .email("E-mail inválido"),

  password: z
    .string({ error: "Senha é obrigatória" })
    .min(8, "Senha deve ter pelo menos 8 caracteres"),

  registration: z.string().optional(),

  preferredName: z
    .string()
    .max(100, "Nome preferido deve ter no máximo 100 caracteres")
    .optional(),

  institutionalEmail: z
    .string({ error: "E-mail institucional é obrigatório" })
    .email("E-mail institucional inválido"),

  siapeEmail: z.string().email("E-mail SIAPE inválido").optional(),
  passwordRecoveryEmail: z.string().email("E-mail de recuperação inválido").optional(),
  notificationEmail: z.string().email("E-mail de notificação inválido").optional(),
  googleClassroomEmail: z.string().email("E-mail do Google Classroom inválido").optional(),

  institutionalPhones: z
    .array(z.string().min(1, "Telefone não pode ser vazio"))
    .min(1, "Pelo menos um telefone institucional é obrigatório"),

  isInPGD: z.boolean({ error: "Campo isInPGD é obrigatório" }),

  suapDepartment: z
    .string({ error: "Departamento SUAP é obrigatório" })
    .min(1, "Departamento SUAP é obrigatório"),

  siapeAssignmentLocation: z.string().optional(),
  siapeExerciseLocation: z.string().optional(),

  employmentStatus: z
    .string({ error: "Situação funcional é obrigatória" })
    .min(1, "Situação funcional é obrigatória"),

  workRegime: z.string().optional(),
  workSchedule: z.string().optional(),

  operatesXRayEquipment: z.boolean({ error: "Campo operatesXRayEquipment é obrigatório" }),

  publicServiceStartDate: dateStringSchema,
  institutionAppointmentDate: dateStringSchema,
  institutionExerciseStartDate: dateStringSchema,
  positionAppointmentDate: dateStringSchema,
  positionExerciseStartDate: dateStringSchema,

  position: z.string({ error: "Cargo é obrigatório" }).min(1, "Cargo é obrigatório"),
  positionClass: z.string({ error: "Classe do cargo é obrigatória" }).min(1, "Classe do cargo é obrigatória"),
  standard: z.string({ error: "Padrão é obrigatório" }).min(1, "Padrão é obrigatório"),
  positionGroup: z.string({ error: "Grupo do cargo é obrigatório" }).min(1, "Grupo do cargo é obrigatório"),
  vacancyCode: z.string({ error: "Código de vaga é obrigatório" }).min(1, "Código de vaga é obrigatório"),

  bank: z.string().optional(),
  bankBranch: z.string().optional(),
  checkingAccount: z.string().optional(),
});

export type RegisterCivilServantDto = z.infer<typeof registerCivilServantSchema>;