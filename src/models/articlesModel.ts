/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";

class ArticlesModel {
  articles: any;
  types: any;
  constructor() {
    this.articles = prisma.articles;
    this.types = prisma.types;
  }

  createArticle = async (credentials: any) => {
    try {
      const credentialsArticle = { 
        ...credentials,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const article = await this.articles.create({ data: credentialsArticle });
      return article;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getArticles = async (params: { skip: number, take: number, typeId: number, categoryId: number, search: string }) => {
    try {
      const { skip, take, typeId, categoryId, search } = params;
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
  
      const articlesList = await this.articles.findMany({
        where,
        skip,
        take,
      });
      return articlesList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getArticle = async (id: number) => {
    try {
      const article = await this.articles.findUnique({ where: { id } });
      return article;
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

  patchArticle = async (id: number, patch: {attr: string, val: any}) => {
    try {
      this.checkEditableAttribute(patch.attr);
      const article = await this.articles.update({ where: { id }, data: { [patch.attr]: patch.val } });
      return article;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  updateArticle = async (id: number, credentials: any) => {
    try {
      const article = await this.articles.update({ where: { id }, data: credentials });
      return article;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteArticle = async (id: number) => {
    try {
      const article = await this.articles.delete({ where: { id } });
      return article;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ArticlesModel;
