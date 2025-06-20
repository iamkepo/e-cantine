"use server";
import notificationsController from '@/backend/controllers/notifications.controller';

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 *
 * @swagger
 * /api/v1/notification/list:
 *   get:
 *     summary: Get notifications
 *     tags: [Notifications]
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
 *         name: userId
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *       - in: query
 *         name: seen
 *         schema:
 *           type: boolean
 *         description: Voir
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Type
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: Request) {
  return notificationsController.getNotifications(req);
}

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 *
 * @swagger
 * /api/v1/notification/list:
 *   delete:
 *     summary: Delete notifications
 *     tags: [Notifications]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des notifications à supprimer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: Request) {
  return notificationsController.deleteNotifications(req);
}