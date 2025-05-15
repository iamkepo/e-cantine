"use server";

import usersController from "@/controllers/usersController";
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
 *         description: Liste des utilisateurs
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: Request) => {
  usersController.getUsers(req);
};