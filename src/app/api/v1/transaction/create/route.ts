import transactionsController from '@/controllers/transactionsController';

/**
 * @swagger
 * /api/v1/transaction/create:
 *   post:
 *     summary: Créer une transaction
 *     tags: [Transaction]
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */
export async function POST(req: Request) {
  return transactionsController.createTransaction(req);
}
