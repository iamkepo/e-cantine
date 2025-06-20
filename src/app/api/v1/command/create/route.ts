"use server";
import commandsController from '@/backend/controllers/commands.controller';

/**
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
 *                 description: ID de l'événement
 *                 example: 1
 *               restaurantId:
 *                 type: integer
 *                 description: ID du restaurant
 *                 example: 2
 *             required:
 *               - eventId
 *               - restaurantId
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur interne du serveur
 */
export async function POST(req: Request) {
  return commandsController.createCommand(req);
}
