/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";
import { ParamsQuery } from "@/core/types";
import { Slot } from "@/enums";

class EventsModel extends Model {
  constructor() {
    super(prisma.events);
  }

  createEvent = async (credentials: any) => {
    const event = await this.create(credentials);
    return event;
  }

  getEvents = async (params: ParamsQuery & {articleId?: number, dateId?: number, subscriptionId?: number, slot: Slot}) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { slot: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.articleId) {
      where.clientId = params.articleId;
    }
    if (params.dateId) {
      where.locationId = params.dateId;
    }
    if (params.subscriptionId) {
      where.restaurantId = params.subscriptionId;
    }
    if (params.status) {
      where.status = params.status;
    }
    const eventsList = await this.getAll(params, where);
    return eventsList;
  }

  getEvent = async (id: number) => {
    const event = await this.getOne('id', id);
    return event;
  }

  checkAttributeEvent = (att: string) => {
    return this.checkAttribute(['slot', 'count', 'articleId', 'dateId', 'subscriptionId', 'status'], att);
  }

  patchEvent = async (id: number, patch: {attr: string, val: any}) => {
    const event = await this.patch(id, patch);
    return event;
  }

  updateEvent = async (id: number, credentials: any) => {
    const event = await this.update(id, credentials);
    return event;
  }

  deleteEvent = async (id: number) => {
    const event = await this.delete(id);
    return event;
  }

  deleteManyEvents = async (ids: number[]) => {
    const events = await this.deleteMany(ids);
    return events;
  }
}

export default EventsModel;
