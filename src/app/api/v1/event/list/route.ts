"use server";
import eventsController from '@/controllers/eventsController';

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 *
 * @swagger
 * /api/v1/event/list:
 *   get:
 *     summary: Get events
 *     tags: [Events]
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
 *         name: articleId
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *       - in: query
 *         name: dateId
 *         schema:
 *           type: integer
 *         description: ID de la date
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: Request) {
  return eventsController.getEvents(req);
}

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 *
 * @swagger
 * /api/v1/event/list:
 *   delete:
 *     summary: Delete events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des events à supprimer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: Request) {
  return eventsController.deleteEvents(req);
}