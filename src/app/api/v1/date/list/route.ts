"use server";
import datesController from '@/backend/controllers/dates.controller';

/**
 * @swagger
 * tags:
 *   name: Dates
 *   description: API for managing dates
 *
 * @swagger
 * /api/v1/date/list:
 *   get:
 *     summary: Get dates
 *     tags: [Dates]
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
 *         name: subscriptionId
 *         schema:
 *           type: integer
 *         description: ID de la souscription
 *       - in: query
 *         name: locationId
 *         schema:
 *           type: integer
 *         description: ID de la localisation
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: Request) {
  return datesController.getDates(req);
}

/**
 * @swagger
 * tags:
 *   name: Dates
 *   description: API for managing dates
 *
 * @swagger
 * /api/v1/date/list:
 *   delete:
 *     summary: Delete dates
 *     tags: [Dates]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des dates à supprimer
 *     responses:
 *       200:
 *         description: Dates supprimées avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return datesController.deleteDates(req);
}