"use server";

import typesController from "@/controllers/typesController";

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: API for managing types
 *
 * @swagger 
 * /api/v1/type/list:
 *   get:
 *     summary: Récupérer la liste des types
 *     tags: [Types]
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
  return typesController.getTypes(req);
};