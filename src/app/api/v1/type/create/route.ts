"use server";

import typesController from "@/controllers/typesController";

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: API for managing types
 *
 * @swagger 
 * /api/v1/type/create:
 *   post:
 *     summary: Créer un type
 *     tags: [Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Type créé avec succès
 *       400:
 *         description: Erreur lors de la création du type
 */

export const POST = async (req: Request) => {
  return typesController.createType(req);
};