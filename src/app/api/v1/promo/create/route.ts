"use server";
import promosController from '@/controllers/promosController';

/**
 * @swagger
 * /api/v1/promo/create:
 *   post:
 *     summary: Créer une promo
 *     tags: [Promo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               discount:
 *                 type: float
 *               maxUsage:
 *                 type: number
 *               countUsage:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Promo créée
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur interne du serveur
 */
export async function POST(req: Request) {
  return promosController.createPromo(req);
}
