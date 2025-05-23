"use server";
import adminsController from '@/controllers/adminsController';

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: API for managing admins
 *
 * @swagger
 * /api/v1/admin/create:
 *   post:
 *     summary: Créer un admin
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Admin créé
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur interne du serveur
 */
export async function POST(req: Request) {
  return adminsController.createAdmin(req);
}
