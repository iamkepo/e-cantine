import { IPromo, ISubscription, ITransaction, IMethod } from "@/core/interfaces";
import * as yup from "yup";
import { statusRender } from "@/helpers/functions";
import { StatusTransaction } from "@/enums";
import TransactionsService from "@/services/transactionsService";
import { RequestState, RequestType, SetData } from "@/core/types";

export default class TransactionsRepository extends TransactionsService {
  constructor(transactions: {state: Record<RequestType, RequestState<ITransaction>>, handleData: SetData<ITransaction>}) {
    super(transactions.handleData);
  }

  // Table configuration
  tableHeadTransaction = [
    { id: 'subtotal', label: 'Subtotal' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'tax', label: 'Tax' },
    { id: 'total', label: 'Total' },
    { id: 'subscriptionId', label: 'Abonnement' },
    { id: 'methodId', label: 'Méthode' },
    { id: 'promoId', label: 'Promo' },
    { id: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterTransaction = {
    take: 10,
    search: "",
    subscriptionId: "",
    methodId: "",
    promoId: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    order: "desc"
  }

  // Form methods
  formCreateTransaction(subscriptions: ISubscription[], methods: IMethod[], promos: IPromo[]) {
    return [
      { id: "subscriptionId", type: "select", label: "Abonnement", required: true, colSize: "col-12",
        options: subscriptions.map((subscription: ISubscription) => ({
          label: String(subscription.clientId),
          value: subscription.id
        }))
      },
      { id: "methodId", type: "select", label: "Méthode", required: true, colSize: "col-12",
        options: methods.map((method: IMethod) => ({
          label: method.name,
          value: method.id
        }))
      },
      { id: "promoId", type: "select", label: "Promo", required: true, colSize: "col-12",
        options: promos.map((promo: IPromo) => ({
          label: promo.code,
          value: promo.id
        }))
      },
      { id: "subtotal", type: "number", label: "Subtotal", required: true, colSize: "col-12" },
      { id: "shipping", type: "number", label: "Shipping", required: true, colSize: "col-12" },
      { id: "tax", type: "number", label: "Tax", required: true, colSize: "col-12" },
      { id: "total", type: "number", label: "Total", required: true, colSize: "col-12" },
    ]
  }

  formUpdateTransaction(transaction: ITransaction, subscriptions: ISubscription[], methods: IMethod[], promos: IPromo[]) {
    return [
      { id: "subscriptionId", type: "select", label: "Abonnement", required: true, colSize: "col-12",
        options: subscriptions.map((subscription: ISubscription) => ({
          label: String(subscription.clientId),
          value: subscription.id
        })),
        value: transaction.subscriptionId
      },
      { id: "methodId", type: "select", label: "Méthode", required: true, colSize: "col-12",
        options: methods.map((method: IMethod) => ({
          label: method.name,
          value: method.id
        })),
        value: transaction.methodId
      },
      { id: "promoId", type: "select", label: "Promo", required: true, colSize: "col-12",
        options: promos.map((promo: IPromo) => ({
          label: promo.code,
          value: promo.id
        })),
        value: transaction.promoId
      },
      { id: "subtotal", type: "number", label: "Subtotal", required: true, colSize: "col-12", value: transaction.subtotal },
      { id: "shipping", type: "number", label: "Shipping", required: true, colSize: "col-12", value: transaction.shipping },
      { id: "tax", type: "number", label: "Tax", required: true, colSize: "col-12", value: transaction.tax },
      { id: "total", type: "number", label: "Total", required: true, colSize: "col-12", value: transaction.total },
      { id: "status", type: "select", label: "Status", required: true, colSize: "col-12",
        options: Object.values(StatusTransaction).map((status) => ({
          label: statusRender(status),
          value: status
        })),
        value: transaction.status
      },
    ]
  }

  formFilterTransaction() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "subscriptionId", type: "number", placeholder: "Abonnement", colSize: "col-12 col-md-2" },
      { id: "methodId", type: "number", placeholder: "Méthode", colSize: "col-12 col-md-2" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2",
        options: Object.values(StatusTransaction).map((status) => ({
          label: statusRender(status),
          value: status
        }))
      },
    ]
  }

  // Validation schemas
  transactionSchema = yup.object({
    id: yup.number().optional(),
    methodId: yup.number().required('Méthode est requise'),
    promoId: yup.number().required('Promo est requise'),
    subscriptionId: yup.number().required('Abonnement est requis'),
    subtotal: yup.number().required('Subtotal est requis'),
    shipping: yup.number().required('Shipping est requis'),
    tax: yup.number().required('Tax est requis'),
    total: yup.number().required('Total est requis'),
    status: yup.string().required('Status est requis'),
  })

  transactionFilterSchema = yup.object({
    search: yup.string().optional(),
    subscriptionId: yup.number().optional(),
    promoId: yup.number().optional(),
    methodId: yup.number().optional(),
    status: yup.string().optional(),
  })

  // Confirmation dialogs
  confirmDeleteTransaction = {
    title: "Supprimer la transaction",
    description: "Voulez-vous vraiment supprimer cette transaction ?",
  }

  confirmDeleteTransactions = {
    title: "Supprimer les transactions",
    description: "Voulez-vous vraiment supprimer ces transactions ?",
  }

  confirmChangeStatusTransaction = {
    title: "Changer le status",
    description: "Voulez-vous vraiment changer le status de cette transaction ?",
  }
}
