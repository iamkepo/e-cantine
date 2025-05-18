import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.planningEvents.deleteMany();
  await prisma.menuArticles.deleteMany();
  await prisma.menus.deleteMany();
  await prisma.commandTransactions.deleteMany();
  await prisma.commands.deleteMany();
  
  await prisma.addressClients.deleteMany();
  await prisma.clients.deleteMany();
  await prisma.admins.deleteMany();
  
  await prisma.articleTags.deleteMany();
  await prisma.articles.deleteMany();
  
  await prisma.tags.deleteMany();
  await prisma.categories.deleteMany();
  await prisma.types.deleteMany();
  
  await prisma.users.deleteMany();
}
clearDatabase()
  .then(() => {
    console.log('✅ Base vidée.');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });