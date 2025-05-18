/* eslint-disable @typescript-eslint/no-explicit-any */
import { IType } from "@/core/interfaces";
import typesService from "@/services/typesService";
import * as yup from 'yup';
import Repository from "@/repositories/repository";

class TypeRepository extends Repository<IType> {

  constructor(setTypes?: (types: IType[]) => void) {
    super(setTypes);
  }

  async fetchTypes() {
    return this.fetchAll(typesService.fetchTypes as () => Promise<IType[]>);
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

  confirmDeleteType = {
    title: "Supprimer le type", 
    description: "Voulez-vous vraiment supprimer le type ?",
  }

  confirmChangeStatusType = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de ce type ?",
  }

  typeSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom du type est requis'),
  })
}

export default TypeRepository;