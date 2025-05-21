import { PrismaClient } from "@prisma/client";
import usersSeed from "./usersSeed";

const name = "test";
const phone = "0606060606";
const status = "pending";

const clientsSeed = async (prisma: PrismaClient) => {
  const user = await usersSeed(prisma);
  const client = await prisma.clients.create({
    data: {
      name,
      phone,
      status,
      userId: user.id,
    },
  });

  console.log("Created client:", client);

  return client;
};

export default clientsSeed;
