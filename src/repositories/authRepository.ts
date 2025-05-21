import { IUser } from "@/core/interfaces";
import authService from "@/services/authService";
import Repository from "@/repositories/repository";
import { Meta } from "@/core/types";

class AuthRepository extends Repository<IUser> {

  constructor(setUsers?: ({data, meta}: {data: IUser[], meta: Meta}) => void) {
    super(setUsers as unknown as ({data, meta}: {data: IUser[], meta: Meta}) => void);
  }

  async login(payload: { email: string, password: string }) {
    return authService.login(payload);
  }

  async register(payload: { name: string, phone: string, password: string, confirmPassword: string }) {
    return authService.register(payload);
  }

  async fetchCurrentUser() {
    return authService.fetchCurrentUser();
  }

  async logout() {
    // return authService.logout();
  }

  formLogin() {
    return [
      { id: "email", type: "email", label: "Email", required: true, colSize: "col-12" },
      { id: "password", type: "password", label: "Mot de passe", required: true, colSize: "col-12" },
    ]
  }

  formRegister() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12" },
      { id: "password", type: "password", label: "Mot de passe", required: true, colSize: "col-12" },
      { id: "confirmPassword", type: "password", label: "Confirmer le mot de passe", required: true, colSize: "col-12" },
    ]
  }

  formCodeConfirm() {
    return [
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12" },
      { id: "code", type: "text", label: "Code", required: true, colSize: "col-12" },
    ]
  }
  formResetPassword() {
    return [
      { id: "oldPassword", type: "password", label: "Ancien mot de passe", required: true, colSize: "col-12" },
      { id: "password", type: "password", label: "Nouveau mot de passe", required: true, colSize: "col-12" },
      { id: "confirmPassword", type: "password", label: "Confirmer le mot de passe", required: true, colSize: "col-12" },
    ]
  }
}

export default AuthRepository;