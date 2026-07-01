import { optional, z } from "zod";

const cpfSchema = z
  .string()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((v) => v.length === 11, "CPF deve ter 11 dígitos")
  .refine((v) => !/^(\d)\1{10}$/.test(v), "CPF inválido")
  .refine((v) => {
    for (let t = 9; t < 11; t++) {
      let sum = 0;
      for (let c = 0; c < t; c++) {
        sum += Number(v[c]) * ((t + 1) - c);
      }
      if (Number(v[t]) !== ((10 * sum) % 11) % 10) return false;
    }
    return true;
  }, "CPF inválido");

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

    personalPhones: z
        .array(z.string())
        .optional(),

    cpf: cpfSchema,

    registrationName: z
        .string({ error: "Nome do registro é obrigatório" }),

    dateOfBirth: z
        .date({ error: issue => issue.input === undefined ? "Data de nascimento é obrigatória" : "Data inválida" }),

    maritalStatus: z
        .string({ error: "Estado civil é obrigatório" })
        .min(1, "Estado civil é obrigatório"),

    placeOfBirth: z
        .string({ error: "Local de nascimento é obrigatório" })
        .min(1, "Local de nascimento é obrigatório"),

    sex: z
        .string({ error: "Informe o sexo registrado no seu documento" })
        .min(1, "Informe o sexo registrado no seu documento"),

    bloodType: z
        .string()
        .optional(),

    rhFactor: z
        .string()
        .optional(),

    numberOfDependents: z
        .number({ error: "Número de dependentes é obrigatório" })
        .nonnegative("Número de dependentes não pode ser negativo"),

    raceEthnicity: z
        .string({ error: "Raça/Etnia é obrigatória" })
        .min(1, "Raça/Etnia é obrigatória"),

    fatherName: z
        .string()
        .optional(),

    motherName: z
        .string()
        .optional(),

    pisPasep: z
        .string({ error: "PIS/PASEP é obrigatório" })
        .min(1, "PIS/PASEP é obrigatório"),

    academicTitle: z
        .string({ error: "Titulação é obrigatória" })
        .min(1, "Titulação é obrigatória"),

    educationLevel: z
        .string({ error: "Escolaridade é obrigatória" })
        .min(1, "Escolaridade é obrigatória"),

    address: z
        .string({ error: "Endereço é obrigatório" })
        .min(1, "Endereço é obrigatório"),

    identityNumber: z
        .string({ error: "Número da identidade é obrigatório" })
        .min(1, "Número da identidade é obrigatório"),

    issuingAgency: z
        .string({ error: "Órgão expedidor é obrigatório" })
        .min(1, "Órgão expedidor é obrigatório"),

    issuingState: z
        .string({ error: "UF de expedição é obrigatória" })
        .min(2, "UF inválida")
        .max(2, "UF inválida"),

    issueDate: z
        .date({ error: issue => issue.input === undefined ? "Data de expedição é obrigatória" : "Data inválida" }),

    voterRegistrationNumber: z
        .string({ error: "Número do título de eleitor é obrigatório" })
        .min(1, "Número do título de eleitor é obrigatório"),

    electoralZone: z
        .string({ error: "Zona eleitoral é obrigatória" })
        .min(1, "Zona eleitoral é obrigatória"),

    electoralSection: z
        .string({ error: "Seção eleitoral é obrigatória" })
        .min(1, "Seção eleitoral é obrigatória"),

    voterRegistrationState: z
        .string({ error: "UF é obrigatório" })
        .min(2, "UF inválida")
        .max(2, "UF inválida"),

    registration: z
        .string()
        .optional(),

    preferredName: z
        .string()
        .optional(),

    institutionalEmail: z
        .string({ error: "E-mail institucional é obrigatório" })
        .email("E-mail institucional inválido"),

    siapeEmail: z
        .string()
        .email("E-mail SIAPE inválido")
        .optional(),

    passwordRecoveryEmail: z
        .string()
        .email("E-mail de recuperação inválido")
        .optional(),

    notificationEmail: z
        .string()
        .email("E-mail de notificação inválido")
        .optional(),

    googleClassroomEmail: z
        .string()
        .email("E-mail do Google Classroom inválido")
        .optional(),

    institutionalPhones: z
        .array(z.string())
        .min(1, "Informe ao menos um telefone institucional"),

    isInPGD: z
        .boolean({ error: "Informe se está no PGD" }),

    suapDepartment: z
        .string({ error: "Departamento SUAP é obrigatório" })
        .min(1, "Departamento SUAP é obrigatório"),

    siapeAssignmentLocation: z
        .string()
        .optional(),

    siapeExerciseLocation: z
        .string()
        .optional(),

    employmentStatus: z
        .string({ error: "Situação é obrigatória" })
        .min(1, "Situação é obrigatória"),

    workRegime: z
        .string()
        .optional(),

    workSchedule: z
        .string()
        .optional(),

    operatesXRayEquipment: z
        .boolean({ error: "Informe se opera equipamento de raio-x" }),

    publicServiceStartDate: z
        .string()
        .optional(),

    institutionAppointmentDate: z
        .string()
        .optional(),

    institutionExerciseStartDate: z
        .string()
        .optional(),

    positionAppointmentDate: z
        .string()
        .optional(),

    positionExerciseStartDate: z
        .string()
        .optional(),

    position: z
        .string({ error: "Cargo é obrigatório" })
        .min(1, "Cargo é obrigatório"),

    positionClass: z
        .string({ error: "Classe é obrigatória" })
        .min(1, "Classe é obrigatória"),

    standard: z
        .string({ error: "Padrão é obrigatório" })
        .min(1, "Padrão é obrigatório"),

    positionGroup: z
        .string({ error: "Grupo do cargo é obrigatório" })
        .min(1, "Grupo do cargo é obrigatório"),

    vacancyCode: z
        .string({ error: "Código da vaga é obrigatório" })
        .min(1, "Código da vaga é obrigatório"),

    // Dados bancários
    bank: z
        .string()
        .optional(),

    bankBranch: z
        .string()
        .optional(),

    checkingAccount: z
        .string()
        .optional(),
});

export type RegisterCivilServantDto = z.infer<typeof registerCivilServantSchema>;