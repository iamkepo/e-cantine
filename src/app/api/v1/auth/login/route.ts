/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing authentication
 *
 * @swagger
 * /api/v1/auth/login:
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
 *               phone:
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
  const body = await req.json();
  try {
    const existingClient = await prisma.clients.findUnique({ where: { phone: body.phone } });  

    if (!existingClient) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    
    const accessToken = generateAccessToken(existingClient);
    const refreshToken = generateRefreshToken(existingClient);

    return new Response(JSON.stringify({ accessToken, refreshToken }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Login failed: Internal Server Error' }), { status: 500 });
  }
};