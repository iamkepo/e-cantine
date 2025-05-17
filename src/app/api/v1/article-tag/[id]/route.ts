"use server";

import articleTagsController from "@/controllers/ArticleTagsController";
import { ContextParams } from "@/core/interfaces";
import { NextRequest } from "next/server";

/**
 * @swagger
 * tags:
 *   name: ArticleTags
 *   description: API for managing article tags
 *
 * @swagger 
 * /api/v1/article-tag/{id}:
 *   get:
 *     summary: Récupérer un articleTag
 *     tags: [ArticleTags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: ArticleTag récupéré avec succès
 *       404:
 *         description: ArticleTag non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: NextRequest, context: ContextParams) => {
  return articleTagsController.getArticleTag(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: ArticleTags
 *   description: API for managing article tags
 *
 * @swagger 
 * /api/v1/article-tag/{id}:
 *   patch:
 *     summary: Mettre à jour un articleTag
 *     tags: [ArticleTags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: ArticleTag mis à jour avec succès
 *       404:
 *         description: ArticleTag non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const PATCH = async (req: NextRequest, context: ContextParams) => {
  return articleTagsController.patchArticleTag(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: ArticleTags
 *   description: API for managing article tags
 *
 * @swagger 
 * /api/v1/article-tag/{id}:
 *   put:
 *     summary: Mettre à jour un articleTag
 *     tags: [ArticleTags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: ArticleTag mis à jour avec succès
 *       404:
 *         description: ArticleTag non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const PUT = async (req: NextRequest, context: ContextParams) => {
  return articleTagsController.updateArticleTag(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: ArticleTags
 *   description: API for managing article tags
 *
 * @swagger 
 * /api/v1/article-tag/{id}:
 *   delete:
 *     summary: Supprimer un articleTag
 *     tags: [ArticleTags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: ArticleTag supprimé avec succès
 *       404:
 *         description: ArticleTag non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: NextRequest, context: ContextParams) => {
  return articleTagsController.deleteArticleTag(req, context.params);
};