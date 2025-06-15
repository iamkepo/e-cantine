import { PrismaClient } from "@prisma/client";

export const rawTypes = [
  "Plat Principal",
  "Accompagnement",
  "Boisson",
  "Supplément",
];

const typesSeed = async (prisma: PrismaClient, types: string[]) => {
  await Promise.all(
    types.map(async (type) =>
      await prisma.types.create({
        data: {
          name: type,
        },
      })
    )
  );

  console.log("✅ Types créés.");
};

export default typesSeed;