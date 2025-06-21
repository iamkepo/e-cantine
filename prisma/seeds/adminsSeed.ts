import { PrismaClient } from "@prisma/client";
import usersSeed from "./usersSeed";

export const adminUserExample = {
  firstname: "admin",
  lastname: "admin",
  email: "admin@example.com",
  username: "admin",
  password: "admin",
};

const adminsSeed = async (prisma: PrismaClient, adminUser: {firstname: string, lastname: string, email: string, username: string, password: string}) => {
  // First, ensure the user exists
  const user = await usersSeed(prisma, {
    email: adminUser.email,
    username: adminUser.username,
    password: adminUser.password,
  });

  // Check if admin already exists for this user
  const existingAdmin = await prisma.admins.findFirst({
    where: { userId: user.id },
  });

  if (existingAdmin) {
    console.log(`Admin already exists for user ${user.id}`);
    return existingAdmin;
  }

  // If admin doesn't exist, create a new one
  const admin = await prisma.admins.create({
    data: {
      firstname: adminUser.firstname,
      lastname: adminUser.lastname,
      userId: user.id,
    },
  });
  
  console.log("Created admin:", admin.id, user.id);
  return admin;
};

export default adminsSeed;