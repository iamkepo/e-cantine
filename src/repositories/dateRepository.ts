import DatesService from "@/services/datesService";
import { IDate, ILocation, ISubscription } from "@/core/interfaces";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { RequestState, RequestType, SetData } from "@/core/types";

export default class DateRepository extends DatesService {
  constructor(dates: {state: Record<RequestType, RequestState<IDate>>, handleData: SetData<IDate>}) {
    super(dates.handleData);
  }

  // Table configuration
  tableHeadDate = [
    { id: 'deliveryDate', label: 'Date de livraison' },
    { id: 'subscriptionId', label: 'Abonnement' },
    { id: 'locationId', label: 'Lieu' },
    { id: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterDate = {
    take: 10,
    search: "",
    subscriptionId: 0,
    locationId: 0,
    status: "",
    page: 1,
    orderBy: "createdAt",
    order: "desc"
  }

  // Form methods
  formCreateDate(subscriptions: ISubscription[], locations: ILocation[]) {
    return [
      { id: "deliveryDate", type: "date", label: "Date de livraison", required: true, colSize: "col-12" },
      { id: "subscriptionId", type: "select", label: "Abonnement", required: true, colSize: "col-12",
        options: subscriptions.map((subscription: ISubscription) => ({
          label: subscription.clientId,
          value: subscription.id
        }))
      },
      { id: "locationId", type: "select", label: "Lieu", required: true, colSize: "col-12",
        options: locations.map((location: ILocation) => ({
          label: location.address,
          value: location.id
        }))
      },
    ]
  }

  formUpdateDate(date: IDate, subscriptions: ISubscription[], locations: ILocation[]) {
    return [
      { id: "deliveryDate", type: "date", label: "Date de livraison", required: true, colSize: "col-12", value: date.deliveryDate },
      { id: "subscriptionId", type: "select", label: "Abonnement", required: true, colSize: "col-12",
        options: subscriptions.map((subscription: ISubscription) => ({
          label: subscription.clientId,
          value: subscription.id
        })),
        value: date.subscriptionId
      },
      { id: "locationId", type: "select", label: "Lieu", required: true, colSize: "col-12",
        options: locations.map((location: ILocation) => ({
          label: location.address,
          value: location.id
        })),
        value: date.locationId
      },
    ]
  }

  formFilterDate(subscriptions: ISubscription[], locations: ILocation[]) {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "subscriptionId", type: "select", placeholder: "Abonnement", colSize: "col-12 col-md-2",
        options: subscriptions.map((subscription: ISubscription) => ({
          label: subscription.clientId,
          value: subscription.id
        }))
      },
      { id: "locationId", type: "select", placeholder: "Lieu", colSize: "col-12 col-md-2",
        options: locations.map((location: ILocation) => ({
          label: location.address,
          value: location.id
        }))
      },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2",
        options: Object.values(StatusActivation).map((status) => ({
          label: statusRender(status),
          value: status
        }))
      },
    ]
  }

  // Validation schemas
  dateSchema = yup.object({
    id: yup.number().optional(),
    deliveryDate: yup.date().required('Date de livraison est requise'),
    subscriptionId: yup.number().required('Abonnement est requis'),
    locationId: yup.number().required('Lieu est requis'),
    status: yup.string().required('Status est requis'),
  })

  schemaFilterDate = yup.object({
    search: yup.string().optional(),
    subscriptionId: yup.number().optional(),
    locationId: yup.number().optional(),
    status: yup.string().optional(),
  })

  // Confirmation dialogs
  confirmDeleteDate = {
    title: "Supprimer la date",
    description: "Voulez-vous vraiment supprimer la date ?",
  }

  confirmDeleteDates = {
    title: "Supprimer les dates",
    description: "Voulez-vous vraiment supprimer les dates ?",
  }

  confirmChangeStatusDate = {
    title: "Changer le status",
    description: "Voulez-vous vraiment changer le status de ce date ?",
  }
}
