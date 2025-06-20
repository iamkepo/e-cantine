/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Base from "@/configs/base";
import { ParamsQuery } from "@/core/types";

class DatesModel extends Base {
  constructor() {
    super(prisma.dates);
  }

  createDate = async (credentials: any) => {
    const date = await this.create(credentials);
    return date;
  }

  getDates = async (params: ParamsQuery & {locationId?: number, subscriptionId?: number}) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { deliveryDate: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.locationId) {
      where.locationId = params.locationId;
    }
    if (params.subscriptionId) {
      where.subscriptionId = params.subscriptionId;
    }
    if (params.status) {
      where.status = params.status;
    }
    const datesList = await this.getAll(params, where);
    return datesList;
  }

  getDate = async (id: number) => {
    const date = await this.getOne('id', id);
    return date;
  }

  checkAttributeDate = (att: string) => {
    return this.checkAttribute(['deliveryDate', 'locationId', 'subscriptionId', 'status'], att);
  }

  patchDate = async (id: number, patch: {attr: string, val: any}) => {
    const date = await this.patch(id, patch);
    return date;
  }

  updateDate = async (id: number, credentials: any) => {
    const date = await this.update(id, credentials);
    return date;
  }

  deleteDate = async (id: number) => {
    const date = await this.delete(id);
    return date;
  }

  deleteManyDates = async (ids: number[]) => {
    const dates = await this.deleteMany(ids);
    return dates;
  }
}

export default DatesModel;
