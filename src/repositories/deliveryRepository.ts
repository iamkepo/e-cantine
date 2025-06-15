import * as yup from 'yup';
import { statusRender } from "@/helpers/functions";
import { IDelivery, ICommand, IDeliverer } from "@/core/interfaces";
import { StatusActivation } from "@/enums";
import DeliveriesService from "@/services/deliveriesService";

export default class DeliveryRepository extends DeliveriesService {
  constructor() {
    super();
  }

  // Table configuration
  tableHeadDelivery = [
    { id: 'commandId', label: 'Commande' },
    { id: 'delivererId', label: 'Livreur' },
    { id: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterDelivery = {
    take: 10,
    search: "",
    commandId: "",
    delivererId: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    sort:  "desc"
  }

  // Form methods
  formCreateDelivery(commands?: ICommand[], deliverers?: IDeliverer[]) {
    return [
      { id: "commandId", type: "select", label: "Commande", required: true, colSize: "col-12 col-md-2",
        options: commands?.map((command: ICommand) => ({
          label: String(command.id),
          value: command.id
        }))
      },
      { id: "delivererId", type: "select", label: "Livreur", required: true, colSize: "col-12 col-md-2",
        options: deliverers?.map((deliverer: IDeliverer) => ({
          label: deliverer.name,
          value: deliverer.id
        }))
      },
    ]
  }

  formUpdateDelivery(delivery: IDelivery, commands?: ICommand[], deliverers?: IDeliverer[]) {
    return [
      { id: "commandId", type: "select", label: "Commande", required: true, colSize: "col-12 col-md-2",
        options: commands?.map((command: ICommand) => ({
          label: String(command.id),
          value: command.id
        })),
        value: delivery.commandId
      },
      { id: "delivererId", type: "select", label: "Livreur", required: true, colSize: "col-12 col-md-2",
        options: deliverers?.map((deliverer: IDeliverer) => ({
          label: deliverer.name,
          value: deliverer.id
        })),
        value: delivery.delivererId
      },
      { id: "status", type: "select", label: "Status", required: true, colSize: "col-12 col-md-2",
        options: Object.values(StatusActivation).map((status) => ({
          label: statusRender(status),
          value: status
        })),
        value: delivery.status
      },
    ]
  }

  formFilterDelivery(commands: ICommand[], deliverers: IDeliverer[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "commandId", type: "select", placeholder: "Commande", colSize: "col-12 col-md-2",
        options: commands.map((command: ICommand) => ({
          label: String(command.id),
          value: command.id
        }))
      },
      { id: "delivererId", type: "select", placeholder: "Livreur", colSize: "col-12 col-md-2",
        options: deliverers.map((deliverer: IDeliverer) => ({
          label: deliverer.name,
          value: deliverer.id
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
  deliverySchema = yup.object({
    id: yup.number().optional(),
    commandId: yup.number().required('Commande est requise'),
    delivererId: yup.number().required('Livreur est requis'),
    status: yup.string().required('Status est requis'),
  })

  deliveryFilterSchema = yup.object({
    search: yup.string().optional(),
    commandId: yup.number().optional(),
    delivererId: yup.number().optional(),
    status: yup.string().optional(),
  })

  // Confirmation dialogs
  confirmDeleteDelivery = {
    title: "Supprimer la livraison",
    description: "Voulez-vous vraiment supprimer cette livraison ?",
  }

  confirmDeleteDeliveries = {
    title: "Supprimer les livraisons",
    description: "Voulez-vous vraiment supprimer ces livraisons ?",
  }

  confirmChangeStatusDelivery = {
    title: "Changer le status",
    description: "Voulez-vous vraiment changer le status de cette livraison ?",
  }
}
