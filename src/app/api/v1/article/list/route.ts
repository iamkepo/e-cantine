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
 *         name: take
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments à récupérer
 *       - in: query
 *         name: typeId
 *         schema:
 *           type: integer
 *         description: ID du type
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: ID de la catégorie
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
 *         description: Liste des articles
 *       500:
 *         description: Erreur interne du serveur
 */
export const GET = async (req: Request) => {
  return articlesController.getArticles(req);
};

/**
 * @swagger
 * /api/v1/article/list:
 *   delete:
 *     summary: Supprimer plusieurs articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des articles à supprimer
 *     responses:
 *       200:
 *         description: Articles supprimés avec succès
 *       404:
 *         description: Articles non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: Request) => {
  return articlesController.deleteArticles(req);
};
