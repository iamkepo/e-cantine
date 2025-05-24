/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import methodsService from "@/services/methodsService";
import Repository from "@/repositories/repository";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IMethod } from "@/core/interfaces";

export default class MethodsRepository extends Repository<IMethod> {
  constructor(setMethods?: ({data, meta}: {data: IMethod[], meta: Meta}) => void) {
    super(setMethods as unknown as ({data, meta}: {data: IMethod[], meta: Meta}) => void);
  }

  async fetchMethods(params: ParamsQuery) {
    return this.fetchAll(() => methodsService.fetchMethods(params) as Promise<{data: IMethod[], meta: Meta}>);
  }

  async fetchMethod(id: number) {
    return this.fetchOne(methodsService.fetchMethod as (id: number) => Promise<IMethod>, id);
  }

  async createMethod(payload: IMethod) {
    return this.create(methodsService.createMethod as (payload: IMethod) => Promise<IMethod>, payload);
  }

  async patchMethod(id: number, payload: {attr: string, val: any}) {
    return this.patch(methodsService.patchMethod as (id: number, payload: {attr: string, val: any}) => Promise<IMethod>, id, payload);
  }

  async updateMethod(id: number, payload: IMethod) {
    return this.update(methodsService.updateMethod as (id: number, payload: IMethod) => Promise<IMethod>, id, payload);
  }

  async deleteMethod(id: number) {
    return this.delete(methodsService.deleteMethod as (id: number) => Promise<IMethod>, id);
  }

  async deleteMethods(ids: number[]) {
    return this.deleteList(methodsService.deleteMethods as (ids: number[]) => Promise<any>, ids);
  }

  formCreateMethod() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
    ]
  }

  formUpdateMethod(method: IMethod) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: method.name },
    ]
  }

  formFilterMethod() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", label: "Status", required: true, colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })), value: "" },
    ]
  }

  tableHeadMethod = [
    {label: 'Nom', key: 'name'},
  ]

  filterMethod = { take: 10, search: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteMethod = {
    title: "Supprimer la méthode", 
    description: "Voulez-vous vraiment supprimer la méthode ?",
  }

  confirmDeleteMethods = {
    title: "Supprimer les méthodes", 
    description: "Voulez-vous vraiment supprimer les méthodes ?",
  }

  methodSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom est requis'),
  })

  methodFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
