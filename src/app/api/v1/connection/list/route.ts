"use server";

import connectionsController from "@/backend/controllers/connections.controller";

/**
 * @swagger
 * tags:
 *   name: Connections
 *   description: API for managing connections
 *
 * @swagger 
 * /api/v1/connection/list:
 *   get:
 *     summary: Récupérer la liste des connections
 *     tags: [Connections]
 *     parameters:
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments à récupérer
 *       - in: query
 *         name: articleId
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *       - in: query
 *         name: tagId
 *         schema:
 *           type: integer
 *         description: ID du tag
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Statut
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Champ sur lequel trier
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordre du tri
 *     responses:
 *       200:
 *         description: Liste des connections
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: Request) => {
  return connectionsController.getConnections(req);
};

/**
 * @swagger
 * /api/v1/connection/list:
 *   delete:
 *     summary: Supprimer plusieurs connections
 *     tags: [Connections]
 *     parameters:
 *       - in: body
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des connections à supprimer
 *     responses:
 *       200:
 *         description: Connections supprimées avec succès
 *       404:
 *         description: Connections non trouvées
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: Request) => {
  return connectionsController.deleteConnections(req);
};
 