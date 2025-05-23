"use server";

import articlesController from "@/controllers/articlesController";

/**
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
 *                 description: Nom de l'article
 *               price:
 *                 type: number
 *                 description: Prix de l'article
 *               description:
 *                 type: string
 *                 description: Description de l'article
 *               image:
 *                 type: string
 *                 description: URL de l'image
 *               categoryId:
 *                 type: number
 *                 description: ID de la catégorie
 *               typeId:
 *                 type: number
 *                 description: ID du type
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Erreur lors de la création de l'article
 */

export const POST = async (req: Request) => {
  return articlesController.createArticle(req);
};