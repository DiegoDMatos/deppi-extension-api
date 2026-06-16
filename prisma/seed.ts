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
    "DEPPI_ROLES"
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