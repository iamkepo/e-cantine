/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import tagsService from "@/services/tagsService";
import * as yup from 'yup';
import Repository from "@/repositories/repository";
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { ITag } from "@/core/interfaces";

class TagRepository extends Repository<ITag> {

  constructor(setTags?: ({data, meta}: {data: ITag[], meta: Meta}) => void) {
    super(setTags as unknown as ({data, meta}: {data: ITag[], meta: Meta}) => void);
  }

  async fetchTags(params: ParamsQuery) {
    return this.fetchAll(() => tagsService.fetchTags(params) as Promise<{data: ITag[], meta: Meta}>);
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

  async deleteTags(ids: number[]) {
    return this.deleteList(tagsService.deleteTags as (ids: number[]) => Promise<ITag>, ids);
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

  formFilterTag() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadTag = [
    {label: 'Nom', key: 'name'},
    {label: 'Status', key: 'status'}
  ]

  filterTag = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteTag = {
    title: "Supprimer le tag", 
    description: "Voulez-vous vraiment supprimer le tag ?",
  }

  confirmDeleteTags = {
    title: "Supprimer les tags", 
    description: "Voulez-vous vraiment supprimer les tags ?",
  }

  confirmChangeStatusTag = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status du tag ?",
  }

  tagSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom du tag est requis'),
  })

  tagFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}

export default TagRepository;