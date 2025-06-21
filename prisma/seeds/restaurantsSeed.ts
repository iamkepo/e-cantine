import { PrismaClient } from "@prisma/client";
import usersSeed from "./usersSeed";
import phonesSeed from "./phonesSeed";

export const restaurantUserExample = {
  fullname: "restaurant",
  firstname: "restaurant",
  lastname: "restaurant",
  email: "restaurant@example.com",
  username: "restaurant",
  password: "restaurant",
};


const restaurantsSeed = async (prisma: PrismaClient, restaurantUser: {fullname: string, firstname: string, lastname: string, email: string, username: string, password: string}, restaurantPhone: {indicator: string, number: string}) => {
  const user = await usersSeed(prisma, {
    email: restaurantUser.email,
    username: restaurantUser.username,
    password: restaurantUser.password,
  });
  const phone = await phonesSeed(prisma, {
    indicator: restaurantPhone.indicator,
    number: restaurantPhone.number+user.id,
    userId: user.id,
  });
  const restaurant = await prisma.restaurants.create({
    data: {
      fullname: restaurantUser.fullname,
      firstname: restaurantUser.firstname,
      lastname: restaurantUser.lastname,
      userId: user.id,
    },
  });
  console.log("Created restaurant:", restaurant.id, phone.id, user.id);

  return restaurant;
};

export default restaurantsSeed;
