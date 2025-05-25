import { PrismaClient } from "@prisma/client";

const rawTags = [
  "Végétarien",
  "Vegan",
  "Sans Gluten",
  "Viande",
  "Rapide",
  "Équilibré",
  "Diététique",
  "Healthy",
  "Street food",
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
  "Fumé",
  "Aigle-doux",
  "Gâteau",
  "Tarte",
  "Crème",
  "Glace",
  "Mousse",
  "Brownie",
  "Biscuit",
  "Crêpe",
  "Pancake",
  "Pudding",
  "Pizza",
  "Burger",
  "Salade",
  "Sandwich",
  "Soupe",
  "Sushi",
  "Quiche",
  "Gratin",
  "Tacos",
  "Kebab",
  "Fruits",
  "Légumes",
  "Céréales",
  "Poisson",
  "Produits laitiers",
  "Pâtes",
  "Riz",
  "Fromage",
  "Pain",
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