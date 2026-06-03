import { prisma } from "../src/prisma/client";

import bcrypt from "bcryptjs";

async function main() {
  const adminRole = await prisma.role.create({
    data: {
        slug: "ADMIN",
        name: "ADMINISTRADOR",
        description: "Administrador",
    },
  });

  const permissions = [
    "CREATE_USER",
    ""
  ];

}
main();