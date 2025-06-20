"use server";
import transactionsController from '@/backend/controllers/transactions.controller';

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing transactions
 *
 * @swagger
 * /api/v1/transaction/create:
 *   post:
 *     summary: Créer une transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subtotal:
 *                 type: number
 *               shipping:
 *                 type: number
 *               tax:
 *                 type: number
 *               total:
 *                 type: number
 *               promoId:
 *                 type: integer
 *               subscriptionId:
 *                 type: integer
 *               methodId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Transaction créée
 *       500:
 *         description: Erreur lors de la création de la transaction
 */
export async function POST(req: Request) {
  return transactionsController.createTransaction(req);
}
