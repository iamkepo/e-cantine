import ClientsService from "@/frontend/services/clients.service";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IClient, IUser } from "@/core/interfaces";

export default class ClientRepository extends ClientsService {
  constructor() {
    super();
  }

  // Table configuration
  tableHeadClient = [
    { id: 'name', label: 'Nom' },
    { id: 'phone', label: 'Téléphone' },
    { id: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterClient = {
    take: 10,
    search: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    sort:  "desc"
  }

  // Form methods
  formCreateClient(users?: IUser[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12",
        options: users?.map((user: IUser) => ({
          label: user.name,
          value: user.id
        }))
      },
    ]
  }

  formUpdateClient(client: IClient, users?: IUser[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: client.name },
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12", value: client.phone },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12",
        options: users?.map((user: IUser) => ({
          label: user.name,
          value: user.id
        })),
        value: client.userId
      },
    ]
  }

  formFilterClient() {
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
  clientSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom est requis'),
    phone: yup.string().required('Téléphone est requis'),
    status: yup.string().required('Status est requis'),
  })

  clientFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })

  // Confirmation dialogs
  confirmDeleteClient = {
    title: "Supprimer le client",
    description: "Voulez-vous vraiment supprimer le client ?",
  }

  confirmDeleteClients = {
    title: "Supprimer les clients",
    description: "Voulez-vous vraiment supprimer les clients ?",
  }

  confirmChangeStatusClient = {
    title: "Changer le status",
    description: "Voulez-vous vraiment changer le status de ce client ?",
  }
}
