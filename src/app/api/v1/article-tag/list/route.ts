"use server";

import articleTagsController from "@/controllers/ArticleTagsController";

/**
 * @swagger
 * tags:
 *   name: ArticleTags
 *   description: API for managing article tags
 *
 * @swagger 
 * /api/v1/article-tag/list:
 *   get:
 *     summary: Récupérer la liste des articleTags
 *     tags: [ArticleTags]
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
 *         description: Liste des articleTags
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: Request) => {
  return articleTagsController.getArticleTags(req);
};