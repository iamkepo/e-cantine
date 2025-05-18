/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";

class ArticleTagsModel {
  tagsArticle: any;
  constructor() {
    this.tagsArticle = prisma.articleTags;
  }

  createArticleTag = async (credentials: any) => {
    try {
      const credentialsArticleTag = { 
        ...credentials,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const articleTag = await this.tagsArticle.create({ data: credentialsArticleTag });
      return articleTag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getArticleTags = async (params: { skip: number, take: number }) => {
    try {
      const { skip, take } = params;
      const articleTagsList = await this.tagsArticle.findMany({
        skip,
        take,
      });
      return articleTagsList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getArticleTag = async (id: number) => {
    try {
      const articleTag = await this.tagsArticle.findUnique({ where: { id } });
      return articleTag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  checkAttributeArticleTag = (att: string) => {
    return ['articleId', 'tagId', 'status'].includes(att);
  }

  patchArticleTag = async (id: number, patch: {attr: string, val: any}) => {
    try {
      const articleTag = await this.tagsArticle.update({ where: { id }, data: { [patch.attr]: patch.val } });
      return articleTag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  updateArticleTag = async (id: number, credentials: any) => {
    try {
      const articleTag = await this.tagsArticle.update({ where: { id }, data: credentials });
      return articleTag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteArticleTag = async (id: number) => {
    try {
      const articleTag = await this.tagsArticle.delete({ where: { id } });
      return articleTag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ArticleTagsModel;
