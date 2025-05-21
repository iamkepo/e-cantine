/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";

class TypesModel extends Model {
  constructor() {
    super(prisma.types);
  }

  createType = async (credentials: any) => {
    const type = await this.create(credentials);
    return type;
  }

  getTypes = async (params: { take: number, search: string, status: string, page: number, orderBy: string, order: string }) => {
    const typesList = await this.getAll(params);
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