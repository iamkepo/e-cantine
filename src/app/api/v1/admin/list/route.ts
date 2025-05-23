"use server";
import adminsController from "@/controllers/adminsController";

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: API for managing admins
 *
 * @swagger
 * /api/v1/admin/list:
 *   get:
 *     summary: Récupérer la liste des admins
 *     tags: [Admins]
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
 *         description: Liste des admins
 *       404:
 *         description: Admins non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: Request) {
  return adminsController.getAdmins(req);
}

/**
 * @swagger
 * /api/v1/admin/list:
 *   delete:
 *     summary: Supprimer la liste des admins
 *     tags: [Admins]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des admins à supprimer
 *     responses:
 *       200:
 *         description: Liste des admins supprimée
 *       404:
 *         description: Admins non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return adminsController.deleteAdmins(req);
}
  
