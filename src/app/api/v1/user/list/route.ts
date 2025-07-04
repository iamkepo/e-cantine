"use server";

import usersController from "@/backend/controllers/users.controller";
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 *
 * @swagger 
 * /api/v1/user/list:
 *   get:
 *     summary: Récupérer la liste des utilisateurs
 *     tags: [Users]
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
 *         description: Liste des utilisateurs
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: Request) => {
  return usersController.getUsers(req);
};

/**
 * @swagger
 * /api/v1/user/list:
 *   delete:
 *     summary: Supprimer plusieurs utilisateurs
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des utilisateurs à supprimer
 *     responses:
 *       200:
 *         description: Utilisateurs supprimés avec succès
 *       404:
 *         description: Utilisateurs non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: Request) => {
  return usersController.deleteUsers(req);
};
 