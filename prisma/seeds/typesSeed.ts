import { PrismaClient } from "@prisma/client";

const rawTypes = [
  "Plat Principal",
  "Accompagnement",
  "Boisson",
  "Supplément",
];

const typesSeed = async (prisma: PrismaClient) => {
  await Promise.all(
    rawTypes.map(async (type) =>
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