/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import subscriptionsService from "@/services/subscriptionsService";
import Repository from "@/repositories/repository";
import { IClient, ISubscription, ITransaction } from "@/core/interfaces";
import { Day, StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import * as yup from 'yup';

export default class SubscriptionsRepository extends Repository<ISubscription> {

  constructor(setSubscriptions?: ({data, meta}: {data: ISubscription[], meta: Meta}) => void) {
    super(setSubscriptions as unknown as ({data, meta}: {data: ISubscription[], meta: Meta}) => void);
  }

  async fetchSubscriptions(params: ParamsQuery) {
    return this.fetchAll(() => subscriptionsService.fetchSubscriptions(params) as Promise<{data: ISubscription[], meta: Meta}>);
  }

  async fetchSubscription(id: number) {
    return this.fetchOne(subscriptionsService.fetchSubscription as (id: number) => Promise<ISubscription>, id);
  }

  async createSubscription(payload: ISubscription) {
    return this.create(subscriptionsService.createSubscription as (payload: ISubscription) => Promise<ISubscription>, payload);
  }

  async patchSubscription(id: number, payload: {attr: string, val: any}) {
    return this.patch(subscriptionsService.patchSubscription as (id: number, payload: {attr: string, val: any}) => Promise<ISubscription>, id, payload);
  }

  async updateSubscription(id: number, payload: ISubscription) {
    return this.update(subscriptionsService.updateSubscription as (id: number, payload: ISubscription) => Promise<ISubscription>, id, payload);
  }

  async deleteSubscription(id: number) {
    return this.delete(subscriptionsService.deleteSubscription as (id: number) => Promise<ISubscription>, id);
  }

  async deleteSubscriptions(ids: number[]) {
    return this.deleteList(subscriptionsService.deleteSubscriptions as (ids: number[]) => Promise<any>, ids);
  }

  formCreateSubscription(transactions: ITransaction[], clients: IClient[]) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "weeks", type: "number", label: "Nombre de semaines", required: true, colSize: "col-12" },
      { id: "checkedDays", type: "checkbox", label: "Jours", required: true, colSize: "col-12", options: Object.values(Day).map((day) => ({ label: day, value: day })) },
      { id: "startDate", type: "date", label: "Date de début", required: true, colSize: "col-12" },
      { id: "endDate", type: "date", label: "Date de fin", required: true, colSize: "col-12" },
      { id: "transactionId", type: "select", label: "Transaction", required: true, colSize: "col-12", options: transactions.map((transaction: ITransaction) => ({ label: transaction.total, value: transaction.id })) },
      { id: "clientId", type: "select", label: "Client", required: true, colSize: "col-12", options: clients.map((client: IClient) => ({ label: client.name, value: client.id })) },
    ]
  }

  formUpdateSubscription(subscription: ISubscription, transactions: ITransaction[], clients: IClient[]) {
    return [
      { id: "weeks", type: "number", label: "Nombre de semaines", required: true, colSize: "col-12", value: subscription.weeks },
      { id: "checkedDays", type: "checkbox", label: "Jours", required: true, colSize: "col-12", options: Object.values(Day).map((day) => ({ label: day, value: day })), value: subscription.checkedDays },
      { id: "startDate", type: "date", label: "Date de début", required: true, colSize: "col-12", value: subscription.startDate },
      { id: "endDate", type: "date", label: "Date de fin", required: true, colSize: "col-12", value: subscription.endDate },
      { id: "transactionId", type: "select", label: "Transaction", required: true, colSize: "col-12", options: transactions.map((transaction: ITransaction) => ({ label: transaction.total, value: transaction.id })), value: subscription.transactionId },
      { id: "clientId", type: "select", label: "Client", required: true, colSize: "col-12", options: clients.map((client: IClient) => ({ label: client.name, value: client.id })), value: subscription.clientId },
    ]
  }

  formFilterSubscription() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadSubscription = [
    {label: 'Nom', key: 'name'},
    {label: 'Nombre de semaines', key: 'weeks'},
    {label: 'Jours', key: 'checkedDays'},
    {label: 'Date de début', key: 'startDate'},
    {label: 'Date de fin', key: 'endDate'},
    {label: 'Transaction', key: 'transactionId'},
    {label: 'Client', key: 'clientId'},
    {label: 'Status', key: 'status'}
  ]

  filterSubscription = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

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
    description: "Voulez-vous vraiment changer le status de ce abonnement ?",
  }

  subscriptionSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom du abonnement est requis'),
    weeks: yup.number().required('Nombre de semaines est requis'),
    checkedDays: yup.array().required('Jours est requis'),
    startDate: yup.date().required('Date de début est requise'),
    endDate: yup.date().required('Date de fin est requise'),
    transactionId: yup.number().required('Transaction est requise'),
    clientId: yup.number().required('Client est requis'),
  })

  subscriptionFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
