/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";
import { ParamsQuery } from "@/core/types";

class ClientsModel extends Model {
  constructor() {
    super(prisma.clients);
  }

  createClient = async (newUser: any) => {
    const newClient = await this.create({userId: newUser.id});
    return newClient;
  }

  checkClient = async (phone: string) => {
    const client = await this.getOne('phone', phone);
    return client;
  }

  getClients = async (params: ParamsQuery & {userId?: number}) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { phone: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.userId) {
      where.userId = params.userId;
    }
    if (params.status) {
      where.status = params.status;
    }
    const clientsList = await this.getAll(params, where);
    return clientsList;
  }

  getClient = async (id: number) => {
    const client = await this.getOne('id', id);
    return client;
  }

  checkAttributeClient = (att: string) => {
    return this.checkAttribute(['name', 'phone', 'userId', 'status'], att);
  }

  patchClient = async (id: number, patch: {attr: string, val: any}) => {
    const client = await this.patch(id, patch);
    return client;
  }

  updateClient = async (id: number, credentials: any) => {
    const client = await this.update(id, credentials);
    return client;
  }

  deleteClient = async (id: number) => {
    const client = await this.delete(id);
    return client;
  }

  deleteManyClients = async (ids: number[]) => {
    const clients = await this.deleteMany(ids);
    return clients;
  }
}

export default ClientsModel;