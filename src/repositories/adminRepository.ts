import AdminsService from "@/services/adminsService";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IAdmin, IUser } from "@/core/interfaces";
import { SetData } from "@/core/types";

export default class AdminRepository extends AdminsService {
  constructor(setAdmin: SetData<IAdmin>) {
    super(setAdmin);
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
