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
      cpf: "000.000.000-00",
      registrationName: "Administrador",
      dateOfBirth: new Date("1990-01-01"),
      maritalStatus: "Solteiro",
      placeOfBirth: "Brasília",
      sex: "Não informado",
      numberOfDependents: 0,
      raceEthnicity: "Não informado",
      pisPasep: "000.00000.00-0",
      academicTitle: "Não informado",
      educationLevel: "Não informado",
      address: "Não informado",
      identityNumber: "0000000",
      issuingAgency: "SSP",
      issuingState: "DF",
      issueDate: new Date("2000-01-01"),
      voterRegistrationNumber: "000000000000",
      electoralZone: "000",
      electoralSection: "0000",
      voterRegistrationState: "DF",
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
    roles: {
      create: {
        roleId: deppiRole.id,
      },
    },
  },
});

  console.log("Seed executada com sucesso");
}
main();