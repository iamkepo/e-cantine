/* eslint-disable @typescript-eslint/no-explicit-any */
import { IArticle, ICategory, IType } from "@/core/interfaces";
import articlesService from "@/services/articlesService";
import CategoryRepository from "./categoryRepository";
import TypeRepository from "./typeRepository";
import * as yup from 'yup';
import Repository from "@/repositories/repository";

class ArticleRepository extends Repository<IArticle> {
  categories: ICategory[] = [];
  types: IType[] = [];
  
  constructor(setArticles?: (articles: IArticle[]) => void) {
    super(setArticles);
    this.init();
  }

  async init() {
    this.categories = (await new CategoryRepository().fetchCategories()) as ICategory[];
    this.types = (await new TypeRepository().fetchTypes()) as IType[];
  }

  async fetchArticles() {
    return this.fetchAll(articlesService.fetchArticles as () => Promise<IArticle[]>);
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

  formCreateArticle() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "price", type: "number", label: "Prix", required: true, colSize: "col-12" },
      { id: "image", type: "text", label: "Image", required: true, colSize: "col-12" },
      { id: "description", type: "textarea", label: "Description", required: true, colSize: "col-12" },
      { id: "categoryId", type: "select", label: "Categorie", required: true, colSize: "col-12", options: this.categories.map((category: ICategory) => ({ label: category.name, value: category.id })) },
      { id: "typeId", type: "select", label: "Type", required: true, colSize: "col-12", options: this.types.map((type: IType) => ({ label: type.name, value: type.id })) },
    ]
  }

  formUpdateArticle(article: IArticle) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: article.name },
      { id: "price", type: "number", label: "Prix", required: true, colSize: "col-12", value: article.price },
      { id: "image", type: "text", label: "Image", required: true, colSize: "col-12", value: article.image },
      { id: "description", type: "textarea", label: "Description", required: true, colSize: "col-12", value: article.description },
      { id: "categoryId", type: "select", label: "Categorie", required: true, colSize: "col-12", options: this.categories.map((category: ICategory) => ({ label: category.name, value: category.id })), value: article.categoryId },
      { id: "typeId", type: "select", label: "Type", required: true, colSize: "col-12", options: this.types.map((type: IType) => ({ label: type.name, value: type.id })), value: article.typeId },
    ]
  }

  confirmDeleteArticle = {
    title: "Supprimer l'article", 
    description: "Voulez-vous vraiment supprimer l'article ?",
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
}

export default ArticleRepository;