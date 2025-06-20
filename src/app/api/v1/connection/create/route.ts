"use server";

import connectionsController from "@/backend/controllers/connections.controller";

/**
 * @swagger
 * tags:
 *   name: Connections
 *   description: API for managing connections
 *
 * @swagger 
 * /api/v1/connection/create:
 *   post:
 *     summary: Créer une connection
 *     tags: [Connections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               articleId:
 *                 type: number
 *               tagId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Connection créée avec succès
 *       400:
 *         description: Erreur lors de la création de la connection
 */

export const POST = async (req: Request) => {
  return connectionsController.createConnection(req);
};