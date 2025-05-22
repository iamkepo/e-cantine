"use server";
import subscriptionsController from '@/controllers/subscriptionsController';
import { ContextParams } from '@/core/types';
import { NextRequest } from 'next/server';


/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: API for managing subscriptions
 *
 * @swagger
 * /api/v1/subscription/{id}:
 *   get:
 *     summary: Récupérer une subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la subscription
 *     responses:
 *       200:
 *         description: Subscription récupérée
 *       404:
 *         description: Subscription non trouvée
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return subscriptionsController.getSubscription(req, context.params);
}

/**
 * @swagger
 * /api/v1/subscription/{id}:
 *   patch:
 *     summary: Mettre à jour une subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la subscription
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
 *         description: Subscription mise à jour
 *       404:
 *         description: Subscription non trouvée
 */
export async function PATCH(req: NextRequest, context: ContextParams ) {
  return subscriptionsController.patchSubscription(req, context.params);
}

/**
 * @swagger
 * /api/v1/subscription/{id}:
 *   put:
 *     summary: Mettre à jour une subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weeks:
 *                 type: integer
 *               checkedDays:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               transactionId:
 *                 type: integer
 *               clientId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Subscription mise à jour
 *       404:
 *         description: Subscription non trouvée
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return subscriptionsController.updateSubscription(req, context.params);
}

/**
 * @swagger
 * /api/v1/subscription/{id}:
 *   delete:
 *     summary: Supprimer une subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la subscription
 *     responses:
 *       200:
 *         description: Subscription supprimée
 *       404:
 *         description: Subscription non trouvée
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return subscriptionsController.deleteSubscription(req, context.params);
}
