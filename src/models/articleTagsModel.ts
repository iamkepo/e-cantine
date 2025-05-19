/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";

class ArticleTagsModel extends Model {
  constructor() {
    super(prisma.articleTags);
  }

  createArticleTag = async (credentials: any) => {
    const articleTag = await this.create(credentials);
    return articleTag;
  }

  getArticleTags = async (params: { take: number, articleId: number, tagId: number, status: string, page: number }) => {
    const { articleId, tagId } = params;
    const where: any = {};
      if (articleId > 0) {
        where.articleId = articleId;
      }
      if (tagId > 0) {
        where.tagId = tagId;
      }
      const articleTagsList = await this.getAll({ ...params, search: '' }, where);
      return articleTagsList;
  }

  getArticleTag = async (id: number) => {
    const articleTag = await this.getOne('id', id);
    return articleTag;
  }

  checkAttributeArticleTag = (att: string) => {
    return this.checkAttribute(['articleId', 'tagId', 'status'], att);
  }

  patchArticleTag = async (id: number, patch: {attr: string, val: any}) => {
    const articleTag = await this.patch(id, patch);
    return articleTag;
  }

  updateArticleTag = async (id: number, credentials: any) => {
    const articleTag = await this.update(id, credentials);
    return articleTag;
  }

  deleteArticleTag = async (id: number) => {
    const articleTag = await this.delete(id);
    return articleTag;
  }

  deleteManyArticleTags = async (ids: number[]) => {
    const articleTags = await this.deleteMany(ids);
    return articleTags;
  }
}

export default ArticleTagsModel;