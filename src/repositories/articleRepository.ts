import { IArticle, ICategory, IType } from "@/core/interfaces";
import articlesService from "@/services/articlesService";
import CategoryRepository from "./categoryRepository";
import TypeRepository from "./typeRepository";
import * as yup from 'yup';

class ArticleRepository {
  categories: ICategory[] = [];
  types: IType[] = [];

  constructor() {
    this.init();
  }

  async init() {
    this.categories = (await new CategoryRepository().fetchCategories()) as ICategory[];
    this.types = (await new TypeRepository().fetchTypes()) as IType[];
  }

  async fetchArticles() {
    try {
      const data = await articlesService.fetchArticles();
      return data;
    } catch (error) {
      console.error("Erreur fetchArticles :", error);
      throw error;
    }
  }

  async fetchArticle(id: number) {
    try {
      const data = await articlesService.fetchArticle(id);
      return data;
    } catch (error) {
      console.error("Erreur fetchArticle :", error);
      throw error;
    }
  }

  async createArticle(payload: IArticle) {
    try {
      await articlesService.createArticle(payload);
      const articles = await this.fetchArticles();
      return articles;
    } catch (error) {
      console.error("Erreur createArticle :", error);
      throw error;
    }
  }

  async changeStatusArticle(id: number, status: string) {
    console.log(status);
    try {
      await articlesService.patchArticle(id, {status});
      const articles = await this.fetchArticles();
      return articles;
    } catch (error) {
      console.error("Erreur changeStatusArticle :", error);
      throw error;
    }
  }

  async updateArticle(id: number, payload: IArticle) {
    try {
      await articlesService.updateArticle(id, payload);
      const articles = await this.fetchArticles();
      return articles;
    } catch (error) {
      console.error("Erreur updateArticle :", error);
      throw error;
    }
  }

  async deleteArticle(id: number) {
    try {
      await articlesService.deleteArticle(id);
      const articles = await this.fetchArticles();
      return articles;
    } catch (error) {
      console.error("Erreur deleteArticle :", error);
      throw error;
    }
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

  formDeleteArticle() {
    return [
      { id: "section", type: "section", label: "Voulez-vous vraiment supprimer l'article ?", colSize: "col-12 text-center" },
    ]
  }

  formChangeStatusArticle() {
    return [
      { id: "section", type: "section", label: "Voulez-vous vraiment changer le statut de l'article ?", colSize: "col-12 text-center" },
    ]
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