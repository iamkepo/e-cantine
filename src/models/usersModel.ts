/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import bcrypt from 'bcrypt';

class UsersModel {
  users: any;
  constructor() {
    this.users = prisma.users;
  }

  createUser = async (credentials: any) => {
    try {
      const hashedPassword = await bcrypt.hash(credentials.password, 10);
      credentials.password = hashedPassword;
      delete credentials.confirmPassword;
      const newUser = { 
        ...credentials,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const user = await this.users.create({ data: newUser });
      if (!user) {
        throw new Error('User not created');
      }
      delete credentials.password;
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getUsers = async (params: { skip: number, take: number }) => {
    try {
      const usersList = await this.users.findMany({
        skip: params.skip,
        take: params.take,
      });
      if (!usersList) {
        throw new Error('Users not found');
      }
      return usersList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getUser = async (id: number) => {
    try {
      const user = await this.users.findUnique({ where: { id } });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  checkEditableAttribute = (att: string) => {
    if(!['name', 'password'].includes(att)) {
      throw new Error('Invalid patch attribute');
    }
  }

  patchUser = async (id: number, patch: {attr: string, val: any}) => {
    try {
      this.checkEditableAttribute(patch.attr);
      const user = await this.users.update({ where: { id }, data: { [patch.attr]: patch.val } });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  updateUser = async (id: number, credentials: any) => {
    try {
      const user = await this.users.update({ where: { id }, data: credentials });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteUser = async (id: number) => {
    try {
      const user = await this.users.delete({ where: { id } });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  checkPassword = async (password: string, user: any) => {  
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default UsersModel;
