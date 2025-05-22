"use server";
import deliveriesController from '@/controllers/deliveriesController';

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: API for managing deliveries
 *
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
 *               delivererId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function POST(req: Request) {
  return deliveriesController.createDelivery(req);
}
