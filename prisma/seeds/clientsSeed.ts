import { PrismaClient } from "@prisma/client";
import usersSeed from "./usersSeed";
import phonesSeed from "./phonesSeed";

export const clientUserExample = {
  firstname: "client",
  lastname: "client",
  email: "client@example.com",
  username: "client",
  password: "client",
};


const clientsSeed = async (prisma: PrismaClient, clientUser: {firstname: string, lastname: string, email: string, username: string, password: string}, clientPhone: {indicator: string, number: string}) => {
  const user = await usersSeed(prisma, {
    email: clientUser.email,
    username: clientUser.username,
    password: clientUser.password,
  });
  const phone = await phonesSeed(prisma, {
    indicator: clientPhone.indicator,
    number: clientPhone.number+user.id,
    userId: user.id,
  });
  const client = await prisma.clients.create({
    data: {
      firstname: clientUser.firstname,
      lastname: clientUser.lastname,
      userId: user.id,
    },
  });
  console.log("Created client:", client.id, phone.id, user.id);

  return client;
};

export default clientsSeed;
