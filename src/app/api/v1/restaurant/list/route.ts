"use server";
import restaurantsController from '@/controllers/restaurantsController';

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API for managing restaurants
 *
 * @swagger
 * /api/v1/restaurant/list:
 *   get:
 *     summary: Récupérer la liste des restaurants
 *     tags: [Restaurants]
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
 *     responses:
 *       200:
 *         description: Liste des restaurants
 *       404:
 *         description: Restaurants non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: Request) {
  return restaurantsController.getRestaurants(req);
}

/**
 * @swagger
 * /api/v1/restaurant/list:
 *   delete:
 *     summary: Supprimer la liste des restaurants
 *     tags: [Restaurants]
 *     parameters:
 *       - in: body
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des restaurants à supprimer
 *     responses:
 *       200:
 *         description: Liste des restaurants supprimée
 *       404:
 *         description: Restaurants non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return restaurantsController.deleteRestaurants(req);
}
  
