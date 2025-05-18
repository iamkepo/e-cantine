import { PrismaClient } from "@prisma/client";

const rawTypes = [
  "Plat Principal",
  "Accompagnement",
  "Boisson",
  "Supplément",
];

const typesSeed = async (prisma: PrismaClient) => {
  const now = new Date();

  await Promise.all(
    rawTypes.map((type) =>
      prisma.types.create({
        data: {
          name: type,
          createdAt: now,
          updatedAt: now,
        },
      })
    )
  );

  console.log("✅ Types créés.");
};

export default typesSeed;