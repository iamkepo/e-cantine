import { PrismaClient } from '@prisma/client';
import typesSeed, {rawTypes} from './typesSeed';
import categoriesSeed, {rawCategories, rawCategories2} from './categoriesSeed';
import articlesSeed, {rawArticles, rawArticles2} from './articlesSeed';
import tagsSeed, {rawTags} from './tagsSeed';
import adminsSeed, {adminUserExample} from './adminsSeed';
import clientsSeed, {clientUserExample} from './clientsSeed';
import deliverersSeed, {delivererUserExample} from './deliverersSeed';
import restaurantsSeed, {restaurantUserExample} from './restaurantsSeed';
import { clientPhoneExample, delivererPhoneExample, restaurantPhoneExample } from './phonesSeed';

const prisma = new PrismaClient();

async function main() {
  const start = new Date();
  console.log("Seeding database..."); 
  
  // Crée les Admins
  await adminsSeed(prisma, adminUserExample);
  
  // Crée les Clients
  await clientsSeed(prisma, clientUserExample, clientPhoneExample);
  
  // Crée les Deliverers
  await deliverersSeed(prisma, delivererUserExample, delivererPhoneExample);
  
  // Crée les Restaurants
  await restaurantsSeed(prisma, restaurantUserExample, restaurantPhoneExample);
  
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
