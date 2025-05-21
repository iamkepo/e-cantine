import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function clearDatabase() {
  try {
    // Désactiver les contraintes de FK
    await prisma.$executeRawUnsafe(`SET session_replication_role = replica;`);

    // Supprimer les données dans l'ordre inverse des dépendances
    await prisma.deliveries.deleteMany(); // 1
    await prisma.commands.deleteMany(); // 2
    await prisma.events.deleteMany(); // 3
    await prisma.dates.deleteMany(); // 4
    await prisma.transactions.deleteMany(); // 5
    await prisma.subscriptions.deleteMany(); // 8
    await prisma.preferences.deleteMany(); // 9
    await prisma.connections.deleteMany(); // 10
    await prisma.tags.deleteMany(); // 11
    await prisma.articles.deleteMany(); // 12
    await prisma.categories.deleteMany(); // 13
    await prisma.types.deleteMany(); // 14
    await prisma.locations.deleteMany(); // 15
    await prisma.clients.deleteMany(); // 16
    await prisma.deliverers.deleteMany(); // 17
    await prisma.restaurants.deleteMany(); // 18
    await prisma.methods.deleteMany(); // 19
    await prisma.promos.deleteMany(); // 20
    await prisma.admins.deleteMany(); // 21
    await prisma.notifications.deleteMany(); // 22
    await prisma.users.deleteMany(); // 23

    // Réactiver les contraintes FK
    await prisma.$executeRawUnsafe(`SET session_replication_role = DEFAULT;`);

    console.log('✅ Base de données vidée avec succès.');
  } catch (error) {
    console.error('❌ Erreur pendant le nettoyage de la base :', error);
  } finally {
    await prisma.$disconnect();
  }
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