/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import notificationsService from "@/services/notificationsService";
import Repository from "@/repositories/repository";
import * as yup from 'yup';
import { NotificationType, StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { INotification, IUser } from "@/core/interfaces";

export default class NotificationsRepository extends Repository<INotification> {
  constructor(setNotifications?: ({data, meta}: {data: INotification[], meta: Meta}) => void) {
    super(setNotifications as unknown as ({data, meta}: {data: INotification[], meta: Meta}) => void);
  }

  async fetchNotifications(params: ParamsQuery) {
    return this.fetchAll(() => notificationsService.fetchNotifications(params) as Promise<{data: INotification[], meta: Meta}>);
  }

  async fetchNotification(id: number) {
    return this.fetchOne(notificationsService.fetchNotification as (id: number) => Promise<INotification>, id);
  }

  async createNotification(payload: INotification) {
    return this.create(notificationsService.createNotification as (payload: INotification) => Promise<INotification>, payload);
  }

  async patchNotification(id: number, payload: {attr: string, val: any}) {
    return this.patch(notificationsService.patchNotification as (id: number, payload: {attr: string, val: any}) => Promise<INotification>, id, payload);
  }

  async updateNotification(id: number, payload: INotification) {
    return this.update(notificationsService.updateNotification as (id: number, payload: INotification) => Promise<INotification>, id, payload);
  }

  async deleteNotification(id: number) {
    return this.delete(notificationsService.deleteNotification as (id: number) => Promise<INotification>, id);
  }

  async deleteNotifications(ids: number[]) {
    return this.deleteList(notificationsService.deleteNotifications as (ids: number[]) => Promise<any>, ids);
  }

  formCreateNotification(users: IUser[]) {
    return [
      { id: "title", type: "text", label: "Titre", required: true, colSize: "col-12" },
      { id: "content", type: "textarea", label: "Contenu", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })) },
    ]
  }

  formUpdateNotification(notification: INotification, users: IUser[]) {
    return [
      { id: "message", type: "text", label: "Message", required: true, colSize: "col-12", value: notification.message },
      { id: "type", type: "select", label: "Type", required: true, colSize: "col-12", options: Object.values(NotificationType).map((type) => ({ label: type, value: type })), value: notification.type },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })), value: notification.userId },
    ]
  }

  formFilterNotification() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadNotification = [
    {label: 'Titre', key: 'title'},
    {label: 'Contenu', key: 'content'},
    {label: 'Utilisateur', key: 'userId'},
    {label: 'Status', key: 'status'}
  ]

  filterNotification = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

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
    description: "Voulez-vous vraiment changer le status de ce notification ?",
  }

  notificationSchema = yup.object({
    id: yup.number().optional(),
    title: yup.string().required('Titre est requis'),
    content: yup.string().required('Contenu est requis'),
    userId: yup.number().required('Utilisateur est requis'),
  })

  notificationFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
