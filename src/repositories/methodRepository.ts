import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IMethod } from "@/core/interfaces";
import MethodsService from '@/services/methodsService';

export default class MethodsRepository extends MethodsService {
  constructor() {
    super();
  }

  formCreateMethod() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
    ]
  }

  formUpdateMethod(method: IMethod) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: method.name },
    ]
  }

  formFilterMethod() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadMethod = [
    {label: 'Nom', key: 'name'},
    {label: 'Status', key: 'status'}
  ]

  filterMethod = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteMethod = {
    title: "Supprimer la méthode", 
    description: "Voulez-vous vraiment supprimer la méthode ?",
  }

  confirmDeleteMethods = {
    title: "Supprimer les méthodes", 
    description: "Voulez-vous vraiment supprimer les méthodes ?",
  }

  methodSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom est requis'),
  })

  methodFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
