"use server";
import deliveriesController from '@/controllers/deliveriesController';

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: API for managing deliveries
 *
 * @swagger
 * /api/v1/delivery/list:
 *   get:
 *     summary: Get deliveries
 *     tags: [Deliveries]
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
 *         name: commandId
 *         schema:
 *           type: integer
 *         description: ID de la commande
 *       - in: query
 *         name: delivererId
 *         schema:
 *           type: integer
 *         description: ID du livreur
 *     responses:
 *       200:
 *         description: Liste des livraisons
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: Request) {
  return deliveriesController.getDeliveries(req);
}

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: API for managing deliveries
 *
 * @swagger
 * /api/v1/delivery/list:
 *   delete:
 *     summary: Delete deliveries
 *     tags: [Deliveries]
 *     parameters:
 *       - in: body
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des livraisons à supprimer
 *     responses:
 *       200:
 *         description: Livraison supprimée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return deliveriesController.deleteDeliveries(req);
}