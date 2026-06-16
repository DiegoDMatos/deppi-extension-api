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

   await prisma.role.create({
    data: {
        slug: "ALUNO",
        name: "ALUNO",
        description: "Aluno",
    },
  });

    await prisma.role.create({
    data: {
        slug: "DEPPI",
        name: "DEPPI",
        description: "Deppi",
    },
  });

    await prisma.role.create({
    data: {
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
    "DEPPI_ROLES"
  ];

  for (const permissionName of permissions) {
    const permission = await prisma.permission.create({
      data: {
        slug: permissionName,
        name: permissionName,
      },
    });

    await prisma.rolePermission.create({
      data: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });

  }

  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@email.com",
      passwordHash,
      roles: {
        create: {
          roleId: adminRole.id,
        }
      }
    },
  });

  console.log("Seed executada com sucesso");
}
main();