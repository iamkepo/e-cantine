"use server";

import articlesController from "@/backend/controllers/articles.controller";
import { ContextParams } from "@/core/types";
import { NextRequest } from "next/server";

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API for managing articles
 *
 * @swagger 
 * /api/v1/article/{id}:
 *   get:
 *     summary: Récupérer un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article récupéré avec succès
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

export async function GET(req: NextRequest, context: ContextParams) {
  return articlesController.getArticle(req, context.params);
}

/**
 * @swagger
 * /api/v1/article/{id}:
 *   patch:
 *     summary: Mettre à jour un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attr:
 *                 type: string
 *                 description: Attribut à modifier
 *               val:
 *                 type: string
 *                 description: Nouvelle valeur
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const PATCH = async (req: NextRequest, context: ContextParams) => {
  return articlesController.patchArticle(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API for managing articles
 *
 * @swagger 
 * /api/v1/article/{id}:
 *   put:
 *     summary: Mettre à jour un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const PUT = async (req: NextRequest, context: ContextParams) => {
  return articlesController.updateArticle(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API for managing articles
 *
 * @swagger 
 * /api/v1/article/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: NextRequest, context: ContextParams) => {
  return articlesController.deleteArticle(req, context.params);
};