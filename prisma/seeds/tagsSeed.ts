import { PrismaClient } from "@prisma/client";

const rawTags = [
  "Végétarien",
  "Vegan",
  "Sans Gluten",
  "Viande",
];

const seedTags = async (prisma: PrismaClient) => {
  const now = new Date();

  await Promise.all(
    rawTags.map((tag) =>
      prisma.tags.create({
        data: {
          name: tag,
          createdAt: now,
          updatedAt: now,
        },
      })
    )
  );

  console.log("✅ Tags créés.");
};

export default seedTags;