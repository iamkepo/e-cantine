"use server";
import methodsController from '@/controllers/methodsController';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';

/**
 * @swagger
 * tags:
 *   name: Methods
 *   description: API for managing methods
 *
 * @swagger
 * /api/v1/method/{id}:
 *   get:
 *     summary: Get method
 *     tags: [Methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the method to retrieve
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return methodsController.getMethod(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Methods
 *   description: API for managing methods
 *
 * @swagger
 * /api/v1/method/{id}:
 *   patch:
 *     summary: Patch method
 *     tags: [Methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the method to patch
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
  return methodsController.patchMethod(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Methods
 *   description: API for managing methods
 *
 * @swagger
 * /api/v1/method/{id}:
 *   put:
 *     summary: Update method
 *     tags: [Methods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the method to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
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
