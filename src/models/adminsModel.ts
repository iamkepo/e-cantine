/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";
import { ParamsQuery } from "@/core/types";

class AdminsModel extends Model {
  constructor() {
    super(prisma.admins);
  }

  createAdmin = async (newUser: any) => {
    const admin = await this.create({userId: newUser.id});
    return admin;
  }

  checkAdmin = async (email: string) => {
    const admin = await this.getOne('email', email);
    return admin;
  }

  getAdmins = async (params: ParamsQuery & {userId?: number}) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { email: { contains: params.search, mode: 'insensitive' } },
        { name: { contains: params.search, mode: 'insensitive' } }
      ];
    }
    if (params.userId) {
      where.userId = params.userId;
    }
    if (params.status) {
      where.status = params.status;
    }
    const adminsList = await this.getAll(params, where);
    return adminsList;
  }

  getAdmin = async (id: number) => {
    const admin = await this.getOne('id', id);
    return admin;
  }

  checkAttributeAdmin = (att: string) => {
    return this.checkAttribute(['email', 'name', 'userId', 'status'], att);
  }

  patchAdmin = async (id: number, patch: {attr: string, val: any}) => {
    const admin = await this.patch(id, patch);
    return admin;
  }

  updateAdmin = async (id: number, credentials: any) => {
    const admin = await this.update(id, credentials);
    return admin;
  }

  deleteAdmin = async (id: number) => {
    const admin = await this.delete(id);
    return admin;
  }

  deleteManyAdmins = async (ids: number[]) => {
    const admins = await this.deleteMany(ids);
    return admins;
  }
}

export default AdminsModel;