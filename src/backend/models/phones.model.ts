/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Base from "@/configs/base";
import { ParamsQuery } from "@/core/types";

class PhonesModel extends Base {
  constructor() {
    super(prisma.phones);
  }

  createPhone = async (credentials: any) => {
    const phone = await this.create(credentials);
    return phone;
  }

  checkPhone = async (indicator: string, number: string) => {
    const phoneExists = await this.model.findUnique({
      where: {
        indicator,
        number
      }
    });
    return phoneExists;
  }

  getPhones = async (params: ParamsQuery & {userId?: number}) => {
    const where: any = {
      OR: [
        { indicator: { contains: params.search, mode: 'insensitive' } },
        { number: { contains: params.search, mode: 'insensitive' } },
      ]
    };
    if (params.userId) {
      where.userId = params.userId;
    }
    if (params.status) {
      where.status = params.status;
    }
    const phonesList = await this.getAll(params, where);
    return phonesList;
  }

  getPhone = async (id: number) => {
    const phone = await this.getOne('id', id);
    return phone;
  }

  checkAttributePhone = (att: string) => {
    return this.checkAttribute(['indicator', 'number', 'userId', 'status'], att);
  }

  patchPhone = async (id: number, patch: {attr: string, val: any}) => {
    const phone = await this.patch(id, patch);
    return phone;
  }

  updatePhone = async (id: number, credentials: any) => {
    const phone = await this.update(id, credentials);
    return phone;
  }

  deletePhone = async (id: number) => {
    const phone = await this.delete(id);
    return phone;
  }

  deleteManyPhones = async (ids: number[]) => {
    const phones = await this.deleteMany(ids);
    return phones;
  }
}

export default PhonesModel;
