"use server";

import articlesController from "@/controllers/articlesController";

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API for managing articles
 *
 * @swagger 
 * /api/v1/article/list:
 *   get:
 *     summary: Récupérer la liste des articles
 *     tags: [Articles]
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
 *         description: Liste des articles
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: Request) => {
  articlesController.getArticles(req);
};