"use server";
import notificationsController from '@/controllers/notificationsController';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 *
 * @swagger
 * /api/v1/notification/{id}:
 *   get:
 *     summary: Get notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the notification to retrieve
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return notificationsController.getNotification(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 *
 * @swagger
 * /api/v1/notification/{id}:
 *   patch:
 *     summary: Patch notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the notification to patch
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
  return notificationsController.patchNotification(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 *
 * @swagger
 * /api/v1/notification/{id}:
 *   put:
 *     summary: Update notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the notification to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               seen:
 *                 type: boolean
 *               type:
 *                 type: string
 *                 enum: ['PROMOTION', 'ORDER', 'SUBSCRIPTION']
 *               status:
 *                 type: string
 *                 enum: ['PENDING', 'DELIVERED', 'FAILED']
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return notificationsController.updateNotification(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 *
 * @swagger
 * /api/v1/notification/{id}:
 *   delete:
 *     summary: Delete notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the notification to delete
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return notificationsController.deleteNotification(req, context.params);
}
