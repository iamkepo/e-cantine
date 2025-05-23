import { PrismaClient } from "@prisma/client";

const rawCategories = [
  {name: "Petit Déjeuner"},
  {name: "Déjeuner"},
  {name: "Goûter"},
  {name: "Dîner"},
];
const uncategorised = {name: "uncategorised"};


const categoriesSeed = async (prisma: PrismaClient) => {
  await Promise.all(
    rawCategories.map(async (cat) =>
      await prisma.categories.create({
        data: {
          name: cat.name,
        },
      })
    )
  );
  
  await prisma.categories.create({
    data: {
      name: uncategorised.name,
    },
  })

  console.log("✅ Categories créées.");
};

export default categoriesSeed;
