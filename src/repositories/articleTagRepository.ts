/* eslint-disable @typescript-eslint/no-explicit-any */
import { IArticle, IArticleTag, ITag } from "@/core/interfaces";
import articleTagsService from "@/services/articleTagsService";
import ArticleRepository from "./articleRepository";
import TagRepository from "./tagRepository";
import * as yup from 'yup';
import Repository from "@/repositories/repository";

class ArticleTagRepository extends Repository<IArticleTag> {
  articles: IArticle[] = [];
  tags: ITag[] = [];

  constructor(setArticleTags?: (articleTags: IArticleTag[]) => void) {     
    super(setArticleTags);
    this.init();
  }

  async init() {
    this.articles = (await new ArticleRepository().fetchArticles()) as IArticle[];
    this.tags = (await new TagRepository().fetchTags()) as ITag[];
  }

  async fetchArticleTags() {
    return this.fetchAll(articleTagsService.fetchArticleTags as () => Promise<IArticleTag[]>);
  }

  async fetchArticleTag(id: number) {
    return this.fetchOne(articleTagsService.fetchArticleTag as (id: number) => Promise<IArticleTag>, id);
  }

  async createArticleTag(payload: IArticleTag) {
    return this.create(articleTagsService.createArticleTag as (payload: IArticleTag) => Promise<IArticleTag>, payload);
  }

  async changeStatusArticleTag(id: number, status: string) {
    return this.patch(articleTagsService.patchArticleTag as (id: number, payload: {attr: string, val: any}) => Promise<IArticleTag>, id, { attr: 'status', val: status });
  }

  async updateArticleTag(id: number, payload: IArticleTag) {
    return this.update(articleTagsService.updateArticleTag as (id: number, payload: IArticleTag) => Promise<IArticleTag>, id, payload);
  }

  async deleteArticleTag(id: number) {
    return this.delete(articleTagsService.deleteArticleTag as (id: number) => Promise<IArticleTag>, id);
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

  confirmDeleteArticleTag = {
    title: "Supprimer le tag", 
    description: "Voulez-vous vraiment supprimer le tag ?",
  }

  confirmChangeStatusArticleTag = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status du tag ?",
  }

  articleTagSchema = yup.object({
    id: yup.number().optional(),
    articleId: yup.number().required('Article est requis'),
    tagId: yup.number().required('Tag est requis'),
  })
}

export default ArticleTagRepository;