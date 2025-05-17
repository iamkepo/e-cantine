import { PrismaClient } from "@prisma/client";

const email = "test@example.com";
const permissions = ["ALL"];

const seedAdmins = async (prisma: PrismaClient, userId: number) => {
  const admin = await prisma.admins.create({
    data: {
      email,
      permissions,
      userId,
    },
  });

  console.log("Created admin:", admin);

  return admin;
};

export default seedAdmins;