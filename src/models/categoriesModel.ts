/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";

class CategoriesModel extends Model {
  constructor() {
    super(prisma.categories);
  }

  createCategory = async (credentials: any) => {
    const category = await this.create(credentials);
    return category;
  }

  getCategories = async (params: { take: number, search: string, status: string, page: number }) => {
    const categoriesList = await this.getAll(params);
    return categoriesList;
  }

  getCategory = async (id: number) => {
    const category = await this.getOne('id', id);
    return category;
  }

  checkAttributeCategory = (att: string) => {
    return ['name', 'status'].includes(att);
  }

  patchCategory = async (id: number, patch: {attr: string, val: any}) => {
    const category = await this.patch(id, patch);
    return category;
  }

  updateCategory = async (id: number, credentials: any) => {
    const category = await this.update(id, credentials);
    return category;
  }

  deleteCategory = async (id: number) => {
    const category = await this.delete(id);
    return category;
  }

  deleteManyCategories = async (ids: number[]) => {
    const categories = await this.deleteMany(ids);
    return categories;
  }
}

export default CategoriesModel;