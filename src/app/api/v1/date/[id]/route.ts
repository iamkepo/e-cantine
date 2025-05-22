"use server";

import datesController from '@/controllers/datesController';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';


/**
 * @swagger
 * tags:
 *   name: Dates
 *   description: API for managing dates
 *
 * @swagger
 * /api/v1/date/{id}:
 *   get:
 *     summary: Get date
 *     tags: [Dates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the date to retrieve
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return datesController.getDate(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Dates
 *   description: API for managing dates
 *
 * @swagger
 * /api/v1/date/{id}:
 *   patch:
 *     summary: Update date
 *     tags: [Dates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the date to update
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
  return datesController.patchDate(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Dates
 *   description: API for managing dates
 *
 * @swagger
 * /api/v1/date/{id}:
 *   put:
 *     summary: Update date
 *     tags: [Dates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the date to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deliveryDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *               subscriptionId:
 *                 type: integer
 *               locationId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return datesController.updateDate(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Dates
 *   description: API for managing dates
 *
 * @swagger
 * /api/v1/date/{id}:
 *   delete:
 *     summary: Delete date
 *     tags: [Dates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the date to delete
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return datesController.deleteDate(req, context.params);
}
