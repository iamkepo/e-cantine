/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import connectionsService from "@/services/connectionsService";
import * as yup from 'yup';
import Repository from "@/repositories/repository";
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IArticle, IConnection, ITag } from "@/core/interfaces";

class ConnectionRepository extends Repository<IConnection> {

  constructor(setConnections?: ({data, meta}: {data: IConnection[], meta: Meta}) => void) {     
    super(setConnections as unknown as ({data, meta}: {data: IConnection[], meta: Meta}) => void);
  }

  async fetchConnections(params: ParamsQuery) {
    return this.fetchAll(() => connectionsService.fetchConnections(params) as Promise<{data: IConnection[], meta: Meta}>);
  }

  async fetchConnection(id: number) {
    return this.fetchOne(connectionsService.fetchConnection as (id: number) => Promise<IConnection>, id);
  }

  async createConnection(payload: IConnection) {
    return this.create(connectionsService.createConnection as (payload: IConnection) => Promise<IConnection>, payload);
  }

  async changeStatusConnection(id: number, status: string) {
    return this.patch(connectionsService.patchConnection as (id: number, payload: {attr: string, val: any}) => Promise<IConnection>, id, { attr: 'status', val: status });
  }

  async updateConnection(id: number, payload: IConnection) {
    return this.update(connectionsService.updateConnection as (id: number, payload: IConnection) => Promise<IConnection>, id, payload);
  }

  async deleteConnection(id: number) {
    return this.delete(connectionsService.deleteConnection as (id: number) => Promise<IConnection>, id);
  }

  async deleteConnections(ids: number[]) {
    return this.deleteList(connectionsService.deleteConnections as (ids: number[]) => Promise<IConnection>, ids);
  }

  formCreateConnection(articles: IArticle[], tags: ITag[]) {
    return [
      { id: "articleId", type: "searchselect", label: "Article", required: true, colSize: "col-12", options: articles.map((article: IArticle) => ({ label: article.name, value: article.id })) },
      { id: "tagId", type: "searchselect", label: "Tag", required: true, colSize: "col-12", options: tags.map((tag: ITag) => ({ label: tag.name, value: tag.id })) },
    ]
  }

  formUpdateConnection(connection: IConnection, articles: IArticle[], tags: ITag[]) {
    return [
      { id: "articleId", type: "searchselect", label: "Article", required: true, colSize: "col-12", options: articles.map((article: IArticle) => ({ label: article.name, value: article.id })), value: connection.articleId },
      { id: "tagId", type: "searchselect", label: "Tag", required: true, colSize: "col-12", options: tags.map((tag: ITag) => ({ label: tag.name, value: tag.id })), value: connection.tagId },
    ]
  }

  formFilterConnection(articles: IArticle[], tags: ITag[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "tagId", type: "select", placeholder: "Tag", colSize: "col-12 col-md-2", options: tags.map((tag: ITag) => ({ label: tag.name, value: tag.id })) },
      { id: "articleId", type: "select", placeholder: "Article", colSize: "col-12 col-md-2", options: articles.map((article: IArticle) => ({ label: article.name, value: article.id })) },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }
  tableHeadConnection = [
    {label: 'Type', key: 'typeId'},
    {label: 'Article', key: 'articleId'},
    {label: 'Status', key: 'status'}
  ]

  filterConnection = { take: 10, search: "", status: "", articleId: 0, tagId: 0, page: 1, orderBy: "createdAt", order: "desc" }


  confirmDeleteConnection = {
    title: "Supprimer la connection", 
    description: "Voulez-vous vraiment supprimer la connection ?",
  }

  confirmDeleteConnections = {
    title: "Supprimer les connections", 
    description: "Voulez-vous vraiment supprimer les connections ?",
  }

  confirmChangeStatusConnection = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de la connection ?",
  }

  connectionSchema = yup.object({
    id: yup.number().optional(),
    articleId: yup.number().required('Article est requis'),
    tagId: yup.number().required('Tag est requis'),
  })

  connectionFilterSchema = yup.object({
    search: yup.string().optional(),
    tagId: yup.string().optional(),
    articleId: yup.string().optional(),
    status: yup.string().optional(),
  })
}

export default ConnectionRepository;