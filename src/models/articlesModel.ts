/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";

class ArticlesModel {
  articles: any;
  articleTypes: any;
  constructor() {
    this.articles = prisma.articles;
    this.articleTypes = prisma.articleTypes;
  }

  createArticle = async (credentials: any) => {
    try {
      const credentialsArticle = { 
        ...credentials,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const article = await this.articles.create({ data: credentialsArticle });
      if (!article) {
        throw new Error('Article not created');
      }
      return article;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getArticles = async (params: { typeId: string, skip: number, take: number }) => {
    try {
      const { typeId, skip, take } = params;
      const typesList = await this.articleTypes.findMany({
        where: {
          typeId,
        },
      });
      const articlesList = await this.articles.findMany({
        where: {
          id: {
            in: typesList.map((type: any) => type.articleId),
          },
        },
        skip,
        take,
      });
      if (!articlesList) {
        throw new Error('Articles not found');
      }
      return articlesList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getArticle = async (id: string) => {
    try {
      const article = await this.articles.findUnique({ where: { id } });
      if (!article) {
        throw new Error('Article not found');
      }
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

  patchArticle = async (id: string, patch: {attr: string, val: any}) => {
    try {
      this.checkEditableAttribute(patch.attr);
      const article = await this.articles.update({ where: { id }, data: { [patch.attr]: patch.val } });
      if (!article) {
        throw new Error('Article not found');
      }
      return article;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  updateArticle = async (id: string, credentials: any) => {
    try {
      const article = await this.articles.update({ where: { id }, data: credentials });
      if (!article) {
        throw new Error('Article not found');
      }
      return article;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteArticle = async (id: string) => {
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
