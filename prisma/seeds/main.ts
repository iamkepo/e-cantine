import { PrismaClient } from '@prisma/client';
import typesSeed from './typesSeed';
import categoriesSeed from './categoriesSeed';
import articles from './articlesSeed';
import tagsSeed from './tagsSeed';

const prisma = new PrismaClient();

async function main() {
  const start = new Date();
  console.log("Seeding database..."); 
  
  // Crée les Types
  await typesSeed(prisma);
  // Crée les Categories
  await categoriesSeed(prisma);
  // Crée les Tags
  await tagsSeed(prisma);
  // Crée les Articles
  await articles(prisma);

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
