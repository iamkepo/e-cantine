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
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments à ignorer
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments à récupérer
 *     responses:
 *       200:
 *         description: Liste des tags
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: Request) => {
  return tagsController.getTags(req);
};