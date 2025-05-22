"use server";
import locationsController from '@/controllers/locationsController';

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API for managing locations
 *
 * @swagger
 * /api/v1/location/list:
 *   get:
 *     summary: Get locations
 *     tags: [Locations]
 *     parameters:
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments à récupérer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Recherche
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Statut
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Champ sur lequel trier
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordre du tri
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: integer
 *         description: ID du client
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: Request) {
  return locationsController.getLocations(req);
}

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API for managing locations
 *
 * @swagger
 * /api/v1/location/list:
 *   delete:
 *     summary: Delete locations
 *     tags: [Locations]
 *     parameters:
 *       - in: body
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des locations à supprimer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: Request) {
  return locationsController.deleteLocations(req);
}