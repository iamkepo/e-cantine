import { PrismaClient } from "@prisma/client";

const rawTags = [
  "Végétarien",
  "Vegan",
  "Sans Gluten",
  "Viande",
  "Rapide",
  "Équilibré",
  "Gourmand",
  "Végétalien",
  "Bio",
  "Sucré",
  "Salé",
  "Épicé",
  "Amer",
  "Acide",
  "Croquant",
  "Fondant",
  "Moelleux",
  "Tarte",
  "Crème",
  "Glace",
  "Pancake",
  "Pizza",
  "Burger",
  "Salade",
  "Soupe",
  "Sushi",
  "Kebab",
  "Fruits",
  "Légumes",
  "Poisson",
  "Pâtes",
  "Fromage",
  "Œufs"
];

const tagsSeed = async (prisma: PrismaClient) => {
  await Promise.all(
    rawTags.map(async (tag) =>
      await prisma.tags.create({
        data: {
          name: tag,
        },
      })
    )
  );

  console.log("✅ Tags créés.");
};

export default tagsSeed;