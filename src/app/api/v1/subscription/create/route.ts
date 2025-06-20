"use server";
import subscriptionsController from '@/backend/controllers/subscriptions.controller';

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: API for managing subscriptions
 *
 * @swagger
 * /api/v1/subscription/create:
 *   post:
 *     summary: Créer une subscription
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weeks:
 *                 type: integer
 *               checkedDays:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               transactionId:
 *                 type: integer
 *               clientId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Subscription créée
 *       500:
 *         description: Erreur lors de la création de la subscription
 */
export async function POST(req: Request) {
  return subscriptionsController.createSubscription(req);
}
