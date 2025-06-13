import * as yup from 'yup';
import { statusRender } from "@/helpers/functions";
import { IDate, IEvent } from "@/core/interfaces";
import { IArticle } from "@/core/interfaces";
import { Slot, StatusActivation } from "@/enums";
import EventsService from "@/services/eventsService";

export default class EventRepository extends EventsService {
  constructor() {
    super();
  }

  tableHeadEvent = [
    {label: 'Count', key: 'count'},
    {label: 'Slot', key: 'slot'},
    {label: 'Date', key: 'dateId'},
    {label: 'Article', key: 'articleId'},
    {label: 'Status', key: 'status'},
  ]

  filterEvent = { 
    take: 10, 
    search: "", 
    dateId: 0, 
    articleId: 0, 
    status: "", 
    page: 1, 
    orderBy: "createdAt", 
    order: "desc" 
  }

  formCreateEvent(dates?: IDate[], articles?: IArticle[]) {
    return [
      { id: "count", type: "number", label: "Nombre", required: true, colSize: "col-12 col-md-2" },
      { id: "slot", type: "select", label: "Slot", required: true, colSize: "col-12 col-md-2", options: Object.values(Slot).map((slot) => ({ label: slot, value: slot })) },
      { id: "dateId", type: "select", label: "Date", required: true, colSize: "col-12 col-md-2", options: dates?.map((date: IDate) => ({ label: date.deliveryDate, value: date.id })) },
      { id: "articleId", type: "select", label: "Article", required: true, colSize: "col-12 col-md-2", options: articles?.map((article: IArticle) => ({ label: article.name, value: article.id })) },
      { id: "status", type: "select", label: "Status", required: true, colSize: "col-12 col-md-2", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  formUpdateEvent(event: IEvent, dates?: IDate[], articles?: IArticle[]) {
    return [
      { id: "count", type: "number", label: "Nombre", required: true, colSize: "col-12 col-md-2", value: event.count },
      { id: "slot", type: "select", label: "Slot", required: true, colSize: "col-12 col-md-2", options: Object.values(Slot).map((slot) => ({ label: slot, value: slot })), value: event.slot },
      { id: "dateId", type: "select", label: "Date", required: true, colSize: "col-12 col-md-2", options: dates?.map((date: IDate) => ({ label: date.deliveryDate, value: date.id })), value: event.dateId },
      { id: "articleId", type: "select", label: "Article", required: true, colSize: "col-12 col-md-2", options: articles?.map((article: IArticle) => ({ label: article.name, value: article.id })), value: event.articleId },
      { id: "status", type: "select", label: "Status", required: true, colSize: "col-12 col-md-2", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })), value: event.status },
    ]
  }

  formFilterEvent(dates?: IDate[], articles?: IArticle[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "dateId", type: "select", placeholder: "Date", colSize: "col-12 col-md-2", options: dates?.map((date: IDate) => ({ label: date.deliveryDate, value: date.id })) },
      { id: "articleId", type: "select", placeholder: "Article", colSize: "col-12 col-md-2", options: articles?.map((article: IArticle) => ({ label: article.name, value: article.id })) },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  eventSchema = yup.object({
    id: yup.number().optional(),
    count: yup.number().required('Nombre est requis'),
    slot: yup.string().required('Slot est requis'),
    dateId: yup.number().required('Date est requise'),
    articleId: yup.number().required('Article est requis'),
    status: yup.string().required('Status est requis'),
  })

  eventFilterSchema = yup.object({
    search: yup.string().optional(),
    dateId: yup.number().optional(),
    articleId: yup.number().optional(),
    status: yup.string().optional(),
  })

  confirmDeleteEvent = {
    title: "Supprimer l'événement", 
    description: "Voulez-vous vraiment supprimer l'événement ?",
  }

  confirmDeleteEvents = {
    title: "Supprimer les événements", 
    description: "Voulez-vous vraiment supprimer les événements ?",
  }

  confirmChangeStatusEvent = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de ce événement ?",
  }
}
