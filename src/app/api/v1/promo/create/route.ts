"use server";
import promosController from '@/backend/controllers/promos.controller';

/**
 * @swagger
 * /api/v1/promo/create:
 *   post:
 *     summary: Créer une promo
 *     tags: [Promos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Code de la promo
 *               discount:
 *                 type: number
 *                 description: Montant ou pourcentage de réduction
 *               maxUsage:
 *                 type: number
 *                 description: Nombre maximal d'utilisations
 *               countUsage:
 *                 type: number
 *                 description: Nombre d'utilisations actuelles
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Date de début
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Date de fin
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
