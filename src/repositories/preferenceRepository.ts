/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import preferencesService from "@/services/preferencesService";
import Repository from "@/repositories/repository";
import * as yup from 'yup';
import { IClient, IPreference, ITag } from "@/core/interfaces";


export default class PreferencesRepository extends Repository<IPreference> {
  constructor(setPreferences?: ({data, meta}: {data: IPreference[], meta: Meta}) => void) {
    super(setPreferences as unknown as ({data, meta}: {data: IPreference[], meta: Meta}) => void);
  }

  async fetchPreferences(params: ParamsQuery) {
    return this.fetchAll(() => preferencesService.fetchPreferences(params) as Promise<{data: IPreference[], meta: Meta}>);
  }

  async fetchPreference(id: number) {
    return this.fetchOne(preferencesService.fetchPreference as (id: number) => Promise<IPreference>, id);
  }

  async createPreference(payload: IPreference) {
    return this.create(preferencesService.createPreference as (payload: IPreference) => Promise<IPreference>, payload);
  }

  async patchPreference(id: number, payload: {attr: string, val: any}) {
    return this.patch(preferencesService.patchPreference as (id: number, payload: {attr: string, val: any}) => Promise<IPreference>, id, payload);
  }

  async updatePreference(id: number, payload: IPreference) {
    return this.update(preferencesService.updatePreference as (id: number, payload: IPreference) => Promise<IPreference>, id, payload);
  }

  async deletePreference(id: number) {
    return this.delete(preferencesService.deletePreference as (id: number) => Promise<IPreference>, id);
  }

  async deletePreferences(ids: number[]) {
    return this.deleteList(preferencesService.deletePreferences as (ids: number[]) => Promise<any>, ids);
  }

  formCreatePreference(tags: ITag[], clients: IClient[]) {
    return [
      { id: "clientId", type: "select", label: "Client", required: true, colSize: "col-12", options: clients.map((client: IClient) => ({ label: client.name, value: client.id })) },
      { id: "tagId", type: "select", label: "Tag", required: true, colSize: "col-12", options: tags.map((tag: ITag) => ({ label: tag.name, value: tag.id })) },
    ]
  }

  formUpdatePreference(preference: IPreference, tags: ITag[], clients: IClient[]) {
    return [
      { id: "clientId", type: "select", label: "Client", required: true, colSize: "col-12", options: clients.map((client: IClient) => ({ label: client.name, value: client.id })), value: preference.clientId },
      { id: "tagId", type: "select", label: "Tag", required: true, colSize: "col-12", options: tags.map((tag: ITag) => ({ label: tag.name, value: tag.id })), value: preference.tagId },
    ]
  }

  formFilterPreference(tags: ITag[], clients: IClient[]) {
    return [
      { id: "clientId", type: "select", label: "Client", colSize: "col-12 col-md-9", options: clients.map((client: IClient) => ({ label: client.name, value: client.id })) },
      { id: "tagId", type: "select", label: "Tag", colSize: "col-12 col-md-3", options: tags.map((tag: ITag) => ({ label: tag.name, value: tag.id })) },
    ]
  }

  tableHeadPreference = [
    {label: 'Client', key: 'clientId'},
    {label: 'Tag', key: 'tagId'},
    {label: 'Status', key: 'status'},
  ]

  filterPreference = { take: 10, clientId: "", tagId: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeletePreference = {
    title: "Supprimer la préférence",
    description: "Voulez-vous vraiment supprimer la préférence ?",
  }

  confirmDeletePreferences = {
    title: "Supprimer les préférences",
    description: "Voulez-vous vraiment supprimer les préférences ?",
  }

  preferenceSchema = yup.object({
    id: yup.number().optional(),
    clientId: yup.number().required('Client est requis'),
    tagId: yup.number().required('Tag est requis'),
  })

  preferenceFilterSchema = yup.object({
    clientId: yup.number().optional(),
    tagId: yup.number().optional(),
  })
}