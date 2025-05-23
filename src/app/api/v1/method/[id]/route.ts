"use server";
import methodsController from '@/controllers/methodsController';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';

/**
 * @swagger
 * /api/v1/method/{id}:
 *   get:
 *     summary: Récupérer une méthode
 *     tags: [Methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la méthode à récupérer
 *     responses:
 *       200:
 *         description: Méthode récupérée avec succès
 *       404:
 *         description: Méthode non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return methodsController.getMethod(req, context.params);
}

/**
 * @swagger
 * /api/v1/method/{id}:
 *   patch:
 *     summary: Mettre à jour une méthode
 *     tags: [Methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la méthode à modifier
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
 *         description: Méthode modifiée avec succès
 *       404:
 *         description: Méthode non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return methodsController.patchMethod(req, context.params);
}

/**
 * @swagger
 * /api/v1/method/{id}:
 *   put:
 *     summary: Mettre à jour une méthode
 *     tags: [Methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la méthode à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nouveau nom de la méthode
 *               status:
 *                 type: string
 *                 description: Statut de la méthode
 *     responses:
 *       200:
 *         description: Méthode mise à jour avec succès
 *       404:
 *         description: Méthode non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return methodsController.updateMethod(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Methods
 *   description: API for managing methods
 *
 * @swagger
 * /api/v1/method/{id}:
 *   delete:
 *     summary: Delete method
 *     tags: [Methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the method to delete
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return methodsController.deleteMethod(req, context.params);
}
