import { PrismaClient } from "@prisma/client";

const email = "test@example.com";

const seedAdmins = async (prisma: PrismaClient, userId: number) => {
  const admin = await prisma.admins.create({
    data: {
      email,
      userId,
    },
  });

  console.log("Created admin:", admin);

  return admin;
};

export default seedAdmins;