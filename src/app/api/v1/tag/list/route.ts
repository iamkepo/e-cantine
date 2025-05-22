"use server";

import tagsController from "@/controllers/tagsController";

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: API for managing tags
 *
 * @swagger 
 * /api/v1/tag/list:
 *   get:
 *     summary: Récupérer la liste des tags
 *     tags: [Tags]
 *     parameters:
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments à récupérer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Recherche
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
 *         description: Liste des tags
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: Request) => {
  return tagsController.getTags(req);
};

/**
 * @swagger
 * /api/v1/tag/list:
 *   delete:
 *     summary: Supprimer plusieurs tags
 *     tags: [Tags]
 *     parameters:
 *       - in: body
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des tags à supprimer
 *     responses:
 *       200:
 *         description: Tags supprimés avec succès
 *       404:
 *         description: Tags non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: Request) => {
  return tagsController.deleteTags(req);
};