/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import deliverersService from "@/services/deliverersService";
import Repository from "@/repositories/repository";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IDeliverer, IUser } from "@/core/interfaces";

export default class DelivererRepository extends Repository<IDeliverer> {
  constructor(setDeliverers?: ({data, meta}: {data: IDeliverer[], meta: Meta}) => void) {
    super(setDeliverers as unknown as ({data, meta}: {data: IDeliverer[], meta: Meta}) => void);
  }

  async fetchDeliverers(params: ParamsQuery) {
    return this.fetchAll(() => deliverersService.fetchDeliverers(params) as Promise<{data: IDeliverer[], meta: Meta}>);
  }

  async fetchDeliverer(id: number) {
    return this.fetchOne(deliverersService.fetchDeliverer as (id: number) => Promise<IDeliverer>, id);
  }

  async createDeliverer(payload: IDeliverer) {
    return this.create(deliverersService.createDeliverer as (payload: IDeliverer) => Promise<IDeliverer>, payload);
  }

  async patchDeliverer(id: number, payload: {attr: string, val: any}) {
    return this.patch(deliverersService.patchDeliverer as (id: number, payload: {attr: string, val: any}) => Promise<IDeliverer>, id, payload);
  }

  async updateDeliverer(id: number, payload: IDeliverer) {
    return this.update(deliverersService.updateDeliverer as (id: number, payload: IDeliverer) => Promise<IDeliverer>, id, payload);
  }

  async deleteDeliverer(id: number) {
    return this.delete(deliverersService.deleteDeliverer as (id: number) => Promise<IDeliverer>, id);
  }

  async deleteDeliverers(ids: number[]) {
    return this.deleteList(deliverersService.deleteDeliverers as (ids: number[]) => Promise<any>, ids);
  }

  formCreateDeliverer(users: IUser[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })), value: null },
    ]
  }

  formUpdateDeliverer(deliverer: IDeliverer, users: IUser[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: deliverer.name },
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12", value: deliverer.phone },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })), value: deliverer.userId },
    ]
  }

  formFilterDeliverer() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadDeliverer = [
    {label: 'Nom', key: 'name'},
    {label: 'Téléphone', key: 'phone'},
    {label: 'Status', key: 'status'}
  ]

  filterDeliverer = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteDeliverer = {
    title: "Supprimer le livreur", 
    description: "Voulez-vous vraiment supprimer le livreur ?",
  }

  confirmDeleteDeliverers = {
    title: "Supprimer les livreurs", 
    description: "Voulez-vous vraiment supprimer les livreurs ?",
  }

  confirmChangeStatusDeliverer = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de ce livreur ?",
  }

  delivererSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom est requis'),
    phone: yup.string().required('Téléphone est requis'),
    userId: yup.number().required('Utilisateur est requis'),
  })

  delivererFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
