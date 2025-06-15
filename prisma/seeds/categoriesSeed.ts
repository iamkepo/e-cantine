import { PrismaClient } from "@prisma/client";

export const rawCategories = [
  {name: "Petit Déjeuner"},
  {name: "Déjeuner"},
  {name: "Goûter"},
  {name: "Dîner"},
];
export const rawCategories2 = [
  {name: "uncategorized"},
];


const categoriesSeed = async (prisma: PrismaClient, categories: {name: string}[]) => {
  await Promise.all(
    categories.map((category: {name: string}) =>
      prisma.categories.create({
        data: {
          name: category.name,
        },
      })
    )
  );

  console.log("✅ Categories créées.");
};

export default categoriesSeed;
