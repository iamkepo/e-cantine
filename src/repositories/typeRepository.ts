/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import typesService from "@/services/typesService";
import * as yup from 'yup';
import Repository from "@/repositories/repository";
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IType } from "@/core/interfaces";

class TypeRepository extends Repository<IType> {

  constructor(setTypes?: ({data, meta}: {data: IType[], meta: Meta}) => void) {
    super(setTypes as unknown as ({data, meta}: {data: IType[], meta: Meta}) => void);
  }

  async fetchTypes(params: ParamsQuery) {
    return this.fetchAll(() => typesService.fetchTypes(params) as Promise<{data: IType[], meta: Meta}>);
  }

  async fetchType(id: number) {
    return this.fetchOne(typesService.fetchType as (id: number) => Promise<IType>, id);
  }

  async createType(payload: IType) {
    return this.create(typesService.createType as (payload: IType) => Promise<IType>, payload);
  }

  async changeStatusType(id: number, status: string) {
    return this.patch(typesService.patchType as (id: number, payload: {attr: string, val: any}) => Promise<IType>, id, { attr: 'status', val: status });
  }

  async updateType(id: number, payload: IType) {
    return this.update(typesService.updateType as (id: number, payload: IType) => Promise<IType>, id, payload);
  }

  async deleteType(id: number) {
    return this.delete(typesService.deleteType as (id: number) => Promise<IType>, id);
  }

  async deleteTypes(ids: number[]) {
    return this.deleteList(typesService.deleteTypes as (ids: number[]) => Promise<IType>, ids);
  }

  formCreateType() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
    ]
  }

  formUpdateType(type: IType) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: type.name },
    ]
  }

  formFilterType() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadType = [
    {label: 'Nom', key: 'name'},
    {label: 'Status', key: 'status'}
  ]

  filterType = { take: 10, search: "", status: "", page: 1, }

  confirmDeleteType = {
    title: "Supprimer le type", 
    description: "Voulez-vous vraiment supprimer le type ?",
  }

  confirmDeleteTypes = {
    title: "Supprimer les types", 
    description: "Voulez-vous vraiment supprimer les types ?",
  }

  confirmChangeStatusType = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de ce type ?",
  }

  typeSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom du type est requis'),
  })

  typeFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}

export default TypeRepository;