"use server";
import restaurantsController from '@/backend/controllers/restaurants.controller';

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API for managing restaurants
 *
 * @swagger
 * /api/v1/restaurant/create:
 *   post:
 *     summary: Créer un restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               name:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Restaurant créé
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne du serveur
 */
export async function POST(req: Request) {
  return restaurantsController.createRestaurant(req);
}
