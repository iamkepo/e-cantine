"use server";
import deliveriesController from '@/controllers/deliveriesController';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';

/**
 * @swagger
 * /api/v1/delivery/{id}:
 *   get:
 *     summary: Récupérer une livraison
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la livraison à récupérer
 *     responses:
 *       200:
 *         description: Livraison récupérée avec succès
 *       404:
 *         description: Livraison non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return deliveriesController.getDelivery(req, context.params);
}

/**
 * @swagger
 * /api/v1/delivery/{id}:
 *   patch:
 *     summary: Mettre à jour partiellement une livraison
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la livraison à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attr:
 *                 type: string
 *                 description: Attribut à modifier
 *               val:
 *                 type: string
 *                 description: Nouvelle valeur
 *     responses:
 *       200:
 *         description: Livraison modifiée avec succès
 *       404:
 *         description: Livraison non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return deliveriesController.patchDelivery(req, context.params);
}

/**
 * @swagger
 * /api/v1/delivery/{id}:
 *   put:
 *     summary: Mettre à jour une livraison
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la livraison à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Nouveau statut de la livraison
 *               commandId:
 *                 type: integer
 *                 description: ID de la commande associée
 *               delivererId:
 *                 type: integer
 *                 description: ID du livreur
 *     responses:
 *       200:
 *         description: Livraison mise à jour avec succès
 *       404:
 *         description: Livraison non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return deliveriesController.updateDelivery(req, context.params);
}


/**
 * @swagger
 * /api/v1/delivery/{id}:
 *   delete:
 *     summary: Supprimer une livraison
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la livraison à supprimer
 *     responses:
 *       200:
 *         description: Livraison supprimée avec succès
 *       404:
 *         description: Livraison non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return deliveriesController.deleteDelivery(req, context.params);
}
