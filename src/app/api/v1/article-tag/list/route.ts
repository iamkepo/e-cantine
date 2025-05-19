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
 *     responses:
 *       200:
 *         description: Liste des articleTags
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: Request) => {
  return articleTagsController.getArticleTags(req);
};

/**
 * @swagger
 * /api/v1/article-tag/list:
 *   delete:
 *     summary: Supprimer plusieurs articleTags
 *     tags: [ArticleTags]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des articleTags à supprimer
 *     responses:
 *       200:
 *         description: ArticleTags supprimés avec succès
 *       404:
 *         description: ArticleTags non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: Request) => {
  return articleTagsController.deleteArticleTags(req);
};
 