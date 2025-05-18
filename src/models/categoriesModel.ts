/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";

class CategoriesModel {
  categories: any;
  constructor() {
    this.categories = prisma.categories;
  }

  createCategory = async (credentials: any) => {
    try {
      const credentialsCategory = { 
        ...credentials,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const category = await this.categories.create({ data: credentialsCategory });
      return category;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getCategories = async (params: { skip: number, take: number }) => {
    try {
      const { skip, take } = params;

      const categoriesList = await this.categories.findMany({
        skip,
        take,
      });
      return categoriesList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getCategory = async (id: number) => {
    try {
      const category = await this.categories.findUnique({ where: { id } });
      return category;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  checkAttributeCategory = (att: string) => {
    return ['name', 'status'].includes(att);
  }

  patchCategory = async (id: number, patch: {attr: string, val: any}) => {
    try {
      const category = await this.categories.update({ where: { id }, data: { [patch.attr]: patch.val } });
      return category;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  updateCategory = async (id: number, credentials: any) => {
    try {
      const category = await this.categories.update({ where: { id }, data: credentials });
      return category;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteCategory = async (id: number) => {
    try {
      const category = await this.categories.delete({ where: { id } });
      return category;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default CategoriesModel;
