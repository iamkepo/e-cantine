"use server";
import transactionsController from '@/controllers/transactionsController';
import { ContextParams } from '@/core/types';
import { NextRequest } from 'next/server';

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing transactions
 *
 * @swagger 
 * /api/v1/transaction/{id}:
 *   get:
 *     summary: Récupérer une transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la transaction
 *     responses:
 *       200:
 *         description: Transaction récupérée avec succès
 *       404:
 *         description: Transaction non trouvée
 *       500:
 *         description: Erreur interne du serveur
 **/
export async function GET(req: NextRequest, context: ContextParams) {
  return transactionsController.getTransaction(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing transactions
 *
 * @swagger 
 * /api/v1/transaction/{id}:
 *   patch:
 *     summary: Mettre à jour une transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attr:
 *                 type: string
 *               val:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction mise à jour avec succès
 *       404:
 *         description: Transaction non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return transactionsController.patchTransaction(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing transactions
 *
 * @swagger 
 * /api/v1/transaction/{id}:
 *   put:
 *     summary: Mettre à jour une transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la transaction
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
 *       200:
 *         description: Transaction mise à jour avec succès
 *       404:
 *         description: Transaction non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return transactionsController.updateTransaction(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing transactions
 *
 * @swagger 
 * /api/v1/transaction/{id}:
 *   delete:
 *     summary: Supprimer une transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la transaction
 *     responses:
 *       200:
 *         description: Transaction supprimée avec succès
 *       404:
 *         description: Transaction non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return transactionsController.deleteTransaction(req, context.params);
}
