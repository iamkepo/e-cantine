"use server";
import eventsController from '@/controllers/eventsController';
import { NextRequest } from 'next/server';
import { ContextParams } from '@/core/types';

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 *
 * @swagger
 * /api/v1/event/{id}:
 *   get:
 *     summary: Get event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the event to retrieve
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function GET(req: NextRequest, context: ContextParams) {
  return eventsController.getEvent(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 *
 * @swagger
 * /api/v1/event/{id}:
 *   patch:
 *     summary: Patch event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the event to patch
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
  return eventsController.patchEvent(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 *
 * @swagger
 * /api/v1/event/{id}:
 *   put:
 *     summary: Update event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: integer
 *               slot:
 *                 type: string
 *               status:
 *                 type: string
 *               articleId:
 *                 type: integer
 *               dateId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function PUT(req: NextRequest, context: ContextParams) {
  return eventsController.updateEvent(req, context.params);
}

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 *
 * @swagger
 * /api/v1/event/{id}:
 *   delete:
 *     summary: Delete event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the event to delete
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */
export async function DELETE(req: NextRequest, context: ContextParams) {
  return eventsController.deleteEvent(req, context.params);
}