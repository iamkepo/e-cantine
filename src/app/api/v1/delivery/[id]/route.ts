"use server";
import deliveriesController from '@/controllers/deliveriesController';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: API for managing deliveries
 *
 * @swagger
 * /api/v1/delivery/{id}:
 *   get:
 *     summary: Get delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the delivery to retrieve
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return deliveriesController.getDelivery(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: API for managing deliveries
 *
 * @swagger
 * /api/v1/delivery/{id}:
 *   patch:
 *     summary: Patch delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the delivery to patch
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
  return deliveriesController.patchDelivery(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: API for managing deliveries
 *
 * @swagger
 * /api/v1/delivery/{id}:
 *   put:
 *     summary: Update delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the delivery to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               commandId:
 *                 type: integer
 *               delivererId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return deliveriesController.updateDelivery(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: API for managing deliveries
 *
 * @swagger
 * /api/v1/delivery/{id}:
 *   delete:
 *     summary: Delete delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the delivery to delete
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return deliveriesController.deleteDelivery(req, context.params);
}
