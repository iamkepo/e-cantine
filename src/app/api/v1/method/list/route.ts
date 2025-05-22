"use server";
import methodsController from '@/controllers/methodsController';

/**
 * @swagger
 * tags:
 *   name: Methods
 *   description: API for managing methods
 *
 * @swagger
 * /api/v1/method/list:
 *   get:
 *     summary: Get methods
 *     tags: [Methods]
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
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: Request) {
  return methodsController.getMethods(req);
}

/**
 * @swagger
 * tags:
 *   name: Methods
 *   description: API for managing methods
 *
 * @swagger
 * /api/v1/method/list:
 *   delete:
 *     summary: Delete methods
 *     tags: [Methods]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des méthodes à supprimer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: Request) {
  return methodsController.deleteMethods(req);
}