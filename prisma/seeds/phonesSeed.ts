import { PrismaClient } from "@prisma/client";

export const clientPhoneExample = {
  indicator: "+229",
  number: "0102",
};
export const restaurantPhoneExample = {
  indicator: "+229",
  number: "0103",
};
export const delivererPhoneExample = {
  indicator: "+229",
  number: "0104",
};
const phonesSeed = async (prisma: PrismaClient, phone: {indicator: string, number: string, userId: number}) => {
  const newPhone = await prisma.phones.create({
    data: {
      indicator: phone.indicator,
      number: phone.number,
      userId: phone.userId,
    },
  });

  console.log("Created phone:", newPhone.id);

  return newPhone;
};

export default phonesSeed;
