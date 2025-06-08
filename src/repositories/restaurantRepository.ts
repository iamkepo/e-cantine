import { IRestaurant, IUser } from "@/core/interfaces";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import RestaurantsService from '@/services/restaurantsService';
import { SetData } from "@/core/types";

export default class RestaurantsRepository extends RestaurantsService {
  constructor(setRestaurant: SetData<IRestaurant>) {
    super(setRestaurant);
  }

  // Table configuration
  tableHeadRestaurant = [
    { id: 'name', label: 'Nom' },
    { id: 'phone', label: 'Téléphone' },
    { id: 'userId', label: 'Utilisateur' },
    { id: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterRestaurant = {
    take: 10,
    search: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    order: "desc"
  }

  // Form methods
  formCreateRestaurant(users: IUser[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12",
        options: users.map((user: IUser) => ({
          label: user.name,
          value: user.id
        }))
      },
    ]
  }

  formUpdateRestaurant(restaurant: IRestaurant, users: IUser[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: restaurant.name },
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12", value: restaurant.phone },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12",
        options: users.map((user: IUser) => ({
          label: user.name,
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
    name: yup.string().required('Nom est requis'),
    phone: yup.string().required('Téléphone est requis'),
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
