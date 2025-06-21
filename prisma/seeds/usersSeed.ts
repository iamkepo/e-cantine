import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const usersSeed = async (prisma: PrismaClient, user: {email: string, username: string, password: string}) => {
  // Check if user already exists
  const existingUser = await prisma.users.findUnique({
    where: { email: user.email },
  });

  if (existingUser) {
    console.log(`User with email ${user.email} already exists.`);
    return existingUser;
  }

  // If user doesn't exist, create a new one
  const hashPassword = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.users.create({
    data: {
      email: user.email,
      username: user.username,
      password: hashPassword,
    },
  });

  console.log("Created user:", newUser.id);
  return newUser;
};

export default usersSeed;