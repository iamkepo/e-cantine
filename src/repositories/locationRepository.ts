/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import locationsService from "@/services/locationsService";
import Repository from "@/repositories/repository";
import { ILocation, IClient } from "@/core/interfaces";
import * as yup from 'yup';

export default class LocationsRepository extends Repository<ILocation> {
  
  constructor(setLocations?: ({data, meta}: {data: ILocation[], meta: Meta}) => void) {
    super(setLocations as unknown as ({data, meta}: {data: ILocation[], meta: Meta}) => void);
  }


  async fetchLocations(params: ParamsQuery) {
    return this.fetchAll(() => locationsService.fetchLocations(params) as Promise<{data: ILocation[], meta: Meta}>);
  }

  async fetchLocation(id: number) {
    return this.fetchOne(locationsService.fetchLocation as (id: number) => Promise<ILocation>, id);
  }

  async createLocation(payload: ILocation) {
    return this.create(locationsService.createLocation as (payload: ILocation) => Promise<ILocation>, payload);
  }

  async patchLocation(id: number, payload: {attr: string, val: any}) {
    return this.patch(locationsService.patchLocation as (id: number, payload: {attr: string, val: any}) => Promise<ILocation>, id, payload);
  }

  async updateLocation(id: number, payload: ILocation) {
    return this.update(locationsService.updateLocation as (id: number, payload: ILocation) => Promise<ILocation>, id, payload);
  }

  async deleteLocation(id: number) {
    return this.delete(locationsService.deleteLocation as (id: number) => Promise<ILocation>, id);
  }

  async deleteLocations(ids: number[]) {
    return this.deleteList(locationsService.deleteLocations as (ids: number[]) => Promise<any>, ids);
  }

  formCreateLocation(clients: IClient[]) {
    return [
      { id: "address", type: "text", label: "Adresse", required: true, colSize: "col-12 col-md-2" },
      { id: "latitude", type: "number", label: "Latitude", required: true, colSize: "col-12 col-md-2" },
      { id: "longitude", type: "number", label: "Longitude", required: true, colSize: "col-12 col-md-2" },
      { id: "city", type: "text", label: "Ville", required: true, colSize: "col-12 col-md-2" },
      { id: "country", type: "text", label: "Pays", required: true, colSize: "col-12 col-md-2" },
      { id: "zipCode", type: "text", label: "Code postal", required: true, colSize: "col-12 col-md-2" },
      { id: "clientId", type: "select", label: "Client", required: true, colSize: "col-12 col-md-2", options: clients.map((client: IClient) => ({ label: client.name, value: client.id })) },
    ]
  }

  formUpdateLocation(location: ILocation, clients: IClient[]) {
    return [
      { id: "address", type: "text", label: "Adresse", required: true, colSize: "col-12 col-md-2", value: location.address },
      { id: "latitude", type: "number", label: "Latitude", required: true, colSize: "col-12 col-md-2", value: location.latitude },
      { id: "longitude", type: "number", label: "Longitude", required: true, colSize: "col-12 col-md-2", value: location.longitude },
      { id: "city", type: "text", label: "Ville", required: true, colSize: "col-12 col-md-2", value: location.city },
      { id: "country", type: "text", label: "Pays", required: true, colSize: "col-12 col-md-2", value: location.country },
      { id: "zipCode", type: "text", label: "Code postal", required: true, colSize: "col-12 col-md-2", value: location.zipCode },
      { id: "clientId", type: "select", label: "Client", required: true, colSize: "col-12 col-md-2", options: clients.map((client: IClient) => ({ label: client.name, value: client.id })), value: location.clientId },
    ]
  }

  formFilterLocation(clients: IClient[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "clientId", type: "select", placeholder: "Client", colSize: "col-12 col-md-2", options: clients.map((client: IClient) => ({ label: client.name, value: client.id })) },
    ]
  }
  
  tableHeadLocation = [
    {label: 'Adresse', key: 'address'},
    {label: 'Latitude', key: 'latitude'},
    {label: 'Longitude', key: 'longitude'},
    {label: 'Ville', key: 'city'},
    {label: 'Pays', key: 'country'},
    {label: 'Code postal', key: 'zipCode'},
    {label: 'Client', key: 'clientId'},
    {label: 'Status', key: 'status'}
  ]

  filterLocation = { take: 10, search: "", clientId: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteLocation = {
    title: "Supprimer la location", 
    description: "Voulez-vous vraiment supprimer la location ?",
  }

  confirmDeleteLocations = {
    title: "Supprimer les locations", 
    description: "Voulez-vous vraiment supprimer les locations ?",
  }

  confirmChangeStatusLocation = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de la location ?",
  }

  formSchemaLocation = yup.object({
    id: yup.number().optional(),
    address: yup.string().required(),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    zipCode: yup.string().required(),
    clientId: yup.number().required(),
  })
  
  
  clientFilterSchema = yup.object({
    eventId: yup.number().required(),
    restaurantId: yup.number().required(),
  })
}
