"use server";
import methodsController from '@/controllers/methodsController';


/**
 * @swagger
 * tags:
 *   name: Methods
 *   description: API for managing methods
 *
 * @swagger
 * /api/v1/method/create:
 *   post:
 *     summary: Create method
 *     tags: [Methods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function POST(req: Request) {
  return methodsController.createMethod(req);
}

