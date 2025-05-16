"use server";

import authController from "@/controllers/authController";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing authentication
 *
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Obtenir un nouveau token d'accès
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token d'accès et token de rafraîchissement
 *       401:
 *         description: Token invalide
 *       500:
 *         description: Erreur interne du serveur
 */
export const POST = async (req: Request) => {
  return authController.refresh(req);
};