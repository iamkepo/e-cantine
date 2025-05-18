/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory } from "@/core/interfaces";
import categoriesService from "@/services/categoriesService";
import * as yup from 'yup';
import Repository from "@/repositories/repository";

class CategoryRepository extends Repository<ICategory> {

  constructor(setCategories?: (categories: ICategory[]) => void) {
    super(setCategories);
  }

  async fetchCategories() {
    return this.fetchAll(categoriesService.fetchCategories as () => Promise<ICategory[]>);
  }

  async fetchCategory(id: number) {
    return this.fetchOne(categoriesService.fetchCategory as (id: number) => Promise<ICategory>, id);
  }

  async createCategory(payload: ICategory) {
    return this.create(categoriesService.createCategory as (payload: ICategory) => Promise<ICategory>, payload);
  }

  async changeStatusCategory(id: number, status: string) {
    return this.patch(categoriesService.patchCategory as (id: number, payload: {attr: string, val: any}) => Promise<ICategory>, id, { attr: 'status', val: status });
  }

  async updateCategory(id: number, payload: ICategory) {
    return this.update(categoriesService.updateCategory as (id: number, payload: ICategory) => Promise<ICategory>, id, payload);
  }

  async deleteCategory(id: number) {
    return this.delete(categoriesService.deleteCategory as (id: number) => Promise<ICategory>, id);
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

  confirmDeleteCategory = {
    title: "Supprimer la categorie", 
    description: "Voulez-vous vraiment supprimer la categorie ?",
  }

  confirmChangeStatusCategory = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de la categorie ?",
  }

  categorySchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom de la categorie est requis'),
  })
}

export default CategoryRepository;