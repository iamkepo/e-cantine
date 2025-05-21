"use server";

import connectionsController from "@/controllers/connectionsController";
import { ContextParams } from "@/core/types";
import { NextRequest } from "next/server";

/**
 * @swagger
 * tags:
 *   name: Connections
 *   description: API for managing connections
 *
 * @swagger 
 * /api/v1/connection/{id}:
 *   get:
 *     summary: Récupérer une connection
 *     tags: [Connections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: Connection récupérée avec succès
 *       404:
 *         description: Connection non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

export const GET = async (req: NextRequest, context: ContextParams) => {
  return connectionsController.getConnection(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Connections
 *   description: API for managing connections
 *
 * @swagger 
 * /api/v1/connection/{id}:
 *   patch:
 *     summary: Mettre à jour une connection
 *     tags: [Connections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: Connection mise à jour avec succès
 *       404:
 *         description: Connection non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export const PATCH = async (req: NextRequest, context: ContextParams) => {
  return connectionsController.patchConnection(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Connections
 *   description: API for managing connections
 *
 * @swagger 
 * /api/v1/connection/{id}:
 *   put:
 *     summary: Mettre à jour une connection
 *     tags: [Connections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: Connection mise à jour avec succès
 *       404:
 *         description: Connection non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export const PUT = async (req: NextRequest, context: ContextParams) => {
  return connectionsController.updateConnection(req, context.params);
};

/**
 * @swagger
 * tags:
 *   name: Connections
 *   description: API for managing connections
 *
 * @swagger 
 * /api/v1/connection/{id}:
 *   delete:
 *     summary: Supprimer une connection
 *     tags: [Connections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: Connection supprimée avec succès
 *       404:
 *         description: Connection non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export const DELETE = async (req: NextRequest, context: ContextParams) => {
  return connectionsController.deleteConnection(req, context.params);
};