"use server";

import { prisma } from "@/lib/prisma";
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 *
 * @swagger 
 * /api/v1/users:
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
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get('skip') || '0', 10);
  const take = parseInt(searchParams.get('take') || '10', 10);

  try {
    const users = await prisma.users.findMany({
      skip,
      take,
    });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};