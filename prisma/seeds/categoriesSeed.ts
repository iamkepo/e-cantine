import { PrismaClient } from "@prisma/client";

const rawCategories = [
  "Petit Déjeuner",
  "Déjeuner",
  "Goûter",
  "Dîner",
  "uncategorised",
];


const categoriesSeed = async (prisma: PrismaClient) => {
  const now = new Date();

  await Promise.all(
    rawCategories.map((cat) =>
      prisma.categories.create({
        data: {
          name: cat,
          createdAt: now,
          updatedAt: now,
        },
      })
    )
  );

  console.log("✅ Categories créées.");
};

export default categoriesSeed;
