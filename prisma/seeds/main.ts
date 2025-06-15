import { PrismaClient } from '@prisma/client';
import typesSeed, {rawTypes} from './typesSeed';
import categoriesSeed, {rawCategories, rawCategories2} from './categoriesSeed';
import articlesSeed, {rawArticles, rawArticles2} from './articlesSeed';
import tagsSeed, {rawTags} from './tagsSeed';

const prisma = new PrismaClient();

async function main() {
  const start = new Date();
  console.log("Seeding database..."); 
  
  // Crée les Types
  await typesSeed(prisma, rawTypes);
  // Crée les Categories
  await categoriesSeed(prisma, rawCategories);
  // Crée les Tags
  await tagsSeed(prisma, rawTags);
  // Crée les Articles
  await articlesSeed(prisma, rawArticles);

  await categoriesSeed(prisma, rawCategories2);

  await articlesSeed(prisma, rawArticles2);

  const end = new Date();
  console.log(`Seeding completed in ${end.getTime() - start.getTime()}ms`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
