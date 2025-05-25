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
  "Traditionnel",
  "Street food",
  "Gourmand",
  "Fait minute",
  "Sur commande",
  "Végétalien",
  "Végan",
  "Sans gluten",
  "Halal",
  "Casher",
  "Bio",
  "Keto",
  "Low-carb",
  "Sans lactose",
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
  "Couscous",
  "Tajine",
  "Quiche",
  "Gratin",
  "Tacos",
  "Kebab",
  "Paella",
  "Fruits",
  "Légumes",
  "Céréales",
  "Poisson",
  "Produits laitiers",
  "Légumineuses",
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