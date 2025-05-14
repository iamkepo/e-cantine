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
 * /api/v1/articles:
 *   get:
 *     summary: Récupérer la liste des articles
 *     tags: [Articles]
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
 *         description: Liste des articles
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get('skip') || '0', 10);
  const take = parseInt(searchParams.get('take') || '10', 10);
  const typeId = searchParams.get('typeId') || '0';

  try {
    const types = await prisma.articleType.findMany({
      where: {
        typeId,
      },
    });
    const articles = await prisma.article.findMany({
      where: {
        id: {
          in: types.map((type: any) => type.articleId),
        },
      },
      skip,
      take,
    });

    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};