/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";
import { ParamsQuery } from "@/core/types";

class DeliverersModel extends Model {
  constructor() {
    super(prisma.deliverers);
  }

  createDeliverer = async (credentials: any) => {
    const deliverer = await this.create(credentials);
    return deliverer;
  }

  getDeliverers = async (params: ParamsQuery) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { phone: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.status) {
      where.status = params.status;
    }
    const deliverersList = await this.getAll(params, where);
    return deliverersList;
  }

  getDeliverer = async (id: number) => {
    const deliverer = await this.getOne('id', id);
    return deliverer;
  }

  checkAttributeDeliverer = (att: string) => {
    return this.checkAttribute(['name', 'phone', 'status'], att);
  }

  patchDeliverer = async (id: number, patch: {attr: string, val: any}) => {
    const deliverer = await this.patch(id, patch);
    return deliverer;
  }

  updateDeliverer = async (id: number, credentials: any) => {
    const deliverer = await this.update(id, credentials);
    return deliverer;
  }

  deleteDeliverer = async (id: number) => {
    const deliverer = await this.delete(id);
    return deliverer;
  }

  deleteManyDeliverers = async (ids: number[]) => {
    const deliverers = await this.deleteMany(ids);
    return deliverers;
  }
}

export default DeliverersModel;
