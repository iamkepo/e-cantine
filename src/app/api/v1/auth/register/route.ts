"use server";

import authController from "@/backend/controllers/auth.controller";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing authentication
 *
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       409:
 *         description: Utilisateur avec ce phone existe déjà
 *       400:
 *         description: Erreur lors de la création de l'utilisateur
 */
export const POST = async (req: Request) => {
  return authController.register(req);
};