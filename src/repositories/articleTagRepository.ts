/* eslint-disable @typescript-eslint/no-explicit-any */
import { IArticle, IArticleTag, ITag, Meta, ParamsQuery } from "@/core/interfaces";
import articleTagsService from "@/services/articleTagsService";
import ArticleRepository from "./articleRepository";
import TagRepository from "./tagRepository";
import * as yup from 'yup';
import Repository from "@/repositories/repository";
import { statusOptionsActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { meta } from "@/core/constants";

class ArticleTagRepository extends Repository<IArticleTag> {
  articles: { data: IArticle[], meta: Meta } = { data: [],meta };
  tags: { data: ITag[], meta: Meta } = {data: [], meta };

  constructor(setArticleTags?: ({data, meta}: {data: IArticleTag[], meta: Meta}) => void) {     
    super(setArticleTags as unknown as ({data, meta}: {data: IArticleTag[], meta: Meta}) => void);
    this.init();
  }

  async init() {
    await new ArticleRepository().fetchArticles({})
    .then((res) => this.articles = res as {data: IArticle[], meta: Meta});
    await new TagRepository().fetchTags({})
    .then((res) => this.tags = res as {data: ITag[], meta: Meta});
  }

  async fetchArticleTags(params: ParamsQuery) {
    return this.fetchAll(() => articleTagsService.fetchArticleTags(params) as Promise<{data: IArticleTag[], meta: Meta}>);
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

  async deleteArticleTags(ids: number[]) {
    return this.deleteList(articleTagsService.deleteArticleTags as (ids: number[]) => Promise<IArticleTag>, ids);
  }

  formCreateArticleTag() {
    return [
      { id: "articleId", type: "searchselect", label: "Article", required: true, colSize: "col-12", options: this.articles.data.map((article: IArticle) => ({ label: article.name, value: article.id })) },
      { id: "tagId", type: "searchselect", label: "Tag", required: true, colSize: "col-12", options: this.tags.data.map((tag: ITag) => ({ label: tag.name, value: tag.id })) },
    ]
  }

  formUpdateArticleTag(articleTag: IArticleTag) {
    return [
      { id: "articleId", type: "searchselect", label: "Article", required: true, colSize: "col-12", options: this.articles.data.map((article: IArticle) => ({ label: article.name, value: article.id })), value: articleTag.articleId },
      { id: "tagId", type: "searchselect", label: "Tag", required: true, colSize: "col-12", options: this.tags.data.map((tag: ITag) => ({ label: tag.name, value: tag.id })), value: articleTag.tagId },
    ]
  }

  formFilterArticleTag() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "tagId", type: "select", placeholder: "Tag", colSize: "col-12 col-md-2", options: this.tags.data.map((tag: ITag) => ({ label: tag.name, value: tag.id })) },
      { id: "articleId", type: "select", placeholder: "Article", colSize: "col-12 col-md-2", options: this.articles.data.map((article: IArticle) => ({ label: article.name, value: article.id })) },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2", options: Object.values(statusOptionsActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }
  tableHeadArticleTag = [
    {label: 'Type', key: 'typeId'},
    {label: 'Article', key: 'articleId'},
    {label: 'Status', key: 'status'}
  ]

  filterArticleTag = { take: 10, search: "", status: "", articleId: 0, typeId: 0, page: 1, }


  confirmDeleteArticleTag = {
    title: "Supprimer le tag", 
    description: "Voulez-vous vraiment supprimer le tag ?",
  }

  confirmDeleteArticleTags = {
    title: "Supprimer les tags", 
    description: "Voulez-vous vraiment supprimer les tags ?",
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

  articleTagFilterSchema = yup.object({
    search: yup.string().optional(),
    tagId: yup.string().optional(),
    articleId: yup.string().optional(),
    status: yup.string().optional(),
  })
}

export default ArticleTagRepository;