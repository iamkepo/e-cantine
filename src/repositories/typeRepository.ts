import { IType } from "@/core/interfaces";
import typesService from "@/services/typesService";
import * as yup from 'yup';

class TypeRepository {

  constructor() {
  }

  async fetchTypes() {
    try {
      const data = await typesService.fetchTypes();
      return data;
    } catch (error) {
      console.error("Erreur fetchTypes :", error);
      throw error;
    }
  }

  async fetchType(id: number) {
    try {
      const data = await typesService.fetchType(id);
      return data;
    } catch (error) {
      console.error("Erreur fetchType :", error);
      throw error;
    }
  }

  async createType(payload: IType) {
    try {
      await typesService.createType(payload);
      const types = await this.fetchTypes();
      return types;
    } catch (error) {
      console.error("Erreur createType :", error);
      throw error;
    }
  }

  async changeStatusType(id: number, status: string) {
    try {
      await typesService.patchType(id, {status});
      const types = await this.fetchTypes();
      return types;
    } catch (error) {
      console.error("Erreur changeStatusType :", error);
      throw error;
    }
  }

  async updateType(id: number, payload: IType) {
    try {
      await typesService.updateType(id, payload);
      const types = await this.fetchTypes();
      return types;
    } catch (error) {
      console.error("Erreur updateType :", error);
      throw error;
    }
  }

  async deleteType(id: number) {
    try {
      await typesService.deleteType(id);
      const types = await this.fetchTypes();
      return types;
    } catch (error) {
      console.error("Erreur deleteType :", error);
      throw error;
    }
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

  formDeleteType() {
    return [
      { id: "section", type: "section", label: "Voulez-vous vraiment supprimer le type ?", colSize: "col-12 text-center" },
    ]
  }

  formChangeStatusType() {
    return [
      { id: "section", type: "section", label: "Voulez-vous vraiment changer le statut du type ?", colSize: "col-12 text-center" },
    ]
  }

  typeSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom du type est requis'),
  })
}

export default TypeRepository;