/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import categoriesService from "@/services/categoriesService";
import * as yup from 'yup';
import Repository from "@/repositories/repository";
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { ICategory } from "@/core/interfaces";

class CategoryRepository extends Repository<ICategory> {

  constructor(setCategories?: ({data, meta}: {data: ICategory[], meta: Meta}) => void) {
    super(setCategories as unknown as ({data, meta}: {data: ICategory[], meta: Meta}) => void);
  }

  async fetchCategories(params: ParamsQuery) {
    return this.fetchAll(() => categoriesService.fetchCategories(params) as Promise<{data: ICategory[], meta: Meta}>);
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

  async deleteCategories(ids: number[]) {
    return this.deleteList(categoriesService.deleteCategories as (ids: number[]) => Promise<ICategory>, ids);
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

  formFilterCategory() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadCategory = [
    {label: 'Nom', key: 'name'},
    {label: 'Status', key: 'status'}
  ]

  filterCategory = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteCategory = {
    title: "Supprimer la categorie", 
    description: "Voulez-vous vraiment supprimer la categorie ?",
  }

  confirmDeleteCategories = {
    title: "Supprimer les categories", 
    description: "Voulez-vous vraiment supprimer les categories ?",
  }

  confirmChangeStatusCategory = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de la categorie ?",
  }

  categorySchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom de la categorie est requis'),
  })

  categoryFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}

export default CategoryRepository;