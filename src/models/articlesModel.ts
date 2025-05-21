/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";

class ArticlesModel extends Model {
  constructor() {
    super(prisma.articles);
  }

  createArticle = async (credentials: any) => {
    const article = await this.create(credentials);
    return article;
  }

  getArticles = async (params: { take: number, typeId: number, categoryId: number, search: string, status: string, page: number, orderBy: string, order: string }) => {
    const { typeId, categoryId, search } = params;
    const where: any = {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    };

    if (typeId > 0) {
      where.typeId = typeId;
    }

    if (categoryId > 0) {
      where.categoryId = categoryId;
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