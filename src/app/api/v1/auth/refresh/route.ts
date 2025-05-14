/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { generateAccessToken } from "@/lib/jwt";
import jwt from "jsonwebtoken";

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
  const body = await req.json();
  const refreshToken = body.refreshToken;
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
      if (err) {
        return new Response(JSON.stringify({ error: 'Refresh token failed: Invalid token' }), { status: 401 });
      }
      const accessToken = generateAccessToken(user);
      return new Response(JSON.stringify({ accessToken }));
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Refresh token failed: Internal Server Error' }), { status: 500 });
  }
};