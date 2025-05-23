"use server";
import methodsController from '@/controllers/methodsController';


/**
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
 *                 description: Nom de la méthode
 *               status:
 *                 type: string
 *                 description: Statut de la méthode
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function POST(req: Request) {
  return methodsController.createMethod(req);
}

