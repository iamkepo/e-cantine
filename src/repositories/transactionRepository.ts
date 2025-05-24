/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import transactionsService from "@/services/transactionsService";
import Repository from "@/repositories/repository";
import { IPromo, ISubscription, ITransaction, IMethod } from "@/core/interfaces";
import * as yup from "yup";
import { statusRender } from "@/helpers/functions";
import { StatusTransaction } from "@/enums";

export default class TransactionsRepository extends Repository<ITransaction> {

  constructor(setTransactions?: ({data, meta}: {data: ITransaction[], meta: Meta}) => void) {
    super(setTransactions as unknown as ({data, meta}: {data: ITransaction[], meta: Meta}) => void);
  }
  
  async fetchTransactions(params: ParamsQuery) {
    return this.fetchAll(() => transactionsService.fetchTransactions(params) as Promise<{data: ITransaction[], meta: Meta}>);
  }

  async fetchTransaction(id: number) {
    return this.fetchOne(transactionsService.fetchTransaction as (id: number) => Promise<ITransaction>, id);
  }

  async patchTransaction(id: number, payload: {attr: string, val: any}) {
    return this.patch(transactionsService.patchTransaction as (id: number, payload: {attr: string, val: any}) => Promise<ITransaction>, id, payload);
  }

  async deleteTransaction(id: number) {
    return this.delete(transactionsService.deleteTransaction as (id: number) => Promise<ITransaction>, id);
  }

  async deleteTransactions(ids: number[]) {
    return this.deleteList(transactionsService.deleteTransactions as (ids: number[]) => Promise<any>, ids);
  }
  
  formCreateTransaction(subscriptions: ISubscription[], methods: IMethod[], promos: IPromo[]) {
    return [
      { id: "subscriptionId", type: "select", label: "Abonnement", required: true, colSize: "col-12", options: subscriptions.map((subscription: ISubscription) => ({ label: subscription.clientId, value: subscription.id })) },
      { id: "methodId", type: "select", label: "Méthode", required: true, colSize: "col-12", options: methods.map((method: IMethod) => ({ label: method.name, value: method.id })) },
      { id: "promoId", type: "select", label: "Promo", required: true, colSize: "col-12", options: promos.map((promo: IPromo) => ({ label: promo.code, value: promo.id })) },
      { id: "total", type: "number", label: "Total", required: true, colSize: "col-12" },
      { id: "subtotal", type: "number", label: "Subtotal", required: true, colSize: "col-12" },
      { id: "shipping", type: "number", label: "Shipping", required: true, colSize: "col-12" },
      { id: "tax", type: "number", label: "Tax", required: true, colSize: "col-12" },
    ]
  }

  formUpdateTransaction(transaction: ITransaction, subscriptions: ISubscription[], methods: IMethod[], promos: IPromo[]) {
    return [
      { id: "subscriptionId", type: "select", label: "Abonnement", required: true, colSize: "col-12", options: subscriptions.map((subscription: ISubscription) => ({ label: subscription.clientId, value: subscription.id })), value: transaction.subscriptionId },
      { id: "methodId", type: "select", label: "Méthode", required: true, colSize: "col-12", options: methods.map((method: IMethod) => ({ label: method.name, value: method.id })), value: transaction.methodId },
      { id: "promoId", type: "select", label: "Promo", required: true, colSize: "col-12", options: promos.map((promo: IPromo) => ({ label: promo.code, value: promo.id })), value: transaction.promoId },
      { id: "subtotal", type: "number", label: "Subtotal", required: true, colSize: "col-12", value: transaction.subtotal },
      { id: "shipping", type: "number", label: "Shipping", required: true, colSize: "col-12", value: transaction.shipping },
      { id: "tax", type: "number", label: "Tax", required: true, colSize: "col-12", value: transaction.tax },
      { id: "total", type: "number", label: "Total", required: true, colSize: "col-12", value: transaction.total },
    ]
  }

  formFilterTransaction() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusTransaction).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadTransaction = [
    {label: 'Abonnement', key: 'subscriptionId'},
    {label: 'Méthode', key: 'methodId'},
    {label: 'Promo', key: 'promoId'},
    {label: 'Total', key: 'total'},
    {label: 'Status', key: 'status'}
  ]
  
  filterTransaction = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteTransaction = {
    title: "Supprimer la transaction", 
    description: "Voulez-vous vraiment supprimer la transaction ?",
  }

  confirmDeleteTransactions = {
    title: "Supprimer les transactions", 
    description: "Voulez-vous vraiment supprimer les transactions ?",
  }

  confirmChangeStatusTransaction = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de cette transaction ?",
  }

  transactionStatusSchema = yup.object({
    id: yup.number().optional(),
    methodId: yup.number().required(),
    promoId: yup.number().required(),
    subscriptionId: yup.number().required(),
    subtotal: yup.number().required(),
    shipping: yup.number().required(),
    tax: yup.number().required(),
    total: yup.number().required(),
  })

  transactionFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
