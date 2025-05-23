"use server";
import notificationsController from '@/controllers/notificationsController';

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 *
 * @swagger
 * /api/v1/notification/create:
 *   post:
 *     summary: Create notification
 *     tags: [Notifications]
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
 *               status:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function POST(req: Request) {
  return notificationsController.createNotification(req);
}
