import { PrismaClient } from '@prisma/client';
// import users from './users';
// import admins from './admins';
import articles from './articles';

const prisma = new PrismaClient();

async function main() {
  const start = new Date();
  console.log("Seeding database...");
  // const user = await users(prisma);
  // const admin = await admins(prisma, user.id);

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
