import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function clearDatabase() {
  try {
    // Désactiver les contraintes de FK
    await prisma.$executeRawUnsafe(`SET session_replication_role = replica;`);

    // Supprimer les données dans l'ordre inverse des dépendances
    await prisma.delivery.deleteMany(); // 1
    await prisma.command.deleteMany(); // 2
    await prisma.event.deleteMany(); // 3
    await prisma.date.deleteMany(); // 4
    await prisma.transaction.deleteMany(); // 5
    await prisma.subscription.deleteMany(); // 6
    await prisma.preference.deleteMany(); // 7
    await prisma.connection.deleteMany(); // 8
    await prisma.tag.deleteMany(); // 9
    await prisma.article.deleteMany(); // 10
    await prisma.category.deleteMany(); // 11
    await prisma.type.deleteMany(); // 12
    await prisma.location.deleteMany(); // 13
    await prisma.client.deleteMany(); // 14
    await prisma.deliverer.deleteMany(); // 15
    await prisma.restaurant.deleteMany(); // 16
    await prisma.method.deleteMany(); // 17
    await prisma.promo.deleteMany(); // 18
    await prisma.admin.deleteMany(); // 19
    await prisma.notification.deleteMany(); // 20
    await prisma.phone.deleteMany(); // 21
    await prisma.account.deleteMany(); // 22
    await prisma.session.deleteMany(); // 23
    await prisma.verification.deleteMany(); // 24
    await prisma.user.deleteMany(); // 25

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