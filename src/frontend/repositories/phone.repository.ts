import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IPhone, IUser } from "@/core/interfaces";
import PhonesService from '@/frontend/services/phones.service';

export default class PhoneRepository extends PhonesService {
  constructor() {
    super();
  }

  formCreatePhone(users?: IUser[]) {
    return [
      { id: "indicator", type: "select", label: "Indicateur", required: true, colSize: "col-12", options: [{ label: "+229", value: "+229" }] },
      { id: "number", type: "text", label: "Numéro", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users?.map((user: IUser) => ({ label: user.username, value: user.id })) },
    ]
  }

  formUpdatePhone(phone: IPhone, users?: IUser[]) {
    return [
      { id: "indicator", type: "select", label: "Indicateur", required: true, colSize: "col-12", options: [{ label: "+229", value: "+229" }], value: phone.indicator },
      { id: "number", type: "text", label: "Numéro", required: true, colSize: "col-12", value: phone.number },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users?.map((user: IUser) => ({ label: user.username, value: user.id })), value: phone.userId },
    ]
  }

  formFilterPhone() {
    return [
      { id: "indicator", type: "select", placeholder: "Indicateur", colSize: "col-12 col-md-2", options: [{ label: "+229", value: "+229" }] },
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadPhone = [
    {label: 'Indicateur', key: 'indicator'},
    {label: 'Numéro', key: 'number'},
    {label: 'Utilisateur', key: 'userId'},
    {label: 'Status', key: 'status'},
  ]

  filterPhone = { take: 10, search: "", indicator: "", status: "", page: 1, orderBy: "createdAt", sort:  "desc" }

  confirmDeletePhone = {
    title: "Supprimer le téléphone", 
    description: "Voulez-vous vraiment supprimer le téléphone ?",
  }

  confirmDeletePhones = {
    title: "Supprimer les téléphones", 
    description: "Voulez-vous vraiment supprimer les téléphones ?",
  }

  confirmChangeStatusPhone = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status du téléphone ?",
  }

  phoneSchema = yup.object({
    id: yup.number().optional(),
    indicator: yup.string().required('Indicateur est requis'),
    number: yup.string().required('Numéro est requis'),
    userId: yup.number().required('Utilisateur est requis'),
    status: yup.string().optional(),
  })

  phoneFilterSchema = yup.object({
    indicator: yup.string().optional(),
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
