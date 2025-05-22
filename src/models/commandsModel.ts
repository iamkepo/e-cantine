/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";
import { ParamsQuery } from "@/core/types";

class CommandsModel extends Model {
  constructor() {
    super(prisma.commands);
  }

  createCommand = async (credentials: any) => {
    const command = await this.create(credentials);
    return command;
  }

  getCommands = async (params: ParamsQuery & {eventId?: number, restaurantId?: number}) => {
    const where: any = {};
    if (params.eventId) {
      where.eventId = params.eventId;
    }
    if (params.restaurantId) {
      where.restaurantId = params.restaurantId;
    }
    if (params.status) {
      where.status = params.status;
    }
    const commandsList = await this.getAll(params, where);
    return commandsList;
  }

  getCommand = async (id: number) => {
    const command = await this.getOne('id', id);
    return command;
  }

  checkAttributeCommand = (att: string) => {
    return this.checkAttribute(['eventId', 'restaurantId', 'status'], att);
  }

  patchCommand = async (id: number, patch: {attr: string, val: any}) => {
    const command = await this.patch(id, patch);
    return command;
  }

  updateCommand = async (id: number, credentials: any) => {
    const command = await this.update(id, credentials);
    return command;
  }

  deleteCommand = async (id: number) => {
    const command = await this.delete(id);
    return command;
  }

  deleteManyCommands = async (ids: number[]) => {
    const commands = await this.deleteMany(ids);
    return commands;
  }
}

export default CommandsModel;
