"use server";
import transactionsController from '@/controllers/transactionsController';


/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing transactions
 *
 * @swagger 
 * /api/v1/transaction/list:
 *   get:
 *     summary: Récupérer la liste des transactions
 *     tags: [Transactions]
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
 *         name: subscriptionId
 *         schema:
 *           type: integer
 *         description: ID de la souscription
 *       - in: query
 *         name: promoId
 *         schema:
 *           type: integer
 *         description: ID de la promotion
 *       - in: query
 *         name: methodId
 *         schema:
 *           type: integer
 *         description: ID du mode de paiement
 *     responses:
 *       200:
 *         description: Liste des transactions
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: Request) {
  return transactionsController.getTransactions(req);
}

/**
 * @swagger
 * /api/v1/transaction/list:
 *   delete:
 *     summary: Supprimer une ou plusieurs transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des transactions à supprimer
 *     responses:
 *       200:
 *         description: Transactions supprimées avec succès
 *       404:
 *         description: Transactions non trouvées
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return transactionsController.deleteTransactions(req);
}
