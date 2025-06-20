"use server";

import typesController from "@/backend/controllers/types.controller";

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
 *         description: Liste des types
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: Request) => {
  return typesController.getTypes(req);
};

/**
 * @swagger
 * /api/v1/type/list:
 *   delete:
 *     summary: Supprimer plusieurs types
 *     tags: [Types]
 *     parameters:
 *       - in: body
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des types à supprimer
 *     responses:
 *       200:
 *         description: Types supprimés avec succès
 *       404:
 *         description: Types non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: Request) => {
  return typesController.deleteTypes(req);
};