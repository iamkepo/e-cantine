import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IPromo } from "@/core/interfaces";
import PromosService from '@/frontend/services/promos.service';

export default class PromoRepository extends PromosService {
  constructor() {
    super();
  }

  formCreatePromo() {
    return [
      { id: "code", type: "text", label: "Code", required: true, colSize: "col-12 col-md-2" },
      { id: "discount", type: "number", label: "Réduction", required: true, colSize: "col-12 col-md-2" },
      { id: "maxUsage", type: "number", label: "Utilisation max", required: true, colSize: "col-12 col-md-2" },
      { id: "startDate", type: "date", label: "Date de début", required: true, colSize: "col-12 col-md-3" },
      { id: "endDate", type: "date", label: "Date de fin", required: true, colSize: "col-12 col-md-3" },
    ]
  }

  formUpdatePromo(promo: IPromo) {
    return [
      { id: "code", type: "text", label: "Code", required: true, colSize: "col-12 col-md-2", value: promo.code },
      { id: "discount", type: "number", label: "Réduction", required: true, colSize: "col-12 col-md-2", value: promo.discount },
      { id: "maxUsage", type: "number", label: "Utilisation max", required: true, colSize: "col-12 col-md-2", value: promo.maxUsage },
      { id: "startDate", type: "date", label: "Date de début", required: true, colSize: "col-12 col-md-3", value: promo.startDate },
      { id: "endDate", type: "date", label: "Date de fin", required: true, colSize: "col-12 col-md-3", value: promo.endDate },
    ]
  }

  formFilterPromo() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadPromo = [
    {label: 'Code', key: 'code'},
    {label: 'Réduction', key: 'discount'},
    {label: 'Utilisation max', key: 'maxUsage'},
    {label: 'Utilisation courante', key: 'countUsage'},
    {label: 'Date de début', key: 'startDate'},
    {label: 'Date de fin', key: 'endDate'},
    {label: 'Status', key: 'status'}
  ]

  filterPromo = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", sort:  "desc" }

  confirmDeletePromo = {
    title: "Supprimer la promo", 
    description: "Voulez-vous vraiment supprimer la promo ?",
  }

  confirmDeletePromos = {
    title: "Supprimer les promos", 
    description: "Voulez-vous vraiment supprimer les promos ?",
  }

  confirmChangeStatusPromo = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de la promo ?",
  }

  promoSchema = yup.object({
    id: yup.number().optional(),
    code: yup.string().required('Code est requis'),
    discount: yup.number().required('Réduction est requise').min(0, 'Réduction doit être positive').max(100, 'Réduction ne peut pas dépasser 100%'),
    maxUsage: yup.number().required('Utilisation max est requise').min(1, 'Utilisation max doit être au moins 1'),
    startDate: yup.date().required('Date de début est requise'),
    endDate: yup.date().required('Date de fin est requise').min(yup.ref('startDate'), 'Date de fin doit être après la date de début'),
    countUsage: yup.number().optional(),
    status: yup.string().optional(),
  })

  promoFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
