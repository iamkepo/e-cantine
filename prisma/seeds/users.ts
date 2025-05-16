import { PrismaClient } from "@prisma/client";


const name = "test";
const password = "test";

const seedUsers = async (prisma: PrismaClient) => {
  const user = await prisma.users.create({
    data: {
      name,
      password,
    },
  });

  console.log("Created user:", user);

  return user;
};

export default seedUsers;