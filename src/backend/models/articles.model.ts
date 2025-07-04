/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Base from "@/configs/base";
import { ParamsQuery } from "@/core/types";

class ArticlesModel extends Base {
  constructor() {
    super(prisma.articles);
  }

  createArticle = async (credentials: any) => {
    const article = await this.create(credentials);
    return article;
  }

  getArticlesByTagIds = async (tagIds: number[]) => {
    const where: any = tagIds.length > 0 ? { 
      connections: { 
        some: { 
          tagId: { 
            in: tagIds 
          } 
        } 
      } 
    } : {};
    const articles = await this.groupBy(['id'], where);
    return articles.map((article: {id: number}) => article.id);
  }

  getArticles = async (params: ParamsQuery & {typeId?: number, categoryId?: number, price?: number}, articleIds: number[]) => {
    const where: any = articleIds.length > 0 ? {id: { in: articleIds }} : {};
    const include: any = {connections: {select: {tagId: true}}};
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

    
    const articlesList = await this.getAll(params, where, include);
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