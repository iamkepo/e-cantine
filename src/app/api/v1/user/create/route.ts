"use server";

import usersController from "@/controllers/usersController";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 *
 * @swagger
 * /api/v1/user/create:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       409:
 *         description: Utilisateur avec ce email existe déjà
 *       400:
 *         description: Erreur lors de la création de l'utilisateur
 */
export const POST = async (req: Request) => {
  return usersController.createUser(req);
};