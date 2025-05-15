"use server";

import authController from "@/controllers/authController";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing authentication
 *
 * @swagger
 * /api/v1/auth/login/admin:
 *   post:
 *     summary: Se connecter
 *     tags: [Auth]
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
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const POST = async (req: Request) => {
  authController.loginAdmin(req);
};