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
 * tags:
 *   name: Locations
 *   description: API for managing locations
 *
 * @swagger
 * /api/v1/location/{id}:
 *   patch:
 *     summary: Patch location
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the location to patch
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
 *         description: Success
 *       500:
 *         description: Error
 */
export async function PATCH(req: NextRequest, context: ContextParams) {
  return locationsController.patchLocation(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API for managing locations
 *
 * @swagger
 * /api/v1/location/{id}:
 *   put:
 *     summary: Update location
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the location to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               status:
 *                 type: string
 *               clientId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
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
