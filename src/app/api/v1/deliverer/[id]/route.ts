"use server";
import deliverersController from '@/backend/controllers/deliverers.controller';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';

/**
 * @swagger
 * tags:
 *   name: Deliverers
 *   description: API for managing deliverers
 *
 * @swagger
 * /api/v1/deliverer/{id}:
 *   get:
 *     summary: Get deliverer
 *     tags: [Deliverers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the deliverer to retrieve
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return deliverersController.getDeliverer(req, context.params);
}

/**
 * @swagger
 * /api/v1/deliverer/{id}:
 *   patch:
 *     summary: Update deliverer
 *     tags: [Deliverers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the deliverer to update
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
 *         description: Success
 *       500:
 *         description: Error
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return deliverersController.patchDeliverer(req, context.params);
}

/**
 * @swagger
 * /api/v1/deliverer/{id}:
 *   put:
 *     summary: Update deliverer
 *     tags: [Deliverers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the deliverer to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               userId:
 *                 type: integer
 *               status:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return deliverersController.updateDeliverer(req, context.params);
}

/**
 * @swagger
 * /api/v1/deliverer/{id}:
 *   delete:
 *     summary: Delete deliverer
 *     tags: [Deliverers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the deliverer to delete
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return deliverersController.deleteDeliverer(req, context.params);
}
