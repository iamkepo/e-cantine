"use server";

import { prisma } from "@/lib/prisma";

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
  const body = await req.json();
  try {
    const existingClient = await prisma.clients.findUnique({ where: { phone: body.phone } }); 

    if (existingClient) {
      return new Response(JSON.stringify({ error: 'User with this phone already exists' }), { status: 409 });
    }
    delete body.confirmPassword;
    const credentialsUser = { 
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newUser = await prisma.users.create({ data: credentialsUser });
    const newClient = await prisma.clients.create({ data: { ...credentialsUser, userId: newUser.id } });

    return new Response(JSON.stringify({user: newUser, client: newClient}), { status: 201 });

  } catch (error) {
    return new Response(JSON.stringify({ error: `Registration failed: ${error}` }), { status: 400 });
  }
};