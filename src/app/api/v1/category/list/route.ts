"use server";

import categoriesController from "@/controllers/categoriesController";

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 *
 * @swagger 
 * /api/v1/category/list:
 *   get:
 *     summary: Récupérer la liste des catégories
 *     tags: [Categories]
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
  return categoriesController.getCategories(req);
};