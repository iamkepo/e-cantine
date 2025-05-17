"use server";

import categoriesController from "@/controllers/categoriesController";

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 *
 * @swagger 
 * /api/v1/category/create:
 *   post:
 *     summary: Créer une catégorie
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       400:
 *         description: Erreur lors de la création de la catégorie
 */

export const POST = async (req: Request) => {
  return categoriesController.createCategory(req);
};