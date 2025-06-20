"use server";
import clientsController from '@/backend/controllers/clients.controller';

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API for managing clients
 *
 * @swagger
 * /api/v1/client/create:
 *   post:
 *     summary: Créer un client
 *     tags: [Clients]
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
 *         description: Client créé
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne du serveur
 */
export async function POST(req: Request) {
  return clientsController.createClient(req);
}
