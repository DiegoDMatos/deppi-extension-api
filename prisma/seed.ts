import { prisma } from "../src/prisma/client";

import bcrypt from "bcryptjs";

async function main() {
  const adminRole = await prisma.role.upsert({
  where: {
    slug: "ADMIN",
  },
  update: {},
  create: {
    slug: "ADMIN",
    name: "ADMINISTRADOR",
    description: "Administrador",
  },
});

  await prisma.role.upsert({
  where: { slug: "ALUNO" },
  update: {},
  create: {
    slug: "ALUNO",
    name: "ALUNO",
    description: "Aluno",
  },
});

  const deppiRole = await prisma.role.upsert({
  where: { slug: "DEPPI" },
  update: {},
  create: {
    slug: "DEPPI",
    name: "DEPPI",
    description: "Deppi",
  },
});

const deppiPermissions = [
  "enrollment.approve",
  "enrollment.reject",
  "enrollment.cancel",
  "DEPPI_ROLES",
  "CREATE_COURSES",
  "VIEW_COURSES",
  "UPDATE_COURSES",
  "DELETE_COURSES",
];

for (const permissionSlug of deppiPermissions) {
  const permission = await prisma.permission.upsert({
    where: { slug: permissionSlug },
    update: {},
    create: {
      slug: permissionSlug,
      name: permissionSlug,
    },
  });

  await prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId: deppiRole.id,
        permissionId: permission.id,
      },
    },
    update: {},
    create: {
      roleId: deppiRole.id,
      permissionId: permission.id,
    },
  });
}

    await prisma.role.upsert({
  where: { slug: "PROFESSOR" },
  update: {},
  create: {
    slug: "PROFESSOR",
    name: "PROFESSOR",
    description: "Professor",
  },
});
  const permissions = [
    "CREATE_USER",
    "MANAGE_PERMISSIONS",
    "MANAGE_ROLES",
    "MANAGE_USERS",
    "VIEW_PERMISSIONS",
    "DEPPI_ROLES",
    "CREATE_COURSES",
    "VIEW_COURSES",
    "UPDATE_COURSES",
    "DELETE_COURSES",
  ];

  for (const permissionName of permissions) {
    const permission = await prisma.permission.upsert({
      where: { slug: permissionName },
      update: {},
      create: {
        slug: permissionName,
        name: permissionName,
      },
    });

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });

  }

  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: { email: "admin@email.com" },
    update: {
      name: "Admin",
      passwordHash,
    },
    create: {
      name: "Admin",
      email: "admin@email.com",
      passwordHash,
      personalPhones: ["88999990000"],
      cpf: "11111111111",
      registrationName: "Administrador do Sistema",
      dateOfBirth: new Date("1990-01-01"),
      maritalStatus: "Solteiro",
      placeOfBirth: "Crato",
      sex: "Masculino",
      numberOfDependents: 0,
      raceEthnicity: "Branca",
      pisPasep: "12345678901",
      academicTitle: "Bacharel",
      educationLevel: "Ensino Superior",
      address: "Rua das Flores, 100",
      identityNumber: "123456789",
      issuingAgency: "SSP",
      issuingState: "CE",
      issueDate: new Date("2010-01-01"),
      voterRegistrationNumber: "123456789012",
      electoralZone: "001",
      electoralSection: "001",
      voterRegistrationState: "CE",
      roles: {
        create: {
          roleId: adminRole.id,
        }
      }
    },
  });

  const deppiPasswordHash = await bcrypt.hash("123456", 10);

await prisma.user.upsert({
  where: { email: "deppi@email.com" },
  update: {},
  create: {
    name: "DEPPI",
    email: "deppi@email.com",
    passwordHash: deppiPasswordHash,
    personalPhones: ["88999990001"],
    cpf: "22222222222",
    registrationName: "Servidor DEPPI",
    dateOfBirth: new Date("1988-05-15"),
    maritalStatus: "Casado",
    placeOfBirth: "Juazeiro do Norte",
    sex: "Masculino",
    numberOfDependents: 2,
    raceEthnicity: "Parda",
    pisPasep: "22345678901",
    academicTitle: "Mestre",
    educationLevel: "Pós-graduação",
    address: "Rua Central, 200",
    identityNumber: "223456789",
    issuingAgency: "SSP",
    issuingState: "CE",
    issueDate: new Date("2008-03-15"),
    voterRegistrationNumber: "223456789012",
    electoralZone: "002",
    electoralSection: "005",
    voterRegistrationState: "CE",
    
    roles: {
      create: {
        roleId: deppiRole.id,
      },
    },
  },
});

const course1 = await prisma.course.create({
  data: {
    institutionId: "IFCE",
    title: "Curso de Python",
    description: "Curso básico de Python",
    actionType: "Extensão",
    thematicArea: "Tecnologia",
    extensionLine: "Programação",

    startDate: new Date("2026-08-01"),
    endDate: new Date("2026-09-01"),

    minParticipants: 10,
    maxParticipants: 30,
    workload: 40,

    location: "Campus Crato",
    funding: "IFCE",
    institutionalProgram: "Programa de Extensão",
    offeringModel: "Presencial",
    targetMunicipalities: "Crato",

    evaluationMethods: "Avaliação prática",
    marketingMethods: "Instagram",
    activitiesPerformed: "Aulas presenciais",
    responsibleName: "Professor João",

    presentation: "Curso de Python",
    justification: "Capacitação",
    targetAudience: "Comunidade",
    generalObjective: "Ensinar Python",
    specificObjective: "Introdução à linguagem",
    methodology: "Aulas teóricas e práticas",
  },
});

const course2 = await prisma.course.create({
  data: {
    institutionId: "IFCE",
    title: "Curso de Libras",
    description: "Curso básico",

    actionType: "Extensão",
    thematicArea: "Educação",
    extensionLine: "Inclusão",

    startDate: new Date("2026-08-10"),
    endDate: new Date("2026-09-20"),

    minParticipants: 10,
    maxParticipants: 30,
    workload: 60,

    location: "Campus Crato",
    funding: "IFCE",
    institutionalProgram: "Programa de Extensão",
    offeringModel: "Presencial",
    targetMunicipalities: "Crato",

    evaluationMethods: "Prova",
    marketingMethods: "Site",
    activitiesPerformed: "Aulas",

    responsibleName: "Professor José",

    presentation: "Curso de Libras",
    justification: "Inclusão",
    targetAudience: "Comunidade",

    generalObjective: "Ensinar Libras",
    specificObjective: "Comunicação",
    methodology: "Aulas presenciais",
  },
});

const studentUser = await prisma.user.create({
  data: {
    name: "João da Silva",
    email: "joao@email.com",
    passwordHash: await bcrypt.hash("123456", 10),

    personalPhones: ["88999990002"],
    cpf: "33333333333",
    registrationName: "João da Silva",
    dateOfBirth: new Date("2002-04-10"),
    maritalStatus: "Solteiro",
    placeOfBirth: "Crato",
    sex: "Masculino",
    numberOfDependents: 0,
    raceEthnicity: "Parda",
    pisPasep: "32345678901",
    academicTitle: "Ensino Médio",
    educationLevel: "Ensino Médio Completo",
    address: "Rua A, 100",
    identityNumber: "323456789",
    issuingAgency: "SSP",
    issuingState: "CE",
    issueDate: new Date("2020-01-15"),
    voterRegistrationNumber: "323456789012",
    electoralZone: "003",
    electoralSection: "010",
    voterRegistrationState: "CE",
  },
});

const student = await prisma.student.create({
  data: {
    userId: studentUser.id,
    occupation: "Estudante",
    perCapitaIncome: 900,
  },
});

const servantUser = await prisma.user.create({
  data: {
    name: "Maria Oliveira",
    email: "maria@ifce.edu.br",
    passwordHash: await bcrypt.hash("123456", 10),

    personalPhones: ["88999990003"],
    cpf: "44444444444",
    registrationName: "Maria Oliveira",
    dateOfBirth: new Date("1987-09-20"),
    maritalStatus: "Casada",
    placeOfBirth: "Juazeiro do Norte",
    sex: "Feminino",
    numberOfDependents: 2,
    raceEthnicity: "Branca",
    pisPasep: "42345678901",
    academicTitle: "Mestre",
    educationLevel: "Pós-graduação",
    address: "Rua B, 200",
    identityNumber: "423456789",
    issuingAgency: "SSP",
    issuingState: "CE",
    issueDate: new Date("2007-05-10"),
    voterRegistrationNumber: "423456789012",
    electoralZone: "004",
    electoralSection: "015",
    voterRegistrationState: "CE",
  },
});

await prisma.civilServant.create({
  data: {
    userId: servantUser.id,
    institutionalEmail: "servidor@ifce.edu.br",
    institutionalPhones: ["88999999999"],
    suapDepartment: "DEPPI",
    employmentStatus: "ATIVO",
    position: "Analista",
    positionClass: "E",
    standard: "101",
    positionGroup: "TAE",
    vacancyCode: "12345",
  },
});

await prisma.enrollment.createMany({
  data: [
    {
      courseId: course1.id,
      studentId: student.id,
      status: "APPROVED",
    },
    {
      courseId: course2.id,
      studentId: student.id,
      status: "PENDING",
    },
  ],
});

  console.log("Seed executada com sucesso");
}
main();