/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Base from "@/configs/base";
import { ParamsQuery } from "@/core/types";

class TypesModel extends Base {
  constructor() {
    super(prisma.types);
  }

  createType = async (credentials: any) => {
    const type = await this.create(credentials);
    return type;
  }

  getTypes = async (params: ParamsQuery) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.status) {
      where.status = params.status;
    }
    const typesList = await this.getAll(params, where);
    return typesList;
  }

  getType = async (id: number) => {
    const type = await this.getOne('id', id);
    return type;
  }

  checkAttributeType = (att: string) => {
    return this.checkAttribute(['name', 'status'], att);
  }

  patchType = async (id: number, patch: {attr: string, val: any}) => {
    const type = await this.patch(id, patch);
    return type;
  }

  updateType = async (id: number, credentials: any) => {
    const type = await this.update(id, credentials);
    return type;
  }

  deleteType = async (id: number) => {
    const type = await this.delete(id);
    return type;
  }

  deleteManyTypes = async (ids: number[]) => {
    const types = await this.deleteMany(ids);
    return types;
  }
}

export default TypesModel;