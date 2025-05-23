"use server";

import categoriesController from "@/controllers/categoriesController";
import { NextRequest } from "next/server";
import { ContextParams } from "@/core/types";

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 *
 * @swagger 
 * /api/v1/category/{id}:
 *   get:
 *     summary: Récupérer une catégorie
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie récupérée avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: NextRequest, context: ContextParams) => {
  return categoriesController.getCategory(req, context.params);
};

/**
 * @swagger
 * /api/v1/category/{id}:
 *   patch:
 *     summary: Mettre à jour une catégorie
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la catégorie à mettre à jour
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
 *         description: Catégorie mise à jour avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export const PATCH = async (req: NextRequest, context: ContextParams) => {
  return categoriesController.patchCategory(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 *
 * @swagger 
 * /api/v1/category/{id}:
 *   put:
 *     summary: Mettre à jour une catégorie
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export const PUT = async (req: NextRequest, context: ContextParams) => {
  return categoriesController.updateCategory(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 *
 * @swagger 
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie supprimée avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: NextRequest, context: ContextParams) => {
  return categoriesController.deleteCategory(req, context.params);
};