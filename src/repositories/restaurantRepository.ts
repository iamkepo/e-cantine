/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import restaurantsService from "@/services/restaurantsService";
import Repository from "@/repositories/repository";
import { IRestaurant, IUser } from "@/core/interfaces";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";

export default class RestaurantsRepository extends Repository<IRestaurant> {
  constructor(setRestaurants?: ({data, meta}: {data: IRestaurant[], meta: Meta}) => void) {
    super(setRestaurants as unknown as ({data, meta}: {data: IRestaurant[], meta: Meta}) => void);
  }

  async fetchRestaurants(params: ParamsQuery) {
    return this.fetchAll(() => restaurantsService.fetchRestaurants(params) as Promise<{data: IRestaurant[], meta: Meta}>);
  }

  async fetchRestaurant(id: number) {
    return this.fetchOne(restaurantsService.fetchRestaurant as (id: number) => Promise<IRestaurant>, id);
  }

  async createRestaurant(payload: IRestaurant) {
    return this.create(restaurantsService.createRestaurant as (payload: IRestaurant) => Promise<IRestaurant>, payload);
  }

  async patchRestaurant(id: number, payload: {attr: string, val: any}) {
    return this.patch(restaurantsService.patchRestaurant as (id: number, payload: {attr: string, val: any}) => Promise<IRestaurant>, id, payload);
  }

  async updateRestaurant(id: number, payload: IRestaurant) {
    return this.update(restaurantsService.updateRestaurant as (id: number, payload: IRestaurant) => Promise<IRestaurant>, id, payload);
  }

  async deleteRestaurant(id: number) {
    return this.delete(restaurantsService.deleteRestaurant as (id: number) => Promise<IRestaurant>, id);
  }

  async deleteRestaurants(ids: number[]) {
    return this.deleteList(restaurantsService.deleteRestaurants as (ids: number[]) => Promise<any>, ids);
  }

  formCreateRestaurant(users: IUser[]) {
    return [
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12" },
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })) },
    ]
  }

  formUpdateRestaurant(restaurant: IRestaurant, users: IUser[]) {
    return [
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12", value: restaurant.phone },
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: restaurant.name },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })), value: restaurant.userId },
    ]
  }

  formFilterRestaurant() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadRestaurant = [
    {label: 'Nom', key: 'name'},
    {label: 'Téléphone', key: 'phone'},
    {label: 'Status', key: 'status'}
  ]

  filterRestaurant = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteRestaurant = {
    title: "Supprimer le restaurant", 
    description: "Voulez-vous vraiment supprimer le restaurant ?",
  }

  confirmDeleteRestaurants = {
    title: "Supprimer les restaurants", 
    description: "Voulez-vous vraiment supprimer les restaurants ?",
  }

  confirmChangeStatusRestaurant = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de ce restaurant ?",
  }

  restaurantSchema = yup.object({
    id: yup.number().optional(),
    phone: yup.string().required('Téléphone est requis'),
    name: yup.string().required('Nom est requis'),
    userId: yup.number().required('Utilisateur est requis'),
  })

  restaurantFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
