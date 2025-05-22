/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";
import { ParamsQuery } from "@/core/types";

class ArticlesModel extends Model {
  constructor() {
    super(prisma.articles);
  }

  createArticle = async (credentials: any) => {
    const article = await this.create(credentials);
    return article;
  }

  getArticles = async (params: ParamsQuery & {typeId?: number, categoryId?: number, price?: number}) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } }
      ];
    }
    if (params.price) {
      where.price = { gte: params.price };
    }
    if (params.typeId) {
      where.typeId = params.typeId;
    }
    if (params.categoryId) {
      where.categoryId = params.categoryId;
    }
    if (params.status) {
      where.status = params.status;
    }
    const articlesList = await this.getAll(params, where);
    return articlesList;
  }

  getArticle = async (id: number) => {
    const article = await this.getOne('id', id);
    return article;
  }

  checkAttributeArticle = (att: string) => {
    return this.checkAttribute(['name', 'price', 'description', 'image', 'typeId', 'categoryId', 'status'], att);
  }

  patchArticle = async (id: number, patch: {attr: string, val: any}) => {
    const article = await this.patch(id, patch);
    return article;
  }

  updateArticle = async (id: number, credentials: any) => {
    const article = await this.update(id, credentials);
    return article;
  }

  deleteArticle = async (id: number) => {
    const article = await this.delete(id);
    return article;
  }

  deleteManyArticles = async (ids: number[]) => {
    const articles = await this.deleteMany(ids);
    return articles;
  }
}

export default ArticlesModel;