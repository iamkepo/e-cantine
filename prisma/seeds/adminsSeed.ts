import { PrismaClient } from "@prisma/client";
import usersSeed from "./usersSeed";

const email = "admin@example.com";
const name = "admin";

const adminsSeed = async (prisma: PrismaClient) => {
  const user = await usersSeed(prisma);
  const admin = await prisma.admins.create({
    data: {
      email,
      name,
      userId: user.id,
    },
  });

  console.log("Created admin:", admin);

  return admin;
};

export default adminsSeed;