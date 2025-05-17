/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";

class TypesModel {
  types: any;
  constructor() {
    this.types = prisma.types;
  }

  createType = async (credentials: any) => {
    try {
      const credentialsType = { 
        ...credentials,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const type = await this.types.create({ data: credentialsType });
      if (!type) {
        throw new Error('Type not created');
      }
      return type;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getTypes = async (params: { skip: number, take: number }) => {
    try {
      const { skip, take } = params;
      const typesList = await this.types.findMany({
        skip,
        take,
      });
      if (!typesList) {
        throw new Error('Types not found');
      }
      return typesList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getType = async (id: number) => {
    try {
      const type = await this.types.findUnique({ where: { id } });
      if (!type) {
        throw new Error('Type not found');
      }
      return type;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  checkEditableAttribute = (att: string) => {
    if(!['name', 'price', 'description', 'image', 'articleTypeId', 'status'].includes(att)) {
      throw new Error('Invalid patch attribute');
    }
  }

  patchType = async (id: number, patch: {attr: string, val: any}) => {
    try {
      this.checkEditableAttribute(patch.attr);
      const type = await this.types.update({ where: { id }, data: { [patch.attr]: patch.val } });
      if (!type) {
        throw new Error('Type not found');
      }
      return type;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  updateType = async (id: number, credentials: any) => {
    try {
      const type = await this.types.update({ where: { id }, data: credentials });
      if (!type) {
        throw new Error('Type not found');
      }
      return type;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteType = async (id: number) => {
    try {
      const type = await this.types.delete({ where: { id } });
      return type;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default TypesModel;
