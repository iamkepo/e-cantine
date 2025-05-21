import { PrismaClient } from "@prisma/client";

const rawTags = [
  "Végétarien",
  "Vegan",
  "Sans Gluten",
  "Viande",
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