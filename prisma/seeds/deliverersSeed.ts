import { PrismaClient } from "@prisma/client";
import usersSeed from "./usersSeed";
import phonesSeed from "./phonesSeed";

export const delivererUserExample = {
  firstname: "deliverer",
  lastname: "deliverer",
  email: "deliverer@example.com",
  username: "deliverer",
  password: "deliverer",
};


const deliverersSeed = async (prisma: PrismaClient, delivererUser: {firstname: string, lastname: string, email: string, username: string, password: string}, delivererPhone: {indicator: string, number: string}) => {
  const user = await usersSeed(prisma, {
    email: delivererUser.email,
    username: delivererUser.username,
    password: delivererUser.password,
  });
  const phone = await phonesSeed(prisma, {
    indicator: delivererPhone.indicator,
    number: delivererPhone.number+user.id,
    userId: user.id,
  });
  const deliverer = await prisma.deliverers.create({
    data: {
      firstname: delivererUser.firstname,
      lastname: delivererUser.lastname,
      userId: user.id,
    },
  });
  console.log("Created deliverer:", deliverer.id, phone.id, user.id);

  return deliverer;
};

export default deliverersSeed;
