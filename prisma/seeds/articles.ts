import { PrismaClient } from "@prisma/client";

import { articlesPrincipal } from "../../src/core/constants";


const rawTags = [
  { id: 1, name: "Végétarien" },
  { id: 2, name: "Vegan" },
  { id: 3, name: "Sans Gluten" },
  { id: 4, name: "Viande" },
];

const rawCategories = [
  { id: 1, name: "Petit Déjeuner" },
  { id: 2, name: "Déjeuner" },
  { id: 3, name: "Goûter" },
  { id: 4, name: "Dîner" },
];

const rawTypes = [
  { id: 1, name: "Plat Principal" },
  { id: 2, name: "Accompagnement" },
  { id: 3, name: "Boisson" },
  { id: 4, name: "Supplément" },
];

const seedArticles = async (prisma: PrismaClient) => {

  for (const tag of rawTags) {
    await prisma.tags.upsert({
      where: { id: tag.id },
      update: {},
      create: tag,
    });
  }

  for (const cat of rawCategories) {
    await prisma.categories.upsert({
      where: { id: cat.id },
      update: {},
      create: cat,
    });
  }

  for (const type of rawTypes) {
    await prisma.types.upsert({
      where: { id: type.id },
      update: {},
      create: type,
    });
  }

  for (const article of articlesPrincipal) {
    const createdArticle = await prisma.articles.create({
      data: {
        name: article.label,
        image: article.img,
        description: article.description,
        price: article.price,
      },
    });

    for (const tagId of article.tags) {
      await prisma.articleTags.create({
        data: {
          articleId: createdArticle.id,
          tagId,
        },
      });
    }

    await prisma.articleTypes.create({
      data: {
        articleId: createdArticle.id,
        typeId: 1,
      },
    });

    await prisma.articleCategories.create({
      data: {
        articleId: createdArticle.id,
        categoryId: article.category,
      },
    });
  }

  console.log("Created articles");

  return;
};

export default seedArticles;
