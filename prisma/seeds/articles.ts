import { articlesPrincipal } from "../../src/core/constants";
import { PrismaClient } from "@prisma/client";

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
  const now = new Date();

  await Promise.all(
    rawTags.map((tag) =>
      prisma.tags.upsert({
        where: { id: tag.id },
        update: {},
        create: {
          id: tag.id,
          name: tag.name,
          createdAt: now,
          updatedAt: now,
        },
      })
    )
  );

  await Promise.all(
    rawCategories.map((cat) =>
      prisma.categories.upsert({
        where: { id: cat.id },
        update: {},
        create: {
          id: cat.id,
          name: cat.name,
          createdAt: now,
          updatedAt: now,
        },
      })
    )
  );

  await Promise.all(
    rawTypes.map((type) =>
      prisma.types.upsert({
        where: { id: type.id },
        update: {},
        create: {
          id: type.id,
          name: type.name,
          createdAt: now,
          updatedAt: now,
        },
      })
    )
  );

  for (const article of articlesPrincipal) {
    const createdArticle = await prisma.articles.create({
      data: {
        name: article.label,
        image: article.img,
        description: article.description,
        price: article.price,
        type: {
          connect: {
            id: 1,
          },
        },
        category: {
          connect: {
            id: article.category,
          },
        },
        createdAt: now,
        updatedAt: now,
      },
    });

    // Liens tags
    await Promise.all(
      article.tags.map((tagId) =>
        prisma.articleTags.create({
          data: {
            articleId: createdArticle.id,
            tagId,
            createdAt: now,
            updatedAt: now,
          },
        })
      )
    );
  }

  console.log("✅ Articles principaux créés.");
};

export default seedArticles;