import { z } from "zod";

export const registerStudentSchema = z.object({
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

  socialName: z
    .string()
    .max(100, "Nome social deve ter no máximo 100 caracteres")
    .optional(),

  educationLevel: z
    .string({ error: "Nível de escolaridade é obrigatório" })
    .min(1, "Nível de escolaridade é obrigatório"),

  occupation: z
    .string({ error: "Ocupação é obrigatória" })
    .min(1, "Ocupação é obrigatória"),

  perCapitaIncome: z
    .number({ error: "Renda per capita é obrigatória" })
    .nonnegative("Renda per capita não pode ser negativa"),
});

export type RegisterStudentDto = z.infer<typeof registerStudentSchema>;