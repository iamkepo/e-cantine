/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { NextRequest } from "next/server";

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
  try {
    const user = req.headers.get("user");
    return new Response(user as string);
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};