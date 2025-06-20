"use server";
import clientsController from "@/backend/controllers/clients.controller";

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API for managing clients
 *
 * @swagger
 * /api/v1/client/list:
 *   get:
 *     summary: Récupérer la liste des clients
 *     tags: [Clients]
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
 *         description: Liste des clients
 *       404:
 *         description: Clients non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: Request) {
  return clientsController.getClients(req);
}

/**
 * @swagger
 * /api/v1/client/list:
 *   delete:
 *     summary: Supprimer la liste des clients
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: IDs des clients à supprimer
 *     responses:
 *       200:
 *         description: Liste des clients supprimée
 *       404:
 *         description: Clients non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  return clientsController.deleteClients(req);
}
  
