import { PrismaClient } from "@prisma/client";

/**
 * Associe un article à une liste de tags dans la table `articleTags`.
 */
const connectionsSeed = async (
  prisma: PrismaClient,
  articleId: number,
  tags: number[]
): Promise<void> => {
  if (!articleId || tags.length === 0) {
    console.warn("⛔ Aucun article ou tags fournis pour le seed.");
    return;
  }

  await Promise.all(
    tags.map(async (tagId) =>
      await prisma.connections.create({
        data: {
          articleId,
          tagId,
        },
      })
    )
  );

  console.log(`✅ ${tags.length} tags liés à l'article [ID: ${articleId}]`);
};

export default connectionsSeed;