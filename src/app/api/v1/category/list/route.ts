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
 *         description: Liste des catégories
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: Request) => {
  return categoriesController.getCategories(req);
};

/**
 * @swagger
 * /api/v1/category/list:
 *   delete:
 *     summary: Supprimer plusieurs catégories
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des catégories à supprimer
 *     responses:
 *       200:
 *         description: Catégories supprimées avec succès
 *       404:
 *         description: Catégories non trouvées
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: Request) => {
  return categoriesController.deleteCategories(req);
};