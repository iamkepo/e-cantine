/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Base from "@/configs/base";
import { ParamsQuery } from "@/core/types";
import { NotificationType } from "@/enums";

class NotificationsModel extends Base {
  constructor() {
    super(prisma.notifications);
  }

  createNotification = async (credentials: any) => {
    const notification = await this.create(credentials);
    return notification;
  }

  getNotifications = async (params: ParamsQuery & {seen?: boolean, type?: NotificationType, userId?: number}) => {
    const where: any = {
      OR: [
        { message: { contains: params.search, mode: 'insensitive' } },
      ]
    };
    if (params.seen) {
      where.seen = params.seen;
    }
    if (params.type) {
      where.type = params.type;
    }
    if (params.userId) {
      where.userId = params.userId;
    }
    if (params.status) {
      where.status = params.status;
    }
    const notificationsList = await this.getAll(params, where);
    return notificationsList;
  }

  getNotification = async (id: number) => {
    const notification = await this.getOne('id', id);
    return notification;
  }

  checkAttributeNotification = (att: string) => {
    return this.checkAttribute(['message', 'seen', 'type', 'status'], att);
  }

  patchNotification = async (id: number, patch: {attr: string, val: any}) => {
    const notification = await this.patch(id, patch);
    return notification;
  }

  updateNotification = async (id: number, credentials: any) => {
    const notification = await this.update(id, credentials);
    return notification;
  }

  deleteNotification = async (id: number) => {
    const notification = await this.delete(id);
    return notification;
  }

  deleteManyNotifications = async (ids: number[]) => {
    const notifications = await this.deleteMany(ids);
    return notifications;
  }
}

export default NotificationsModel;
