import { PrismaClient } from "@prisma/client";

export const rawCategories = [
  {name: "Petit Déjeuner", hours: "08:00"},
  {name: "Déjeuner", hours: "11:00"},
  {name: "Goûter", hours: "14:00"},
  {name: "Dîner", hours: "17:00"},
];
export const rawCategories2 = [
  {name: "uncategorized", hours: ""},
];


const categoriesSeed = async (prisma: PrismaClient, categories: {name: string, hours: string}[]) => {
  await Promise.all(
    categories.map((category: {name: string, hours: string}) =>
      prisma.categories.create({
        data: {
          name: category.name,
          hours: category.hours,
        },
      })
    )
  );

  console.log("✅ Categories créées.");
};

export default categoriesSeed;
