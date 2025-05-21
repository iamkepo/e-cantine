"use server";

import typesController from "@/controllers/typesController";
import { NextRequest } from "next/server";
import { ContextParams } from "@/core/types";

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: API for managing types
 *
 * @swagger 
 * /api/v1/type/{id}:
 *   get:
 *     summary: Récupérer un type
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du type
 *     responses:
 *       200:
 *         description: Type récupéré avec succès
 *       404:
 *         description: Type non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: NextRequest, context: ContextParams) => {
  return typesController.getType(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: API for managing types
 *
 * @swagger 
 * /api/v1/type/{id}:
 *   patch:
 *     summary: Mettre à jour un type
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du type
 *     responses:
 *       200:
 *         description: Type mis à jour avec succès
 *       404:
 *         description: Type non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const PATCH = async (req: NextRequest, context: ContextParams) => {
  return typesController.patchType(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: API for managing types
 *
 * @swagger 
 * /api/v1/type/{id}:
 *   put:
 *     summary: Mettre à jour un type
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du type
 *     responses:
 *       200:
 *         description: Type mis à jour avec succès
 *       404:
 *         description: Type non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const PUT = async (req: NextRequest, context: ContextParams) => {
  return typesController.updateType(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: API for managing types
 *
 * @swagger 
 * /api/v1/type/{id}:
 *   delete:
 *     summary: Supprimer un type
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du type
 *     responses:
 *       200:
 *         description: Type supprimé avec succès
 *       404:
 *         description: Type non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: NextRequest, context: ContextParams) => {
  return typesController.deleteType(req, context.params);
};