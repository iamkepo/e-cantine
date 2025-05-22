"use server";
import preferencesController from '@/controllers/preferencesController';

/**
 * @swagger
 * tags:
 *   name: Preferences
 *   description: API for managing preferences
 *
 * @swagger
 * /api/v1/preference/create:
 *   post:
 *     summary: Créer une preference
 *     tags: [Preferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tagId:
 *                 type: integer
 *               clientId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Preference créée
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur interne du serveur
 */
export async function POST(req: Request) {
  return preferencesController.createPreference(req);
}
