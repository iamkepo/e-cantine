"use server";
import promosController from '@/controllers/promosController';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';


/**
 * @swagger
 * /api/v1/promo/{id}:
 *   get:
 *     summary: Récupérer une promo
 *     tags: [Promos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la promo
 *     responses:
 *       200:
 *         description: Promo récupérée
 *       404:
 *         description: Promo non trouvée
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return promosController.getPromo(req, context.params);
}

/**
 * @swagger
 * /api/v1/promo/{id}:
 *   patch:
 *     summary: Mettre à jour une promo
 *     tags: [Promos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la promo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attr:
 *                 type: string
 *                 description: Nom de l'attribut à modifier
 *               val:
 *                 type: string
 *                 description: Nouvelle valeur
 *     responses:
 *       200:
 *         description: Promo mise à jour
 *       404:
 *         description: Promo non trouvée
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return promosController.patchPromo(req, context.params);
}

/**
 * @swagger
 * /api/v1/promo/{id}:
 *   put:
 *     summary: Mettre à jour une promo
 *     tags: [Promos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la promo
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
 *                 description: Pourcentage ou montant de réduction
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
 *       200:
 *         description: Promo mise à jour
 *       404:
 *         description: Promo non trouvée
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return promosController.updatePromo(req, context.params);
}

/**
 * @swagger
 * /api/v1/promo/{id}:
 *   delete:
 *     summary: Supprimer une promo
 *     tags: [Promos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la promo
 *     responses:
 *       200:
 *         description: Promo supprimée
 *       404:
 *         description: Promo non trouvée
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return promosController.deletePromo(req, context.params);
}
