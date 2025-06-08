import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IUser } from "@/core/interfaces";
import UsersService from "@/services/usersService";
import { SetData } from "@/core/types";

class UserRepository extends UsersService {
  constructor(setUser: SetData<IUser>) {
    super(setUser);
  }

  // Table configuration
  tableHeadUser = [
    { id: 'name', label: 'Nom' },
    { id: 'status', label: 'Status' }
  ]

  // Filter configuration
  filterUser = {
    take: 10,
    search: "",
    status: "",
    page: 1,
    orderBy: "createdAt",
    order: "desc"
  }

  // Form methods
  formCreateUser() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "password", type: "password", label: "Mot de passe", required: true, colSize: "col-12" },
    ]
  }

  formUpdateUser(user: IUser) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: user.name },
      { id: "password", type: "password", label: "Mot de passe", required: true, colSize: "col-12", value: user.password },
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
    name: yup.string().required('Nom est requis'),
    password: yup.string().required('Mot de passe est requis'),
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