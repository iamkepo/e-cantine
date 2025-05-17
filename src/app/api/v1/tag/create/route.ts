"use server";

import tagsController from "@/controllers/tagsController";

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: API for managing tags
 *
 * @swagger 
 * /api/v1/tag/create:
 *   post:
 *     summary: Créer un tag
 *     tags: [Tags]
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
 *         description: Tag créé avec succès
 *       400:
 *         description: Erreur lors de la création du tag
 */

export const POST = async (req: Request) => {
  return tagsController.createTag(req);
};