"use server";

import articlesController from "@/controllers/articlesController";

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API for managing articles
 *
 * @swagger 
 * /api/v1/article/create:
 *   post:
 *     summary: Créer un article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: number
 *               typeId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Erreur lors de la création de l'article
 */

export const POST = async (req: Request) => {
  return articlesController.createArticle(req);
};