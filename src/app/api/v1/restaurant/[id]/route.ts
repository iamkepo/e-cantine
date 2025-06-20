"use server";
import restaurantsController from '@/backend/controllers/restaurants.controller';
import { ContextParams } from '@/core/types';
import { NextRequest } from 'next/server';


/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API for managing restaurants
 *
 * @swagger
 * /api/v1/restaurant/{id}:
 *   get:
 *     summary: Récupérer un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du restaurant
 *     responses:
 *       200:
 *         description: Restaurant récupéré
 *       404:
 *         description: Restaurant non trouvé
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return restaurantsController.getRestaurant(req, context.params);
}

/**
 * @swagger
 * /api/v1/restaurant/{id}:
 *   patch:
 *     summary: Mettre à jour un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attr:
 *                 type: string
 *               val:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurant mis à jour
 *       404:
 *         description: Restaurant non trouvé
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return restaurantsController.patchRestaurant(req, context.params);
}

/**
 * @swagger
 * /api/v1/restaurant/{id}:
 *   put:
 *     summary: Mettre à jour un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               name:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Restaurant mis à jour
 *       404:
 *         description: Restaurant non trouvé
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return restaurantsController.updateRestaurant(req, context.params);
}

/**
 * @swagger
 * /api/v1/restaurant/{id}:
 *   delete:
 *     summary: Supprimer un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du restaurant
 *     responses:
 *       200:
 *         description: Restaurant supprimé
 *       404:
 *         description: Restaurant non trouvé
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return restaurantsController.deleteRestaurant(req, context.params);
}
