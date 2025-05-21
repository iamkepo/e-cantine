import { PrismaClient } from "@prisma/client";
import { IArticle } from "../../src/core/interfaces";

/**
 * Associe un article à une liste de tags dans la table `articleTags`.
 */
const connectionsSeed = async (
  prisma: PrismaClient,
  article: IArticle,
  tags: number[]
): Promise<void> => {
  if (!article?.id || tags.length === 0) {
    console.warn("⛔ Aucun article ou tags fournis pour le seed.");
    return;
  }

  await Promise.all(
    tags.map(async (tagId) =>
      await prisma.connections.create({
        data: {
          articleId: article.id as number,
          tagId,
        },
      })
    )
  );

  console.log(`✅ ${tags.length} tags liés à l'article [ID: ${article.id}]`);
};

export default connectionsSeed;