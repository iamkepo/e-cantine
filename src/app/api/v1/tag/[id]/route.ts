"use server";

import tagsController from "@/controllers/tagsController";
import { ContextParams } from "@/core/interfaces";
import { NextRequest } from "next/server";

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: API for managing tags
 *
 * @swagger 
 * /api/v1/tag/{id}:
 *   get:
 *     summary: Récupérer un tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: Tag récupéré avec succès
 *       404:
 *         description: Tag non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: NextRequest, context: ContextParams) => {
  return tagsController.getTag(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: API for managing tags
 *
 * @swagger 
 * /api/v1/tag/{id}:
 *   patch:
 *     summary: Mettre à jour un tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: Tag mis à jour avec succès
 *       404:
 *         description: Tag non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const PATCH = async (req: NextRequest, context: ContextParams) => {
  return tagsController.patchTag(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: API for managing tags
 *
 * @swagger 
 * /api/v1/tag/{id}:
 *   put:
 *     summary: Mettre à jour un tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: Tag mis à jour avec succès
 *       404:
 *         description: Tag non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const PUT = async (req: NextRequest, context: ContextParams) => {
  return tagsController.updateTag(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: API for managing tags
 *
 * @swagger 
 * /api/v1/tag/{id}:
 *   delete:
 *     summary: Supprimer un tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: Tag supprimé avec succès
 *       404:
 *         description: Tag non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: NextRequest, context: ContextParams) => {
  return tagsController.deleteTag(req, context.params);
};