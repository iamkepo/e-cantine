"use server";
import commandsController from '@/controllers/commandsController';

/**
 * @swagger
 * tags:
 *   name: Commands
 *   description: API for managing commands
 *
 * @swagger 
 * /api/v1/command/create:
 *   post:
 *     summary: Créer une commande
 *     tags: [Commands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: integer
 *                 example: 1
 *               restaurantId:
 *                 type: integer
 *                 example: 2
 *             required:
 *               - eventId
 *               - restaurantId
 *     responses:
 *       201:
 *         description: Commande créée
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur interne du serveur
 */
export async function POST(req: Request) {
  return commandsController.createCommand(req);
}
