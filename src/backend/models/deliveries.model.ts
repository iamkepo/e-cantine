/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Base from "@/configs/base";
import { ParamsQuery } from "@/core/types";

class DeliveriesModel extends Base {
  constructor() {
    super(prisma.deliveries);
  }

  createDelivery = async (credentials: any) => {
    const delivery = await this.create(credentials);
    return delivery;
  }

  getDeliveries = async (params: ParamsQuery & {commandId?: number, delivererId?: number}) => {
    const where: any = {};
    if (params.commandId) {
      where.commandId = params.commandId;
    }
    if (params.delivererId) {
      where.delivererId = params.delivererId;
    }
    if (params.status) {
      where.status = params.status;
    }
    const deliveriesList = await this.getAll(params, where);
    return deliveriesList;
  }

  getDelivery = async (id: number) => {
    const delivery = await this.getOne('id', id);
    return delivery;
  }

  checkAttributeDelivery = (att: string) => {
    return this.checkAttribute(['commandId', 'delivererId', 'status'], att);
  }

  patchDelivery = async (id: number, patch: {attr: string, val: any}) => {
    const delivery = await this.patch(id, patch);
    return delivery;
  }

  updateDelivery = async (id: number, credentials: any) => {
    const delivery = await this.update(id, credentials);
    return delivery;
  }

  deleteDelivery = async (id: number) => {
    const delivery = await this.delete(id);
    return delivery;
  }

  deleteManyDeliveries = async (ids: number[]) => {
    const deliveries = await this.deleteMany(ids);
    return deliveries;
  }
}

export default DeliveriesModel;
