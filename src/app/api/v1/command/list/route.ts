"use server";
import commandsController from '@/controllers/commandsController';

/**
 * @swagger
 * tags:
 *   name: Commands
 *   description: API for managing commands
 *
 * @swagger
 * /api/v1/command/list:
 *   get:
 *     summary: Lister les commandes
 *     tags: [Commands]
 *     parameters:
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments à récupérer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Recherche
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Statut
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Champ sur lequel trier
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordre du tri
 *       - in: query
 *         name: eventId
 *         schema:
 *           type: integer
 *         description: ID de l'événement
 *       - in: query
 *         name: restaurantId
 *         schema:
 *           type: integer
 *         description: ID du restaurant
 *       - in: query
 *         name: restaurantId
 *         schema:
 *           type: integer
 *         description: ID du restaurant
 *       - in: query
 *         name: eventId
 *         schema:
 *           type: integer
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Liste des commandes
 *       404:
 *         description: Commandes non trouvées
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: Request) {
  return commandsController.getCommands(req);
}

/**
 * @swagger
 * tags:
 *   name: Commands
 *   description: API for managing commands
 *
 * @swagger
 * /api/v1/command/list:
 *   delete:
 *     summary: Supprimer toutes les commandes
 *     tags: [Commands]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des commandes à supprimer
 *     responses:
 *       200:
 *         description: Commandes supprimées avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return commandsController.deleteCommands(req);
}
