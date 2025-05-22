"use server";
import promosController from '@/controllers/promosController';

/**
 * @swagger
 * /api/v1/promo/list:
 *   get:
 *     summary: Récupérer la liste des promos
 *     tags: [Promo]
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
 *         name: discount
 *         schema:
 *           type: float
 *         description: Taux de réduction
 *       - in: query
 *         name: maxUsage
 *         schema:
 *           type: integer
 *         description: Nombre maximum d'utilisation
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de début
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de fin
 *     responses:
 *       200:
 *         description: Liste des promos
 *       404:
 *         description: Promos non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: Request) {
  return promosController.getPromos(req);
}

/**
 * @swagger
 * /api/v1/promo/list:
 *   delete:
 *     summary: Supprimer la liste des promos
 *     tags: [Promo]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des promos à supprimer
 *     responses:
 *       200:
 *         description: Liste des promos supprimée
 *       404:
 *         description: Promos non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return promosController.deletePromos(req);
}
  