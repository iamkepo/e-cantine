"use server";
import adminsController from '@/backend/controllers/admins.controller';
import { ContextParams } from '@/core/types';
import { NextRequest } from 'next/server';


/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: API for managing admins
 *
 * @swagger
 * /api/v1/admin/{id}:
 *   get:
 *     summary: Récupérer un admin
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du admin
 *     responses:
 *       200:
 *         description: Admin récupéré
 *       404:
 *         description: Admin non trouvé
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return adminsController.getAdmin(req, context.params);
}

/**
 * @swagger
 * /api/v1/admin/{id}:
 *   patch:
 *     summary: Mettre à jour un admin
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du admin
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
 *         description: Admin mis à jour
 *       404:
 *         description: Admin non trouvé
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return adminsController.patchAdmin(req, context.params);
}

/**
 * @swagger
 * /api/v1/admin/{id}:
 *   put:
 *     summary: Mettre à jour un admin
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Admin mis à jour
 *       404:
 *         description: Admin non trouvé
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return adminsController.updateAdmin(req, context.params);
}

/**
 * @swagger
 * /api/v1/admin/{id}:
 *   delete:
 *     summary: Supprimer un admin
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du admin
 *     responses:
 *       200:
 *         description: Admin supprimé
 *       404:
 *         description: Admin non trouvé
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return adminsController.deleteAdmin(req, context.params);
}
