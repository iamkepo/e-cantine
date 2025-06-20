"use server";
import methodsController from '@/backend/controllers/methods.controller';

/**
 * @swagger
 * /api/v1/method/list:
 *   get:
 *     summary: Récupérer la liste des méthodes
 *     tags: [Methods]
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
 *         description: Recherche textuelle dans les méthodes
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Statut de la méthode (active/inactive)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page courante pour la pagination
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Champ sur lequel trier la liste
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordre du tri (asc/desc)
 *     responses:
 *       200:
 *         description: Liste des méthodes
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: Request) {
  return methodsController.getMethods(req);
}

/**
 * @swagger
 * /api/v1/method/list:
 *   delete:
 *     summary: Supprimer plusieurs méthodes
 *     tags: [Methods]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: Liste des IDs des méthodes à supprimer
 *     responses:
 *       200:
 *         description: Méthodes supprimées avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return methodsController.deleteMethods(req);
}