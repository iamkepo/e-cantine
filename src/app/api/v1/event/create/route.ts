"use server";
import eventsController from '@/backend/controllers/events.controller';

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 *
 * @swagger
 * /api/v1/event/create:
 *   post:
 *     summary: Create event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               articleId:
 *                 type: integer
 *               dateId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function POST(req: Request) {
  return eventsController.createEvent(req);
}
