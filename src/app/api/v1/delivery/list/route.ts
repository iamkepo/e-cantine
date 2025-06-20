"use server";
import deliveriesController from '@/backend/controllers/deliveries.controller';

/**
 * @swagger
 * /api/v1/delivery/list:
 *   get:
 *     summary: Récupérer la liste des livraisons
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
 *         description: Recherche textuelle
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Statut de la livraison
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page courante
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Champ sur lequel trier
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordre du tri (asc/desc)
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
 * /api/v1/delivery/list:
 *   delete:
 *     summary: Supprimer plusieurs livraisons
 *     tags: [Deliveries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Liste des IDs des livraisons à supprimer
 *     responses:
 *       200:
 *         description: Livraisons supprimées avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return deliveriesController.deleteDeliveries(req);
}