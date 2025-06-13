import DeliverersService from "@/services/deliverersService";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IDeliverer, IUser } from "@/core/interfaces";

export default class DelivererRepository extends DeliverersService {
  constructor() {
    super();
  }

  formCreateDeliverer(users?: IUser[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users?.map((user: IUser) => ({ label: user.name, value: user.id })), value: null },
    ]
  }

  formUpdateDeliverer(deliverer: IDeliverer, users?: IUser[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: deliverer.name },
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12", value: deliverer.phone },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users?.map((user: IUser) => ({ label: user.name, value: user.id })), value: deliverer.userId },
    ]
  }

  formFilterDeliverer() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadDeliverer = [
    {label: 'Nom', key: 'name'},
    {label: 'Téléphone', key: 'phone'},
    {label: 'Status', key: 'status'}
  ]

  filterDeliverer = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteDeliverer = {
    title: "Supprimer le livreur", 
    description: "Voulez-vous vraiment supprimer le livreur ?",
  }

  confirmDeleteDeliverers = {
    title: "Supprimer les livreurs", 
    description: "Voulez-vous vraiment supprimer les livreurs ?",
  }

  confirmChangeStatusDeliverer = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de ce livreur ?",
  }

  delivererSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom est requis'),
    phone: yup.string().required('Téléphone est requis'),
    userId: yup.number().required('Utilisateur est requis'),
  })

  delivererFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
