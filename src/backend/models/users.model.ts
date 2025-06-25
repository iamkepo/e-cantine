/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import bcrypt from 'bcrypt';
import Base from "@/configs/base";
import { ParamsQuery } from "@/core/types";

class UsersModel extends Base {
  constructor() {
    super(prisma.users);
  }

  cryptPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  createUser = async (credentials: any) => {
    const hashedPassword = await this.cryptPassword(credentials.password);
    credentials.password = hashedPassword;
    delete credentials.confirmPassword;
    const user = await this.create(credentials);
    delete credentials.password;
    return user;
  }

  getUsers = async (params: ParamsQuery) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.status) {
      where.status = params.status;
    }
    const usersList = await this.getAll(params, where);
    return usersList;
  }

  getUserByEmail = async (email: string) => {
    const user = await this.getOne('email', email);
    return user;
  }

  getUser = async (id: number) => {
    const user = await this.getOne('id', id);
    return user;
  }
  getUserInfo = async (id: number, scope: string) => {
    const where = { id };
    const include: any = {};
    if (scope === 'client') {
      include.clients = true; 
    }
    if (scope === 'admin') {
      include.admins = true;
    }
    if (scope === 'deliverer') {
      include.deliverers = true;
    }
    if (scope === 'restaurant') {
      include.restaurants = true;
    }
    const user = await this.findInfo(where, include);
    return user;
  }

  checkAttributeUser = (att: string) => {
    return this.checkAttribute(['name', 'password', 'status'], att);
  }

  patchUser = async (id: number, patch: {attr: string, val: any}) => {
    const user = await this.patch(id, patch);
    return user;
  }

  updateUser = async (id: number, credentials: any) => {
    const user = await this.update(id, credentials);
    return user;
  }

  deleteUser = async (id: number) => {
    const user = await this.delete(id);
    return user;
  }

  deleteManyUsers = async (ids: number[]) => {
    const users = await this.deleteMany(ids);
    return users;
  }

  checkPassword = async (password: string, user: any) => {  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  }
}

export default UsersModel;