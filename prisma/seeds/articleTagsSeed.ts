import { PrismaClient } from "@prisma/client";
import { IArticle } from "../../src/core/interfaces";

/**
 * Associe un article à une liste de tags dans la table `articleTags`.
 */
const seedArticleTags = async (
  prisma: PrismaClient,
  article: IArticle,
  tags: number[]
): Promise<void> => {
  if (!article?.id || tags.length === 0) {
    console.warn("⛔ Aucun article ou tags fournis pour le seed.");
    return;
  }

  const now = new Date();

  await Promise.all(
    tags.map((tagId) =>
      prisma.articleTags.create({
        data: {
          articleId: article.id as number,
          tagId,
          createdAt: now,
          updatedAt: now,
        },
      })
    )
  );

  console.log(`✅ ${tags.length} tags liés à l'article [ID: ${article.id}]`);
};

export default seedArticleTags;