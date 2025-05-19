/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";

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

  getAdmins = async (params: { take: number, search: string, userId: number, status: string, page: number }) => {
    const { search, userId } = params;
    const where: any = {
      OR: [
        { email: { contains: search, mode: 'insensitive' } },
      ]
    };
    if (userId > 0) {
      where.userId = userId;
    }
    const adminsList = await this.getAll(params, where);
    return adminsList;
  }

  getAdmin = async (id: number) => {
    const admin = await this.getOne('id', id);
    return admin;
  }

  checkAttributeAdmin = (att: string) => {
    return this.checkAttribute(['userId', 'status'], att);
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