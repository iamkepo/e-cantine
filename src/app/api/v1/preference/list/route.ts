"use server";
import preferencesController from '@/backend/controllers/preferences.controller';

/**
 * @swagger
 * tags:
 *   name: Preferences
 *   description: API for managing preferences
 *
 * @swagger
 * /api/v1/preference/list:
 *   get:
 *     summary: Récupérer la liste des preferences
 *     tags: [Preferences]
 *     parameters:
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments à récupérer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Recherche
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Statut
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Champ sur lequel trier
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordre du tri
 *       - in: query
 *         name: tagId
 *         schema:
 *           type: integer
 *         description: ID du tag
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: integer
 *         description: ID du client
 *     responses:
 *       200:
 *         description: Liste des preferences
 *       404:
 *         description: Preferences non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: Request) {
  return preferencesController.getPreferences(req);
}

/**
 * @swagger
 * /api/v1/preference/list:
 *   delete:
 *     summary: Supprimer la liste des preferences
 *     tags: [Preferences]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des preferences à supprimer
 *     responses:
 *       200:
 *         description: Liste des preferences supprimées
 *       404:
 *         description: Preferences non trouvées
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return preferencesController.deletePreferences(req);
}
