"use server";

import usersController from "@/controllers/usersController";
import { ContextParams } from "@/core/interfaces";
import { NextRequest } from "next/server";

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
export async function GET(req: NextRequest, context: ContextParams) {
  return usersController.getUser(req, context.params);
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
export async function PATCH(req: NextRequest, context: ContextParams) {
  return usersController.patchUser(req, context.params);
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
export async function PUT(req: NextRequest, context: ContextParams) {
  return usersController.updateUser(req, context.params);
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
export async function DELETE(req: NextRequest, context: ContextParams) {
  return usersController.deleteUser(req, context.params);
}