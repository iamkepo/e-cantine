import { IClient, ISubscription } from "@/core/interfaces";
import { Day, StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import * as yup from 'yup';
import SubscriptionsService from "@/frontend/services/subscriptions.service";

export default class SubscriptionRepository extends SubscriptionsService {
  constructor() {
    super();
  }

  formCreateSubscription(clients?: IClient[]) {
    return [
      { id: "weeks", type: "number", label: "Nombre de semaines", required: true, colSize: "col-12" },
      { id: "checkedDays", type: "select", label: "Jours", required: true, colSize: "col-12", isMultiple: true, options: Object.values(Day).map((day) => ({ label: day, value: day })) },
      { id: "startDate", type: "date", label: "Date de début", required: true, colSize: "col-12" },
      { id: "endDate", type: "date", label: "Date de fin", required: false, colSize: "col-12" },
      { id: "clientId", type: "select", label: "Client", required: true, colSize: "col-12", options: clients?.map((client: IClient) => ({ label: client.name, value: client.id })) },
      { id: "transactionId", type: "number", label: "Transaction", required: true, colSize: "col-12" },
    ]
  }

  formUpdateSubscription(subscription: ISubscription, clients?: IClient[]) {
    return [
      { id: "weeks", type: "number", label: "Nombre de semaines", required: true, colSize: "col-12", value: subscription.weeks },
      { id: "checkedDays", type: "select", label: "Jours", required: true, colSize: "col-12", isMultiple: true, options: Object.values(Day).map((day) => ({ label: day, value: day })), value: subscription.checkedDays },
      { id: "startDate", type: "date", label: "Date de début", required: true, colSize: "col-12", value: subscription.startDate },
      { id: "endDate", type: "date", label: "Date de fin", required: false, colSize: "col-12", value: subscription.endDate },
      { id: "clientId", type: "select", label: "Client", required: true, colSize: "col-12", options: clients?.map((client: IClient) => ({ label: client.name, value: client.id })), value: subscription.clientId },
      { id: "transactionId", type: "number", label: "Transaction", required: true, colSize: "col-12", value: subscription.transactionId },
    ]
  }

  formFilterSubscription() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
      { id: "clientId", type: "number", placeholder: "ID Client", colSize: "col-12 col-md-3" },
    ]
  }

  tableHeadSubscription = [
    {label: 'Nombre de semaines', key: 'weeks'},
    {label: 'Jours', key: 'checkedDays'},
    {label: 'Date de début', key: 'startDate'},
    {label: 'Date de fin', key: 'endDate'},
    {label: 'Client', key: 'clientId'},
    {label: 'Transaction', key: 'transactionId'},
    {label: 'Status', key: 'status'}
  ]

  filterSubscription = { take: 10, search: "", status: "", clientId: "", page: 1, orderBy: "createdAt", sort:  "desc" }

  confirmDeleteSubscription = {
    title: "Supprimer l'abonnement", 
    description: "Voulez-vous vraiment supprimer l'abonnement ?",
  }

  confirmDeleteSubscriptions = {
    title: "Supprimer les abonnements", 
    description: "Voulez-vous vraiment supprimer les abonnements ?",
  }

  confirmChangeStatusSubscription = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de l'abonnement ?",
  }

  subscriptionSchema = yup.object({
    id: yup.number().optional(),
    weeks: yup.number().required('Nombre de semaines est requis').min(1, 'Nombre de semaines doit être au moins 1'),
    checkedDays: yup.array().of(yup.string().oneOf(Object.values(Day))).required('Jours sont requis'),
    startDate: yup.date().required('Date de début est requise'),
    endDate: yup.date().optional(),
    transactionId: yup.number().required('Transaction est requise'),
    clientId: yup.number().required('Client est requis'),
    status: yup.string().optional(),
  })

  subscriptionFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
    clientId: yup.number().optional(),
  })
}
