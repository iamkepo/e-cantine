"use server";
import locationsController from '@/backend/controllers/locations.controller';

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API for managing locations
 *
 * @swagger
 * /api/v1/location/create:
 *   post:
 *     summary: Create location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               status:
 *                 type: string
 *               clientId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function POST(req: Request) {
  return locationsController.createLocation(req);
}
