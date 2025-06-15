import CommandsService from "@/services/commandsService";
import { ICommand, IEvent, IRestaurant } from "@/core/interfaces";
import * as yup from 'yup';
import { statusRender } from "@/helpers/functions";
import { StatusActivation } from "@/enums";

export default class CommandRepository extends CommandsService {
  constructor() {
    super();
  }

  // Table configuration
  tableHeadCommand = [
    { id: 'eventId', label: 'Event' },
    { id: 'restaurantId', label: 'Restaurant' },
    { id: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterCommand = {
    take: 10,
    search: "",
    eventId: "",
    restaurantId: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    sort:  "desc"
  }

  // Form methods
  formCreateCommand(events?: IEvent[], restaurants?: IRestaurant[]) {
    return [
      { id: "eventId", type: "select", label: "Event", required: true, colSize: "col-12 col-md-2",
        options: events?.map((event: IEvent) => ({
          label: event.dateId,
          value: event.id
        }))
      },
      { id: "restaurantId", type: "select", label: "Restaurant", required: true, colSize: "col-12 col-md-2",
        options: restaurants?.map((restaurant: IRestaurant) => ({
          label: restaurant.name,
          value: restaurant.id
        }))
      },
    ]
  }

  formUpdateCommand(command: ICommand, events?: IEvent[], restaurants?: IRestaurant[]) {
    return [
      { id: "eventId", type: "select", label: "Event", required: true, colSize: "col-12 col-md-2",
        options: events?.map((event: IEvent) => ({
          label: event.dateId,
          value: event.id
        })),
        value: command.eventId
      },
      { id: "restaurantId", type: "select", label: "Restaurant", required: true, colSize: "col-12 col-md-2",
        options: restaurants?.map((restaurant: IRestaurant) => ({
          label: restaurant.name,
          value: restaurant.id
        })),
        value: command.restaurantId
      },
    ]
  }

  formFilterCommand(events: IEvent[], restaurants: IRestaurant[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "eventId", type: "select", placeholder: "Event", colSize: "col-12 col-md-2",
        options: events.map((event: IEvent) => ({
          label: event.dateId,
          value: event.id
        }))
      },
      { id: "restaurantId", type: "select", placeholder: "Restaurant", colSize: "col-12 col-md-2",
        options: restaurants.map((restaurant: IRestaurant) => ({
          label: restaurant.name,
          value: restaurant.id
        }))
      },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2",
        options: Object.values(StatusActivation).map((status) => ({
          label: statusRender(status),
          value: status
        }))
      },
    ]
  }

  // Validation schemas
  formSchemaCommand = yup.object({
    id: yup.number().optional(),
    eventId: yup.number().required('Event est requis'),
    restaurantId: yup.number().required('Restaurant est requis'),
  })

  clientFilterSchema = yup.object({
    eventId: yup.number().required('Event est requis'),
    restaurantId: yup.number().required('Restaurant est requis'),
  })

  // Confirmation dialogs
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
}
