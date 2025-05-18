/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";

class AdminsModel {
  admins: any;
  constructor() {
    this.admins = prisma.admins;
  }

  createAdmin = async (newUser: any) => {
    try {
      await this.checkAdmin(newUser.email);
      const adminCredentials = { 
        userId: newUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const admin = await this.admins.create({ data: adminCredentials });
      return admin;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  checkAdmin = async (email: string) => {
    try {
      const admin = await this.admins.findUnique({ where: { email } });
      if (admin) {
        throw new Error('Admin already exists');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  getAdmins = async () => {
    try {
      const adminsList = await this.admins.findMany();
      return adminsList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getAdmin = async (id: number) => {
    try {
      const admin = await this.admins.findUnique({ where: { id } });
      if (!admin) {
        throw new Error('Admin not found');
      }
      return admin;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  checkAttributeAdmin = (att: string) => {
    return ['userId', 'status'].includes(att);
  }

  patchAdmin = async (id: number, patch: {attr: string, val: any}) => {
    try {
      const admin = await this.admins.update({ where: { id }, data: { [patch.attr]: patch.val } });
      return admin;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  updateAdmin = async (id: number, credentials: any) => {
    try {
      const admin = await this.admins.update({ where: { id }, data: credentials });
      return admin;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteAdmin = async (id: number) => {
    try {
      const admin = await this.admins.delete({ where: { id } });
      return admin;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default AdminsModel;
