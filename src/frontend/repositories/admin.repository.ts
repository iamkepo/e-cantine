import AdminsService from "@/frontend/services/admins.service";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IAdmin, IUser } from "@/core/interfaces";

export default class AdminRepository extends AdminsService {
  constructor() {
    super();
  }

  formCreateAdmin(users?: IUser[]) {
    return [
      { id: "firstname", type: "text", label: "Prénom", required: true, colSize: "col-12" },
      { id: "lastname", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users?.map((user: IUser) => ({ label: user.username, value: user.id })) },
    ]
  }

  formUpdateAdmin(admin: IAdmin, users?: IUser[]) {
    return [
      { id: "firstname", type: "text", label: "Prénom", required: true, colSize: "col-12", value: admin.firstname },
      { id: "lastname", type: "text", label: "Nom", required: true, colSize: "col-12", value: admin.lastname },
      { id: "userId", type: "select", label: "Utilisateur", required: true, colSize: "col-12", options: users?.map((user: IUser) => ({ label: user.username, value: user.id })), value: admin.userId },
    ]
  }

  formFilterAdmin() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadAdmin = [
    { key: 'firstname', label: 'Prénom' },
    { key: 'lastname', label: 'Nom' },
    { key: 'status', label: 'Status' }
  ]

  filterAdmin = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", sort:  "desc" }

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
    firstname: yup.string().required('Prénom est requis'),
    lastname: yup.string().required('Nom est requis'),
    status: yup.string().required('Status est requis'),
  })

  adminFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
