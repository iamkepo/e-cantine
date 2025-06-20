"use server";
import deliveriesController from '@/backend/controllers/deliveries.controller';

/**
 * @swagger
 * /api/v1/delivery/create:
 *   post:
 *     summary: Create delivery
 *     tags: [Deliveries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commandId:
 *                 type: integer
 *                 description: ID de la commande
 *               delivererId:
 *                 type: integer
 *                 description: ID du livreur
 *     responses:
 *       200:
 *         description: Livraison créée avec succès
 *       500:
 *         description: Erreur lors de la création de la livraison
 */
export async function POST(req: Request) {
  return deliveriesController.createDelivery(req);
}
