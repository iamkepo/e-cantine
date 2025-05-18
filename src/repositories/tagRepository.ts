import { ITag } from "@/core/interfaces";
import tagsService from "@/services/tagsService";
import * as yup from 'yup';

class TagRepository {

  constructor() {
  }

  async fetchTags() {
    try {
      const data = await tagsService.fetchTags();
      return data;
    } catch (error) {
      console.error("Erreur fetchTags :", error);
      throw error;
    }
  }

  async fetchTag(id: number) {
    try {
      const data = await tagsService.fetchTag(id);
      return data;
    } catch (error) {
      console.error("Erreur fetchTag :", error);
      throw error;
    }
  }

  async createTag(payload: ITag) {
    try {
      await tagsService.createTag(payload);
      const tags = await this.fetchTags();
      return tags;
    } catch (error) {
      console.error("Erreur createType :", error);
      throw error;
    }
  }

  async changeStatusTag(id: number, status: string) {
    try {
      await tagsService.patchTag(id, {status});
      const tags = await this.fetchTags();
      return tags;
    } catch (error) {
      console.error("Erreur changeStatusTag :", error);
      throw error;
    }
  }

  async updateTag(id: number, payload: ITag) {
    try {
      await tagsService.updateTag(id, payload);
      const tags = await this.fetchTags();
      return tags;
    } catch (error) {
      console.error("Erreur updateTag :", error);
      throw error;
    }
  }

  async deleteTag(id: number) {
    try {
      await tagsService.deleteTag(id);
      const tags = await this.fetchTags();
      return tags;
    } catch (error) {
      console.error("Erreur deleteTag :", error);
      throw error;
    }
  }

  formCreateTag() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
    ]
  }

  formUpdateTag(tag: ITag) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: tag.name },
    ]
  }

  formDeleteTag() {
    return [
      { id: "section", type: "section", label: "Voulez-vous vraiment supprimer le tag ?", colSize: "col-12 text-center" },
    ]
  }

  formChangeStatusTag() {
    return [
      { id: "section", type: "section", label: "Voulez-vous vraiment changer le statut du tag ?", colSize: "col-12 text-center" },
    ]
  }

  tagSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom du tag est requis'),
  })
}

export default TagRepository;