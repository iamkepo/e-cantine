/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITag } from "@/core/interfaces";
import tagsService from "@/services/tagsService";
import * as yup from 'yup';
import Repository from "@/repositories/repository";

class TagRepository extends Repository<ITag> {

  constructor(setTags?: (tags: ITag[]) => void) {
    super(setTags);
  }

  async fetchTags() {
    return this.fetchAll(tagsService.fetchTags as () => Promise<ITag[]>);
  }

  async fetchTag(id: number) {
    return this.fetchOne(tagsService.fetchTag as (id: number) => Promise<ITag>, id);
  }

  async createTag(payload: ITag) {
    return this.create(tagsService.createTag as (payload: ITag) => Promise<ITag>, payload);
  }

  async changeStatusTag(id: number, status: string) {
    return this.patch(tagsService.patchTag as (id: number, payload: {attr: string, val: any}) => Promise<ITag>, id, { attr: 'status', val: status });
  }

  async updateTag(id: number, payload: ITag) {
    return this.update(tagsService.updateTag as (id: number, payload: ITag) => Promise<ITag>, id, payload);
  }

  async deleteTag(id: number) {
    return this.delete(tagsService.deleteTag as (id: number) => Promise<ITag>, id);
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

  confirmDeleteTag = {
    title: "Supprimer le tag", 
    description: "Voulez-vous vraiment supprimer le tag ?",
  }

  confirmChangeStatusTag = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status du tag ?",
  }

  tagSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom du tag est requis'),
  })
}

export default TagRepository;