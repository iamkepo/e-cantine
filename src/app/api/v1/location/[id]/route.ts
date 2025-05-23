"use server";
import locationsController from '@/controllers/locationsController';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API for managing locations
 *
 * @swagger
 * /api/v1/location/{id}:
 *   get:
 *     summary: Get location
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the location to retrieve
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return locationsController.getLocation(req, context.params);
}

/**
 * @swagger
 * /api/v1/location/{id}:
 *   patch:
 *     summary: Mettre à jour un emplacement
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'emplacement à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attr:
 *                 type: string
 *                 description: Attribut à modifier
 *               val:
 *                 type: string
 *                 description: Nouvelle valeur
 *     responses:
 *       200:
 *         description: Emplacement modifié avec succès
 *       404:
 *         description: Emplacement non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return locationsController.patchLocation(req, context.params);
}

/**
 * @swagger
 * /api/v1/location/{id}:
 *   put:
 *     summary: Mettre à jour un emplacement
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'emplacement à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: Adresse complète
 *               longitude:
 *                 type: number
 *                 description: Longitude GPS
 *               city:
 *                 type: string
 *                 description: Ville
 *               country:
 *                 type: string
 *                 description: Pays
 *               zipCode:
 *                 type: string
 *                 description: Code postal
 *               status:
 *                 type: string
 *                 description: Statut de l'emplacement
 *               clientId:
 *                 type: integer
 *                 description: ID du client associé
 *     responses:
 *       200:
 *         description: Emplacement mis à jour avec succès
 *       404:
 *         description: Emplacement non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return locationsController.updateLocation(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API for managing locations
 *
 * @swagger
 * /api/v1/location/{id}:
 *   delete:
 *     summary: Delete location
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the location to delete
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return locationsController.deleteLocation(req, context.params);
}
