"use server";
import subscriptionsController from '@/controllers/subscriptionsController';

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: API for managing subscriptions
 *
 * @swagger
 * /api/v1/subscription/list:
 *   get:
 *     summary: Récupérer la liste des subscriptions
 *     tags: [Subscriptions]
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
 *         name: clientId
 *         schema:
 *           type: integer
 *         description: ID du client
 *       - in: query
 *         name: transactionId
 *         schema:
 *           type: integer
 *         description: ID de la transaction
 *     responses:
 *       200:
 *         description: Liste des subscriptions
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: Request) {
  return subscriptionsController.getSubscriptions(req);
}

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: API for managing subscriptions
 *
 * @swagger
 * /api/v1/subscription/list:
 *   delete:
 *     summary: Supprimer plusieurs subscriptions
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des subscriptions à supprimer
 *     responses:
 *       200:
 *         description: Subscriptions supprimées avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return subscriptionsController.deleteSubscriptions(req);
}
