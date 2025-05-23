"use server";
import clientsController from '@/controllers/clientsController';
import { ContextParams } from '@/core/types';
import { NextRequest } from 'next/server';


/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API for managing clients
 *
 * @swagger
 * /api/v1/client/{id}:
 *   get:
 *     summary: Récupérer un client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du client
 *     responses:
 *       200:
 *         description: Client récupéré
 *       404:
 *         description: Client non trouvé
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return clientsController.getClient(req, context.params);
}

/**
 * @swagger
 * /api/v1/client/{id}:
 *   patch:
 *     summary: Mettre à jour un client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du client
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
 *         description: Client mis à jour
 *       404:
 *         description: Client non trouvé
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return clientsController.patchClient(req, context.params);
}

/**
 * @swagger
 * /api/v1/client/{id}:
 *   put:
 *     summary: Mettre à jour un client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               name:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Client mis à jour
 *       404:
 *         description: Client non trouvé
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return clientsController.updateClient(req, context.params);
}

/**
 * @swagger
 * /api/v1/client/{id}:
 *   delete:
 *     summary: Supprimer un client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du client
 *     responses:
 *       200:
 *         description: Client supprimé
 *       404:
 *         description: Client non trouvé
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return clientsController.deleteClient(req, context.params);
}
