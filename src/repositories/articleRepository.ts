/* eslint-disable @typescript-eslint/no-explicit-any */
import { IArticle, ICategory, IType } from "@/core/interfaces";
import articlesService from "@/services/articlesService";
import * as yup from 'yup';
import Repository from "@/repositories/repository";
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { Meta, ParamsQuery } from "@/core/types";

class ArticleRepository extends Repository<IArticle> {

  constructor(setArticles?: ({data, meta}: {data: IArticle[], meta: Meta}) => void) {
    super(setArticles);
  }

  async fetchArticles(params: ParamsQuery & {categoryId?: number, typeId?: number}) {
    return this.fetchAll(() => articlesService.fetchArticles(params) as Promise<{data: IArticle[], meta: Meta}>);
  }

  async fetchArticle(id: number) {
    return this.fetchOne(articlesService.fetchArticle as (id: number) => Promise<IArticle>, id);
  }

  async createArticle(payload: IArticle) {
    return this.create(articlesService.createArticle as (payload: IArticle) => Promise<IArticle>, payload);
  }

  async changeStatusArticle(id: number, status: string) {
    return this.patch(articlesService.patchArticle as (id: number, payload: {attr: string, val: any}) => Promise<IArticle>, id, { attr: 'status', val: status });
  }

  async updateArticle(id: number, payload: IArticle) {
    return this.update(articlesService.updateArticle as (id: number, payload: IArticle) => Promise<IArticle>, id, payload);
  }

  async deleteArticle(id: number) {
    return this.delete(articlesService.deleteArticle as (id: number) => Promise<IArticle>, id);
  }

  async deleteArticles(ids: number[]) {
    return this.deleteList(articlesService.deleteArticles as (ids: number[]) => Promise<IArticle>, ids);
  }

  formCreateArticle(categories: ICategory[], types: IType[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "price", type: "number", label: "Prix", required: true, colSize: "col-12" },
      { id: "image", type: "text", label: "Image", required: true, colSize: "col-12" },
      { id: "description", type: "textarea", label: "Description", required: true, colSize: "col-12" },
      { id: "categoryId", type: "select", label: "Categorie", required: true, colSize: "col-12", options: categories.map((category: ICategory) => ({ label: category.name, value: category.id })) },
      { id: "typeId", type: "select", label: "Type", required: true, colSize: "col-12", options: types.map((type: IType) => ({ label: type.name, value: type.id })) },
    ]
  }

  formUpdateArticle(article: IArticle, categories: ICategory[], types: IType[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: article.name },
      { id: "price", type: "number", label: "Prix", required: true, colSize: "col-12", value: article.price },
      { id: "image", type: "text", label: "Image", required: true, colSize: "col-12", value: article.image },
      { id: "description", type: "textarea", label: "Description", required: true, colSize: "col-12", value: article.description },
      { id: "categoryId", type: "select", label: "Categorie", required: true, colSize: "col-12", options: categories.map((category: ICategory) => ({ label: category.name, value: category.id })), value: article.categoryId },
      { id: "typeId", type: "select", label: "Type", required: true, colSize: "col-12", options: types.map((type: IType) => ({ label: type.name, value: type.id })), value: article.typeId },
    ]
  }

  formFilterArticle(types: IType[], categories: ICategory[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "typeId", type: "select", placeholder: "Type", colSize: "col-12 col-md-2", options: types.map((type: IType) => ({ label: type.name, value: type.id })) },
      { id: "categoryId", type: "select", placeholder: "Categorie", colSize: "col-12 col-md-2", options: categories.map((category: ICategory) => ({ label: category.name, value: category.id })) },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadArticle = [
    {label: 'Image', key: 'image'},
    {label: 'Nom', key: 'name'},
    {label: 'Type', key: 'typeId'},
    {label: 'Categorie', key: 'categoryId'},
    {label: 'Status', key: 'status'}
  ]

  filterArticle = { take: 10, search: "", status: "", categoryId: 0, typeId: 0, page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteArticle = {
    title: "Supprimer l'article", 
    description: "Voulez-vous vraiment supprimer l'article ?",
  }

  confirmDeleteArticles = {
    title: "Supprimer les articles", 
    description: "Voulez-vous vraiment supprimer les articles ?",
  }

  confirmChangeStatusArticle = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de l'article ?",
  }

  articleSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom du client est requis'),
    price: yup.number().required('Prix du client est requis'),
    image: yup.string().required('Image du client est requis'),
    description: yup.string().required('Description du client est requis'),
    categoryId: yup.number().optional(),
    typeId: yup.number().optional(),
  })

  articleFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
    categoryId: yup.string().optional(),
    typeId: yup.string().optional(),
  })
}

export default ArticleRepository;