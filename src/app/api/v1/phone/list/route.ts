"use server";
import phonesController from '@/backend/controllers/phones.controller';

/**
 * @swagger
 * tags:
 *   name: Phones
 *   description: API for managing phones
 *
 * @swagger
 * /api/v1/phone/list:
 *   get:
 *     summary: Get phones
 *     tags: [Phones]
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
 *         description: ID du user
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: Request) {
  return phonesController.getPhones(req);
}

/**
 * @swagger
 * tags:
 *   name: Phones
 *   description: API for managing phones
 *
 * @swagger
 * /api/v1/phone/list:
 *   delete:
 *     summary: Delete phones
 *     tags: [Phones]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des phones à supprimer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: Request) {
  return phonesController.deletePhones(req);
}