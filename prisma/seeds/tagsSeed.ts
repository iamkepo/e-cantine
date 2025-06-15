import { PrismaClient } from "@prisma/client";

export const rawTags = [
  "Végétarien",
  "Vegan",
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
  "Pancake",
  "Pizza",
  "Salade",
  "Fruits",
  "Légumes",
  "Poisson",
  "Œufs"
];

const tagsSeed = async (prisma: PrismaClient, tags: string[]) => {
  await Promise.all(
    tags.map(async (tag) =>
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