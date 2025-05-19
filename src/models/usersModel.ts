/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import bcrypt from 'bcrypt';
import Model from "./model";

class UsersModel extends Model {
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

  getUsers = async (params: { take: number, search: string, status: string, page: number }) => {
    const usersList = await this.getAll(params);
    return usersList;
  }

  getUser = async (id: number) => {
    const user = await this.getOne('id', id);
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