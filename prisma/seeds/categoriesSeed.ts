import { PrismaClient } from "@prisma/client";

const rawCategories = [
  {name: "Petit Déjeuner"},
  {name: "Déjeuner"},
  {name: "Goûter"},
  {name: "Dîner"},
  {name: "uncategorised"},
];


const categoriesSeed = async (prisma: PrismaClient) => {
  await Promise.all(
    rawCategories.map((cat) =>
      prisma.categories.create({
        data: {
          name: cat.name,
        },
      })
    )
  );

  console.log("✅ Categories créées.");
};

export default categoriesSeed;
