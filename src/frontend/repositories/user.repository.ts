import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IUser } from "@/core/interfaces";
import UsersService from "@/frontend/services/users.service";

class UserRepository extends UsersService {
  constructor() {
    super();
  }

  // Table configuration
  tableHeadUser = [
    { id: 'username', label: 'Nom d\'utilisateur' },
    { id: 'email', label: 'Email' },
    { id: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterUser = {
    take: 10,
    search: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    sort:  "desc"
  }

  // Form methods
  formCreateUser() {
    return [
      { id: "username", type: "text", label: "Nom d'utilisateur", required: true, colSize: "col-12" },
      { id: "email", type: "email", label: "Email", required: true, colSize: "col-12" },
    ]
  }

  formUpdateUser(user: IUser) {
    return [
      { id: "username", type: "text", label: "Nom d'utilisateur", required: true, colSize: "col-12", value: user.username },
      { id: "email", type: "email", label: "Email", required: true, colSize: "col-12", value: user.email },
    ]
  }

  formFilterUser() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-3", 
        options: Object.values(StatusActivation).map((status) => ({ 
          label: statusRender(status), 
          value: status 
        }))
      },
    ]
  }

  // Validation schemas
  userSchema = yup.object({
    id: yup.number().optional(),
    username: yup.string().required('Nom d\'utilisateur est requis'),
    email: yup.string().required('Email est requis'),
    status: yup.string().optional(),
  })

  userFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })

  // Confirmation dialogs
  confirmDeleteUser = {
    title: "Supprimer l'utilisateur",
    description: "Voulez-vous vraiment supprimer l'utilisateur ?",
  }

  confirmDeleteUsers = {
    title: "Supprimer les utilisateurs",
    description: "Voulez-vous vraiment supprimer les utilisateurs ?",
  }

  confirmChangeStatusUser = {
    title: "Changer le status",
    description: "Voulez-vous vraiment changer le status de l'utilisateur ?",
  }
}

export default UserRepository;