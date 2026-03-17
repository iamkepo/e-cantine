/**
 * Helper functions for better-auth integration
 * Maps better-auth API to your existing role system
 */

import { prisma } from "@/libs/prisma";

/**
 * Get user with role data after successful better-auth sign-in
 */
export async function getUserWithRole(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        clients: true,
        admins: true,
        deliverers: true,
        restaurants: true,
      },
    });

    if (!user) return null;

    // Determine user's role
    if (user.clients.length > 0) {
      return {
        ...user,
        role: "client",
        roleData: user.clients[0],
        scope: "client",
      };
    }

    if (user.admins.length > 0) {
      return {
        ...user,
        role: "admin",
        roleData: user.admins[0],
        scope: "admin",
      };
    }

    if (user.deliverers.length > 0) {
      return {
        ...user,
        role: "deliverer",
        roleData: user.deliverers[0],
        scope: "deliverer",
      };
    }

    if (user.restaurants.length > 0) {
      return {
        ...user,
        role: "restaurant",
        roleData: user.restaurants[0],
        scope: "restaurant",
      };
    }

    return null;
  } catch (error: unknown) {
    console.error("Error getting user with role:", error);
    return null;
  }
}

