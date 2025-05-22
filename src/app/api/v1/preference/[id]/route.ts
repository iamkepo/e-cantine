"use server";
import preferencesController from '@/controllers/preferencesController';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';

/**
 * @swagger
 * tags:
 *   name: Preferences
 *   description: API for managing preferences
 *
 * @swagger
 * /api/v1/preference/{id}:
 *   get:
 *     summary: Récupérer une preference
 *     tags: [Preferences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la preference
 *     responses:
 *       200:
 *         description: Preference récupérée
 *       404:
 *         description: Preference non trouvée
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return preferencesController.getPreference(req, context.params);
}

/**
 * @swagger
 * /api/v1/preference/{id}:
 *   patch:
 *     summary: Mettre à jour une preference
 *     tags: [Preferences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la preference
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
 *         description: Preference mise à jour
 *       404:
 *         description: Preference non trouvée
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return preferencesController.patchPreference(req, context.params);
}

/**
 * @swagger
 * /api/v1/preference/{id}:
 *   put:
 *     summary: Mettre à jour une preference
 *     tags: [Preferences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la preference
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tagId:
 *                 type: integer
 *               clientId:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Preference mise à jour
 *       404:
 *         description: Preference non trouvée
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return preferencesController.updatePreference(req, context.params);
}

/**
 * @swagger
 * /api/v1/preference/{id}:
 *   delete:
 *     summary: Supprimer une preference
 *     tags: [Preferences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la preference
 *     responses:
 *       200:
 *         description: Preference supprimée
 *       404:
 *         description: Preference non trouvée
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return preferencesController.deletePreference(req, context.params);
}
