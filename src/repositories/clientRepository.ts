/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import clientsService from "@/services/clientsService";
import Repository from "@/repositories/repository";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IClient, IUser } from "@/core/interfaces";

export default class ClientRepository extends Repository<IClient> {
  constructor(setClients?: ({data, meta}: {data: IClient[], meta: Meta}) => void) {
    super(setClients as unknown as ({data, meta}: {data: IClient[], meta: Meta}) => void);
  }

  async fetchClients(params: ParamsQuery) {
    return this.fetchAll(() => clientsService.fetchClients(params) as Promise<{data: IClient[], meta: Meta}>);
  }

  async fetchClient(id: number) {
    return this.fetchOne(clientsService.fetchClient as (id: number) => Promise<IClient>, id);
  }

  async createClient(payload: IClient) {
    return this.create(clientsService.createClient as (payload: IClient) => Promise<IClient>, payload);
  }

  async patchClient(id: number, payload: {attr: string, val: any}) {
    return this.patch(clientsService.patchClient as (id: number, payload: {attr: string, val: any}) => Promise<IClient>, id, payload);
  }

  async updateClient(id: number, payload: IClient) {
    return this.update(clientsService.updateClient as (id: number, payload: IClient) => Promise<IClient>, id, payload);
  }

  async deleteClient(id: number) {
    return this.delete(clientsService.deleteClient as (id: number) => Promise<IClient>, id);
  }

  async deleteClients(ids: number[]) {
    return this.deleteList(clientsService.deleteClients as (ids: number[]) => Promise<any>, ids);
  }

  formCreateClient(users: IUser[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })) },
    ]
  }

  formUpdateClient(client: IClient, users: IUser[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: client.name },
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12", value: client.phone },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })), value: client.userId },
    ]
  }

  formFilterClient() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadClient = [
    {label: 'Nom', key: 'name'},
    {label: 'Téléphone', key: 'phone'},
    {label: 'Status', key: 'status'}
  ]

  filterClient = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteClient = {
    title: "Supprimer le client", 
    description: "Voulez-vous vraiment supprimer le client ?",
  }

  confirmDeleteClients = {
    title: "Supprimer les clients", 
    description: "Voulez-vous vraiment supprimer les clients ?",
  }

  confirmChangeStatusClient = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de ce client ?",
  }

  clientSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom est requis'),
    phone: yup.string().required('Téléphone est requis'),
    status: yup.string().required('Status est requis'),
  })

  clientFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
