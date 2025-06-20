"use server";
import commandsController from '@/backend/controllers/commands.controller';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';


/**
 * @swagger
 * /api/v1/command/{id}:
 *   get:
 *     summary: Récupérer une commande
 *     tags: [Commands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la commande
 *     responses:
 *       200:
 *         description: Commande récupérée avec succès
 *       404:
 *         description: Commande non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return commandsController.getCommand(req, context.params);
}

/**
 * @swagger
 * /api/v1/command/{id}:
 *   patch:
 *     summary: Mettre à jour une commande
 *     tags: [Commands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la commande
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
 *         description: Commande mise à jour avec succès
 *       404:
 *         description: Commande non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return commandsController.patchCommand(req, context.params);
}

/**
 * @swagger
 * /api/v1/command/{id}:
 *   put:
 *     summary: Mettre à jour une commande
 *     tags: [Commands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Nouveau statut de la commande
 *               eventId:
 *                 type: integer
 *                 description: ID de l'événement associé
 *               restaurantId:
 *                 type: integer
 *                 description: ID du restaurant
 *     responses:
 *       200:
 *         description: Commande mise à jour avec succès
 *       404:
 *         description: Commande non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return commandsController.updateCommand(req, context.params);
}

/**
 * @swagger
 * /api/v1/command/{id}:
 *   delete:
 *     summary: Supprimer une commande
 *     tags: [Commands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la commande
 *     responses:
 *       200:
 *         description: Commande supprimée avec succès
 *       404:
 *         description: Commande non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return commandsController.deleteCommand(req, context.params);
}
