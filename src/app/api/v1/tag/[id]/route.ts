"use server";

import tagsController from "@/controllers/tagsController";

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

export const GET = async (req: Request) => {
  return tagsController.getTag(req);
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
export const PATCH = async (req: Request) => {
  return tagsController.patchTag(req);
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
export const PUT = async (req: Request) => {
  return tagsController.updateTag(req);
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
export const DELETE = async (req: Request) => {
  return tagsController.deleteTag(req);
};