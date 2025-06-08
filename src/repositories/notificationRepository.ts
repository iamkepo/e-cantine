import * as yup from 'yup';
import { NotificationType, StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { INotification, IUser } from "@/core/interfaces";
import NotificationsService from '@/services/notificationsService';
import { SetData } from "@/core/types";

export default class NotificationsRepository extends NotificationsService {
  constructor(setNotification: SetData<INotification>) {
    super(setNotification);
  }

  formCreateNotification(users: IUser[]) {
    return [
      { id: "message", type: "text", label: "Message", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })) },
      { id: "type", type: "select", label: "Type", required: true, colSize: "col-12", options: Object.values(NotificationType).map(type => ({ label: type, value: type })) },
      { id: "seen", type: "checkbox", label: "Vu", required: true, colSize: "col-12" },
    ]
  }

  formUpdateNotification(notification: INotification, users: IUser[]) {
    return [
      { id: "message", type: "text", label: "Message", required: true, colSize: "col-12", value: notification.message },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })), value: notification.userId },
      { id: "type", type: "select", label: "Type", required: true, colSize: "col-12", options: Object.values(NotificationType).map(type => ({ label: type, value: type })), value: notification.type },
      { id: "seen", type: "checkbox", label: "Vu", required: true, colSize: "col-12", value: notification.seen },
    ]
  }

  formFilterNotification() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
      { id: "type", type: "select", placeholder: "Type", colSize: "col-12 col-md-2", options: Object.values(NotificationType).map(type => ({ label: type, value: type })) },
      { id: "seen", type: "select", placeholder: "Vu", colSize: "col-12 col-md-2", options: [{ label: "Oui", value: true }, { label: "Non", value: false }] },
    ]
  }

  tableHeadNotification = [
    {label: 'Message', key: 'message'},
    {label: 'Type', key: 'type'},
    {label: 'Utilisateur', key: 'userId'},
    {label: 'Status', key: 'status'},
    {label: 'Vu', key: 'seen'},
  ]

  filterNotification = { take: 10, search: "", status: "", type: "", seen: null, page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteNotification = {
    title: "Supprimer la notification", 
    description: "Voulez-vous vraiment supprimer la notification ?",
  }

  confirmDeleteNotifications = {
    title: "Supprimer les notifications", 
    description: "Voulez-vous vraiment supprimer les notifications ?",
  }

  confirmChangeStatusNotification = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de la notification ?",
  }

  notificationSchema = yup.object({
    id: yup.number().optional(),
    message: yup.string().required('Message est requis'),
    userId: yup.number().required('Utilisateur est requis'),
    type: yup.string().required('Type est requis').oneOf(Object.values(NotificationType)),
    seen: yup.boolean().required('Vu est requis'),
    status: yup.string().optional(),
  })

  notificationFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
    type: yup.string().optional(),
    seen: yup.boolean().optional(),
  })
}
