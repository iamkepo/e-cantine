"use server";
import deliverersController from '@/backend/controllers/deliverers.controller';

/**
 * @swagger
 * tags:
 *   name: Deliverers
 *   description: API for managing deliverers
 *
 * @swagger
 * /api/v1/deliverer/create:
 *   post:
 *     summary: Create a new deliverer
 *     tags: [Deliverers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Deliverer created successfully
 *       500:
 *         description: Error creating deliverer
 */
export async function POST(req: Request) {
  return deliverersController.createDeliverer(req);
}
