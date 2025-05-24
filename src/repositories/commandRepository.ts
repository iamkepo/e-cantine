/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import commandsService from "@/services/commandsService";
import Repository from "@/repositories/repository";
import { ICommand, IEvent, IRestaurant } from "@/core/interfaces";
import * as yup from 'yup';
import { statusRender } from "@/helpers/functions";
import { StatusActivation } from "@/enums";

export default class CommandRepository extends Repository<ICommand> {

  constructor(setCommands?: ({data, meta}: {data: ICommand[], meta: Meta}) => void) {
    super(setCommands as unknown as ({data, meta}: {data: ICommand[], meta: Meta}) => void);
  }

  async fetchCommands(params: ParamsQuery) {
    return this.fetchAll(() => commandsService.fetchCommands(params) as Promise<{data: ICommand[], meta: Meta}>);
  }

  async fetchCommand(id: number) {
    return this.fetchOne(commandsService.fetchCommand as (id: number) => Promise<ICommand>, id);
  }

  async createCommand(payload: ICommand) {
    return this.create(commandsService.createCommand as (payload: ICommand) => Promise<ICommand>, payload);
  }

  async patchCommand(id: number, payload: {attr: string, val: any}) {
    return this.patch(commandsService.patchCommand as (id: number, payload: {attr: string, val: any}) => Promise<ICommand>, id, payload);
  }

  async updateCommand(id: number, payload: ICommand) {
    return this.update(commandsService.updateCommand as (id: number, payload: ICommand) => Promise<ICommand>, id, payload);
  }

  async deleteCommand(id: number) {
    return this.delete(commandsService.deleteCommand as (id: number) => Promise<ICommand>, id);
  }

  async deleteCommands(ids: number[]) {
    return this.deleteList(commandsService.deleteCommands as (ids: number[]) => Promise<any>, ids);
  }

  formCreateCommand(events: IEvent[], restaurants: IRestaurant[]) {
    return [
      { id: "eventId", type: "select", label: "Event", required: true, colSize: "col-12 col-md-2", options: events.map((event: IEvent) => ({ label: event.dateId, value: event.id })) },
      { id: "restaurantId", type: "select", label: "Restaurant", required: true, colSize: "col-12 col-md-2", options: restaurants.map((restaurant: IRestaurant) => ({ label: restaurant.name, value: restaurant.id })) },
    ]
  }

  formUpdateCommand(command: ICommand, events: IEvent[], restaurants: IRestaurant[]) {
    return [
      { id: "eventId", type: "select", label: "Event", required: true, colSize: "col-12 col-md-2", options: events.map((event: IEvent) => ({ label: event.dateId, value: event.id })), value: command.eventId },
      { id: "restaurantId", type: "select", label: "Restaurant", required: true, colSize: "col-12 col-md-2", options: restaurants.map((restaurant: IRestaurant) => ({ label: restaurant.name, value: restaurant.id })), value: command.restaurantId },
    ]
  }

  formFilterCommand(events: IEvent[], restaurants: IRestaurant[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "eventId", type: "select", placeholder: "Event", colSize: "col-12 col-md-2", options: events.map((event: IEvent) => ({ label: event.dateId, value: event.id })) },
      { id: "restaurantId", type: "select", placeholder: "Restaurant", colSize: "col-12 col-md-2", options: restaurants.map((restaurant: IRestaurant) => ({ label: restaurant.name, value: restaurant.id })) },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadCommand = [
    {label: 'Event', key: 'eventId'},
    {label: 'Restaurant', key: 'restaurantId'},
    {label: 'Status', key: 'status'}
  ]

  filterCommand = { take: 10, search: "", eventId: "", restaurantId: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteCommand = {
    title: "Supprimer la commande", 
    description: "Voulez-vous vraiment supprimer la commande ?",
  }

  confirmDeleteCommands = {
    title: "Supprimer les commandes", 
    description: "Voulez-vous vraiment supprimer les commandes ?",
  }

  confirmChangeStatusCommand = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de la commande ?",
  }

  formSchemaCommand = yup.object({
    id: yup.number().optional(),
    eventId: yup.number().required(),
    restaurantId: yup.number().required(),
  })


  clientFilterSchema = yup.object({
    eventId: yup.number().required(),
    restaurantId: yup.number().required(),
  })
}
