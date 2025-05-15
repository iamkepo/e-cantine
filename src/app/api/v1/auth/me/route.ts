"use server";

import { NextRequest } from "next/server";
import authController from "@/controllers/authController";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing authentication
 *
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Obtenir les informations de l'utilisateur connecté
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur
 *       500:
 *         description: Erreur interne du serveur
 */
export const GET = async (req: NextRequest) => {
  authController.me(req);
};