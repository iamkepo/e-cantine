/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 *
 * @swagger
 * /api/v1/users/create:
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
  const body = await req.json();
  try {
    delete body.confirmPassword;
    const credentialsUser = { 
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newUser = await prisma.users.create({ data: credentialsUser });

    return new Response(JSON.stringify({user: newUser}), { status: 201 });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: `Registration failed: ${error}` }), { status: 400 });
  }
};