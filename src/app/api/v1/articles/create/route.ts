/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API for managing articles
 *
 * @swagger 
 * /api/v1/articles/create:
 *   post:
 *     summary: Créer un article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Erreur lors de la création de l'article
 */

export const POST = async (req: Request) => {
  const body = await req.json();
  try {
    const credentialsArticle = { 
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newArticle = await prisma.article.create({ data: credentialsArticle });

    return new Response(JSON.stringify({article: newArticle}), { status: 201 });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: `Article creation failed: ${error}` }), { status: 400 });
  }
};