"use server";
import phonesController from '@/backend/controllers/phones.controller';

/**
 * @swagger
 * tags:
 *   name: Phones
 *   description: API for managing phones
 *
 * @swagger
 * /api/v1/phone/create:
 *   post:
 *     summary: Create phone
 *     tags: [Phones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               indicator:
 *                 type: string
 *               number:
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
  return phonesController.createPhone(req);
}
