"use server";

import articleTagsController from "@/controllers/ArticleTagsController";

/**
 * @swagger
 * tags:
 *   name: ArticleTags
 *   description: API for managing article tags
 *
 * @swagger 
 * /api/v1/article-tag/create:
 *   post:
 *     summary: Créer un tag
 *     tags: [ArticleTags]
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
 *         description: ArticleTag créé avec succès
 *       400:
 *         description: Erreur lors de la création de l'articleTag
 */

export const POST = async (req: Request) => {
  return articleTagsController.createArticleTag(req);
};