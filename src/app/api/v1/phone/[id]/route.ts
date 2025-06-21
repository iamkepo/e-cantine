"use server";
import phonesController from '@/backend/controllers/phones.controller';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';

/**
 * @swagger
 * tags:
 *   name: Phones
 *   description: API for managing phones
 *
 * @swagger
 * /api/v1/phone/{id}:
 *   get:
 *     summary: Get phone
 *     tags: [Phones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du téléphone à récupérer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return phonesController.getPhone(req, context.params);
}

/**
 * @swagger
 * /api/v1/phone/{id}:
 *   patch:
 *     summary: Mettre à jour un téléphone
 *     tags: [Phones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du téléphone à modifier
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
 *         description: Téléphone modifié avec succès
 *       404:
 *         description: Téléphone non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return phonesController.patchPhone(req, context.params);
}

/**
 * @swagger
 * /api/v1/phone/{id}:
 *   put:
 *     summary: Mettre à jour un téléphone
 *     tags: [Phones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du téléphone à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               indicator:
 *                 type: string
 *                 description: Indicateur
 *               number:
 *                 type: string
 *                 description: Numéro
 *               userId:
 *                 type: integer
 *                 description: ID du user
 *     responses:
 *       200:
 *         description: Téléphone mis à jour avec succès
 *       404:
 *         description: Téléphone non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return phonesController.updatePhone(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Phones
 *   description: API for managing phones
 *
 * @swagger
 * /api/v1/phone/{id}:
 *   delete:
 *     summary: Delete phone
 *     tags: [Phones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du téléphone à supprimer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return phonesController.deletePhone(req, context.params);
}
