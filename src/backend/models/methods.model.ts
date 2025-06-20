/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Base from "@/configs/base";
import { ParamsQuery } from "@/core/types";

class MethodsModel extends Base {
  constructor() {
    super(prisma.methods);
  }

  createMethod = async (credentials: any) => {
    const method = await this.create(credentials);
    return method;
  }

  getMethods = async (params: ParamsQuery) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.status) {
      where.status = params.status;
    }
    const methodsList = await this.getAll(params, where);
    return methodsList;
  }

  getMethod = async (id: number) => {
    const method = await this.getOne('id', id);
    return method;
  }

  checkAttributeMethod = (att: string) => {
    return this.checkAttribute(['name', 'status'], att);
  }

  patchMethod = async (id: number, patch: {attr: string, val: any}) => {
    const method = await this.patch(id, patch);
    return method;
  }

  updateMethod = async (id: number, credentials: any) => {
    const method = await this.update(id, credentials);
    return method;
  }

  deleteMethod = async (id: number) => {
    const method = await this.delete(id);
    return method;
  }

  deleteManyMethods = async (ids: number[]) => {
    const methods = await this.deleteMany(ids);
    return methods;
  }
}

export default MethodsModel;
