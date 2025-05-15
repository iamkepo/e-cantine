"use server";

import usersController from "@/controllers/usersController";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 *
 * @swagger 
 * /api/v1/user/{id}:
 *   get:
 *     summary: Récupérer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(req: Request) {
  usersController.getUser(req);
}

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 *
 * @swagger 
 * /api/v1/user/{id}:
 *   patch:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PATCH(req: Request) {
  usersController.patchUser(req);
}

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 *
 * @swagger 
 * /api/v1/user/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PUT(req: Request) {
  usersController.updateUser(req);
}

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 *
 * @swagger 
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(req: Request) {
  usersController.deleteUser(req);
}