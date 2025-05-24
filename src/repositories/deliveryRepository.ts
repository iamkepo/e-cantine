/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import deliveriesService from "@/services/deliveriesService";
import Repository from "@/repositories/repository";
import { ICommand } from "@/core/interfaces";
import { statusRender } from "@/helpers/functions";
import { IDelivery, IDeliverer } from "@/core/interfaces";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";

export default class DeliveryRepository extends Repository<IDelivery> {

  constructor(setDeliveries?: ({data, meta}: {data: IDelivery[], meta: Meta}) => void) {
    super(setDeliveries as unknown as ({data, meta}: {data: IDelivery[], meta: Meta}) => void);
  }

  async fetchDeliveries(params: ParamsQuery) {
    return this.fetchAll(() => deliveriesService.fetchDeliveries(params) as Promise<{data: IDelivery[], meta: Meta}>);
  }

  async fetchDelivery(id: number) {
    return this.fetchOne(deliveriesService.fetchDelivery as (id: number) => Promise<IDelivery>, id);
  }

  async createDelivery(payload: IDelivery) {
    return this.create(deliveriesService.createDelivery as (payload: IDelivery) => Promise<IDelivery>, payload);
  }

  async patchDelivery(id: number, payload: {attr: string, val: any}) {
    return this.patch(deliveriesService.patchDelivery as (id: number, payload: {attr: string, val: any}) => Promise<IDelivery>, id, payload);
  }

  async updateDelivery(id: number, payload: IDelivery) {
    return this.update(deliveriesService.updateDelivery as (id: number, payload: IDelivery) => Promise<IDelivery>, id, payload);
  }

  async deleteDelivery(id: number) {
    return this.delete(deliveriesService.deleteDelivery as (id: number) => Promise<IDelivery>, id);
  }

  async deleteDeliveries(ids: number[]) {
    return this.deleteList(deliveriesService.deleteDeliveries as (ids: number[]) => Promise<any>, ids);
  }

  formCreateDelivery(commands: ICommand[], deliverers: IDeliverer[]) {
    return [
      { id: "commandId", type: "select", label: "Commande", required: true, colSize: "col-12 col-md-2", options: commands.map((command: ICommand) => ({ label: command.id, value: command.id })) },
      { id: "delivererId", type: "select", label: "Livreur", required: true, colSize: "col-12 col-md-2", options: deliverers.map((deliverer: IDeliverer) => ({ label: deliverer.name, value: deliverer.id })) },
    ]
  }

  formUpdateDelivery(delivery: IDelivery, commands: ICommand[], deliverers: IDeliverer[]) {
    return [
      { id: "commandId", type: "select", label: "Commande", required: true, colSize: "col-12 col-md-2", options: commands.map((command: ICommand) => ({ label: command.id, value: command.id })), value: delivery.commandId },
      { id: "delivererId", type: "select", label: "Livreur", required: true, colSize: "col-12 col-md-2", options: deliverers.map((deliverer: IDeliverer) => ({ label: deliverer.name, value: deliverer.id })), value: delivery.delivererId },
    ]
  }

  formFilterDelivery(commands: ICommand[], deliverers: IDeliverer[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "commandId", type: "select", placeholder: "Commande", colSize: "col-12 col-md-2", options: commands.map((command: ICommand) => ({ label: command.id, value: command.id })) },
      { id: "delivererId", type: "select", placeholder: "Livreur", colSize: "col-12 col-md-2", options: deliverers.map((deliverer: IDeliverer) => ({ label: deliverer.name, value: deliverer.id })) },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadDelivery = [
    {label: 'Commande', key: 'commandId'},
    {label: 'Livreur', key: 'delivererId'},
    {label: 'Status', key: 'status'}
  ]

  filterDelivery = { take: 10, search: "", commandId: "", delivererId: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteDelivery = {
    title: "Supprimer la livraison", 
    description: "Voulez-vous vraiment supprimer la livraison ?",
  }

  confirmDeleteDeliveries = {
    title: "Supprimer les livraisons", 
    description: "Voulez-vous vraiment supprimer les livraisons ?",
  }

  confirmChangeStatusDelivery = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de cette livraison ?",
  }

  deliverySchema = yup.object({
    id: yup.number().optional(),
    commandId: yup.number().required('Commande est requise'),
    delivererId: yup.number().required('Livreur est requise'),
  })

  deliveryFilterSchema = yup.object({
    search: yup.string().optional(),
    commandId: yup.number().optional(),
    delivererId: yup.number().optional(),
    status: yup.string().optional(),
  })
}
