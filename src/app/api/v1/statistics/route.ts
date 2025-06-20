"use server";

import statisticsController from "@/backend/controllers/statistics.controller";

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: API for managing statistics
 *
 * @swagger
 * /api/v1/statistics:
 *   get:
 *     summary: Récupérer les statistiques
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Statistiques récupérées
 *       500:
 *         description: Erreur interne du serveur
 */
export const GET = async () => {
  return statisticsController.getStatistics();
};