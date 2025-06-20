"use server";
import deliverersController from '@/backend/controllers/deliverers.controller';

/**
 * @swagger
 * tags:
 *   name: Deliverers
 *   description: API for managing deliverers
 *
 * @swagger
 * /api/v1/deliverer/list:
 *   get:
 *     summary: Get deliverers
 *     tags: [Deliverers]
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
 *         name: userId
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: Request) {
  return deliverersController.getDeliverers(req);
}

/**
 * @swagger
 * tags:
 *   name: Deliverers
 *   description: API for managing deliverers
 *
 * @swagger
 * /api/v1/deliverer/list:
 *   delete:
 *     summary: Delete deliverers
 *     tags: [Deliverers]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des livreurs à supprimer
 *     responses:
 *       200:
 *         description: Livreur supprimé
 *       500:
 *         description: Erreur interne du serveur
 */
  export async function DELETE(req: Request) {
  return deliverersController.deleteDeliverers(req);
}