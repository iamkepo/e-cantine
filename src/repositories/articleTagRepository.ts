import { IArticle, IArticleTag, ITag } from "@/core/interfaces";
import articleTagsService from "@/services/articleTagsService";
import ArticleRepository from "./articleRepository";
import TagRepository from "./tagRepository";
import * as yup from 'yup';

class ArticleTagRepository {
  articles: IArticle[] = [];
  tags: ITag[] = [];

  constructor() {     
    this.init();
  }

  async init() {
    this.articles = (await new ArticleRepository().fetchArticles()) as IArticle[];
    this.tags = (await new TagRepository().fetchTags()) as ITag[];
  }

  async fetchArticleTags() {
    try {
      const data = await articleTagsService.fetchArticleTags();
      return data;
    } catch (error) {
      console.error("Erreur fetchArticleTags :", error);
      throw error;
    }
  }

  async fetchArticleTag(id: number) {
    try {
      const data = await articleTagsService.fetchArticleTag(id);
      return data;
    } catch (error) {
      console.error("Erreur fetchArticleTag :", error);
      throw error;
    }
  }

  async createArticleTag(payload: IArticleTag) {
    try {
      await articleTagsService.createArticleTag(payload);
      const articleTags = await this.fetchArticleTags();
      return articleTags;
    } catch (error) {
      console.error("Erreur createArticleTag :", error);
      throw error;
    }
  }

  async changeStatusArticleTag(id: number, status: string) {
    try {
      await articleTagsService.patchArticleTag(id, {status});
      const articleTags = await this.fetchArticleTags();
      return articleTags;
    } catch (error) {
      console.error("Erreur changeStatusArticleTag :", error);
      throw error;
    }
  }

  async updateArticleTag(id: number, payload: IArticleTag) {
    try {
      await articleTagsService.updateArticleTag(id, payload);
      const articleTags = await this.fetchArticleTags();
      return articleTags;
    } catch (error) {
      console.error("Erreur updateTag :", error);
      throw error;
    }
  }

  async deleteArticleTag(id: number) {
    try {
      await articleTagsService.deleteArticleTag(id);
      const articleTags = await this.fetchArticleTags();
      return articleTags;
    } catch (error) {
      console.error("Erreur deleteArticleTag :", error);
      throw error;
    }
  }

  formCreateArticleTag() {
    return [
      { id: "articleId", type: "searchselect", label: "Article", required: true, colSize: "col-12", options: this.articles.map((article: IArticle) => ({ label: article.name, value: article.id })) },
      { id: "tagId", type: "searchselect", label: "Tag", required: true, colSize: "col-12", options: this.tags.map((tag: ITag) => ({ label: tag.name, value: tag.id })) },
    ]
  }

  formUpdateArticleTag(articleTag: IArticleTag) {
    return [
      { id: "articleId", type: "searchselect", label: "Article", required: true, colSize: "col-12", options: this.articles.map((article: IArticle) => ({ label: article.name, value: article.id })), value: articleTag.articleId },
      { id: "tagId", type: "searchselect", label: "Tag", required: true, colSize: "col-12", options: this.tags.map((tag: ITag) => ({ label: tag.name, value: tag.id })), value: articleTag.tagId },
    ]
  }

  formDeleteArticleTag() {
    return [
      { id: "section", type: "section", label: "Voulez-vous vraiment supprimer le tag ?", colSize: "col-12 text-center" },
    ]
  }

  formChangeStatusArticleTag() {
    return [
      { id: "section", type: "section", label: "Voulez-vous vraiment changer le statut du tag ?", colSize: "col-12 text-center" },
    ]
  }

  articleTagSchema = yup.object({
    id: yup.number().optional(),
    articleId: yup.number().required('Article est requis'),
    tagId: yup.number().required('Tag est requis'),
  })
}

export default ArticleTagRepository;