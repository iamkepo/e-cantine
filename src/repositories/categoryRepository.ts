import { ICategory } from "@/core/interfaces";
import categoriesService from "@/services/categoriesService";
import * as yup from 'yup';

class CategoryRepository {

  constructor() {
  }

  async fetchCategories() {
    try {
      const data = await categoriesService.fetchCategories();
      return data;
    } catch (error) {
      console.error("Erreur fetchCategories :", error);
      throw error;
    }
  }

  async fetchCategory(id: number) {
    try {
      const data = await categoriesService.fetchCategory(id);
      return data;
    } catch (error) {
      console.error("Erreur fetchCategory :", error);
      throw error;
    }
  }

  async createCategory(payload: ICategory) {
    try {
      await categoriesService.createCategory(payload);
      const categories = await this.fetchCategories();
      return categories;
    } catch (error) {
      console.error("Erreur createCategory :", error);
      throw error;
    }
  }

  async changeStatusCategory(id: number, status: string) {
    try {
      await categoriesService.patchCategory(id, {status});
      const categories = await this.fetchCategories();
      return categories;
    } catch (error) {
      console.error("Erreur changeStatusCategory :", error);
      throw error;
    }
  }

  async updateCategory(id: number, payload: ICategory) {
    try {
      await categoriesService.updateCategory(id, payload);
      const categories = await this.fetchCategories();
      return categories;
    } catch (error) {
      console.error("Erreur updateCategory :", error);
      throw error;
    }
  }

  async deleteCategory(id: number) {
    try {
      await categoriesService.deleteCategory(id);
      const categories = await this.fetchCategories();
      return categories;
    } catch (error) {
      console.error("Erreur deleteCategory :", error);
      throw error;
    }
  }

  formCreateCategory() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
    ]
  }

  formUpdateCategory(category: ICategory) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: category.name },
    ]
  }

  formDeleteCategory() {
    return [
      { id: "section", type: "section", label: "Voulez-vous vraiment supprimer la categorie ?", colSize: "col-12 text-center" },
    ]
  }

  formChangeStatusCategory() {
    return [
      { id: "section", type: "section", label: "Voulez-vous vraiment changer le statut de la categorie ?", colSize: "col-12 text-center" },
    ]
  }

  categorySchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom de la categorie est requis'),
  })
}

export default CategoryRepository;