"use server";
import datesController from '@/controllers/datesController';

/**
 * @swagger
 * tags:
 *   name: Dates
 *   description: API for managing dates
 *
 * @swagger
 * /api/v1/date/create:
 *   post:
 *     summary: Create a new date
 *     tags: [Dates]
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
 *         description: Date created successfully
 *       500:
 *         description: Error creating date
 */
export async function POST(req: Request) {
  return datesController.createDate(req);
}
