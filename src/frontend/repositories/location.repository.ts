import { ILocation, IClient } from "@/core/interfaces";
import * as yup from 'yup';
import LocationsService from "@/frontend/services/locations.service";
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";

export default class LocationRepository extends LocationsService {
  constructor() {
    super();
  }

  // Table configuration
  tableHeadLocation = [
    { id: 'address', label: 'Adresse' },
    { id: 'latitude', label: 'Latitude' },
    { id: 'longitude', label: 'Longitude' },
    { id: 'city', label: 'Ville' },
    { id: 'country', label: 'Pays' },
    { id: 'zipCode', label: 'Code postal' },
    { id: 'clientId', label: 'Client' },
    { id: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterLocation = {
    take: 10,
    search: "",
    clientId: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    sort:  "desc"
  }

  // Form methods
  formCreateLocation(clients?: IClient[]) {
    return [
      { id: "address", type: "text", label: "Adresse", required: true, colSize: "col-12 col-md-2" },
      { id: "latitude", type: "number", label: "Latitude", required: true, colSize: "col-12 col-md-2" },
      { id: "longitude", type: "number", label: "Longitude", required: true, colSize: "col-12 col-md-2" },
      { id: "city", type: "text", label: "Ville", required: true, colSize: "col-12 col-md-2" },
      { id: "country", type: "text", label: "Pays", required: true, colSize: "col-12 col-md-2" },
      { id: "zipCode", type: "text", label: "Code postal", required: true, colSize: "col-12 col-md-2" },
      { id: "clientId", type: "select", label: "Client", required: true, colSize: "col-12 col-md-2",
        options: clients?.map((client: IClient) => ({
          label: client.name,
          value: client.id
        }))
      },
    ]
  }

  formUpdateLocation(location: ILocation, clients?: IClient[]) {
    return [
      { id: "address", type: "text", label: "Adresse", required: true, colSize: "col-12 col-md-2", value: location.address },
      { id: "latitude", type: "number", label: "Latitude", required: true, colSize: "col-12 col-md-2", value: location.latitude },
      { id: "longitude", type: "number", label: "Longitude", required: true, colSize: "col-12 col-md-2", value: location.longitude },
      { id: "city", type: "text", label: "Ville", required: true, colSize: "col-12 col-md-2", value: location.city },
      { id: "country", type: "text", label: "Pays", required: true, colSize: "col-12 col-md-2", value: location.country },
      { id: "zipCode", type: "text", label: "Code postal", required: true, colSize: "col-12 col-md-2", value: location.zipCode },
      { id: "clientId", type: "select", label: "Client", required: true, colSize: "col-12 col-md-2",
        options: clients?.map((client: IClient) => ({
          label: client.name,
          value: client.id
        })),
        value: location.clientId
      },
    ]
  }

  formFilterLocation(clients?: IClient[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "clientId", type: "select", placeholder: "Client", colSize: "col-12 col-md-3",
        options: clients?.map((client: IClient) => ({
          label: client.name,
          value: client.id
        }))
      },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3",
        options: Object.values(StatusActivation).map((status) => ({
          label: statusRender(status),
          value: status
        }))
      },
    ]
  }

  // Validation schemas
  locationSchema = yup.object({
    id: yup.number().optional(),
    address: yup.string().required('Adresse est requise'),
    latitude: yup.number().required('Latitude est requise'),
    longitude: yup.number().required('Longitude est requise'),
    city: yup.string().required('Ville est requise'),
    country: yup.string().required('Pays est requis'),
    zipCode: yup.string().required('Code postal est requis'),
    clientId: yup.number().required('Client est requis'),
    status: yup.string().required('Status est requis'),
  })

  locationFilterSchema = yup.object({
    search: yup.string().optional(),
    clientId: yup.number().optional(),
    status: yup.string().optional(),
  })

  // Confirmation dialogs
  confirmDeleteLocation = {
    title: "Supprimer le lieu",
    description: "Voulez-vous vraiment supprimer ce lieu ?",
  }

  confirmDeleteLocations = {
    title: "Supprimer les lieux",
    description: "Voulez-vous vraiment supprimer ces lieux ?",
  }

  confirmChangeStatusLocation = {
    title: "Changer le status",
    description: "Voulez-vous vraiment changer le status de ce lieu ?",
  }
}
