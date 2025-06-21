import { IRestaurant, IUser } from "@/core/interfaces";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import RestaurantsService from '@/frontend/services/restaurants.service';

export default class RestaurantRepository extends RestaurantsService {
  constructor() {
    super();
  }

  // Table configuration
  tableHeadRestaurant = [
    { key: 'fullname', label: 'Nom Commercial' },
    { key: 'userId', label: 'Utilisateur' },
    { key: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterRestaurant = {
    take: 10,
    search: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    sort:  "desc"
  }

  // Form methods
  formCreateRestaurant(users?: IUser[]) {
    return [
      { id: "fullname", type: "text", label: "Nom Commercial", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12",
        options: users?.map((user: IUser) => ({
          label: user.username,
          value: user.id
        }))
      },
    ]
  }

  formUpdateRestaurant(restaurant: IRestaurant, users?: IUser[]) {
    return [
      { id: "fullname", type: "text", label: "Nom Commercial", required: true, colSize: "col-12", value: restaurant.fullname },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12",
        options: users?.map((user: IUser) => ({
          label: user.username,
          value: user.id
        })),
        value: restaurant.userId
      },
    ]
  }

  formFilterRestaurant() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3",
        options: Object.values(StatusActivation).map((status) => ({
          label: statusRender(status),
          value: status
        }))
      },
    ]
  }

  // Validation schemas
  restaurantSchema = yup.object({
    id: yup.number().optional(),
    fullname: yup.string().required('Nom Commercial est requis'),
    userId: yup.number().required('Utilisateur est requis'),
    status: yup.string().required('Status est requis'),
  })

  restaurantFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })

  // Confirmation dialogs
  confirmDeleteRestaurant = {
    title: "Supprimer le restaurant",
    description: "Voulez-vous vraiment supprimer ce restaurant ?",
  }

  confirmDeleteRestaurants = {
    title: "Supprimer les restaurants",
    description: "Voulez-vous vraiment supprimer ces restaurants ?",
  }

  confirmChangeStatusRestaurant = {
    title: "Changer le status",
    description: "Voulez-vous vraiment changer le status de ce restaurant ?",
  }
}
