/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import adminsService from "@/services/adminsService";
import Repository from "@/repositories/repository";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IAdmin, IUser } from "@/core/interfaces";

export default class AdminRepository extends Repository<IAdmin> {
  constructor(setAdmins?: ({data, meta}: {data: IAdmin[], meta: Meta}) => void) {
    super(setAdmins as unknown as ({data, meta}: {data: IAdmin[], meta: Meta}) => void);
  }

  async fetchAdmins(params: ParamsQuery) {
    return this.fetchAll(() => adminsService.fetchAdmins(params) as Promise<{data: IAdmin[], meta: Meta}>);
  }

  async fetchAdmin(id: number) {
    return this.fetchOne(adminsService.fetchAdmin as (id: number) => Promise<IAdmin>, id);
  }

  async createAdmin(payload: IAdmin) {
    return this.create(adminsService.createAdmin as (payload: IAdmin) => Promise<IAdmin>, payload);
  }

  async patchAdmin(id: number, payload: {attr: string, val: any}) {
    return this.patch(adminsService.patchAdmin as (id: number, payload: {attr: string, val: any}) => Promise<IAdmin>, id, payload);
  }

  async updateAdmin(id: number, payload: IAdmin) {
    return this.update(adminsService.updateAdmin as (id: number, payload: IAdmin) => Promise<IAdmin>, id, payload);
  }

  async deleteAdmin(id: number) {
    return this.delete(adminsService.deleteAdmin as (id: number) => Promise<IAdmin>, id);
  }

  async deleteAdmins(ids: number[]) {
    return this.deleteList(adminsService.deleteAdmins as (ids: number[]) => Promise<any>, ids);
  }

  formCreateAdmin(users: IUser[]) {
    return [
      { id: "email", type: "email", label: "Email", required: true, colSize: "col-12" },
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "password", type: "password", label: "Mot de passe", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })) },
    ]
  }

  formUpdateAdmin(admin: IAdmin, users: IUser[]) {
    return [
      { id: "email", type: "email", label: "Email", required: true, colSize: "col-12", value: admin.email },
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: admin.name },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users.map((user: IUser) => ({ label: user.name, value: user.id })), value: admin.userId },
    ]
  }

  formFilterAdmin() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadAdmin = [
    {label: 'Nom', key: 'name'},
    {label: 'Email', key: 'email'},
    {label: 'Status', key: 'status'}
  ]

  filterAdmin = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeleteAdmin = {
    title: "Supprimer l'admin", 
    description: "Voulez-vous vraiment supprimer l'admin ?",
  }

  confirmDeleteAdmins = {
    title: "Supprimer les admins", 
    description: "Voulez-vous vraiment supprimer les admins ?",
  }

  confirmChangeStatusAdmin = {
    title: "Changer le status", 
    description: "Voulez-vous vraiment changer le status de ce admin ?",
  }

  adminSchema = yup.object({
    id: yup.number().optional(),
    email: yup.string().required('Email est requis'),
    name: yup.string().required('Nom est requis'),
    password: yup.string().required('Mot de passe est requis'),
    status: yup.string().required('Status est requis'),
  })

  adminFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
