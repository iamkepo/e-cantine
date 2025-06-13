import * as yup from "yup";
import AuthService from "@/services/authService";

class AuthRepository extends AuthService {
  constructor() {
    super();
  }

  // Form methods
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

  formForgotPassword() {
    return [
      { id: "phone", type: "text", label: "Téléphone", required: true, colSize: "col-12" },
    ]
  }

  formChangePassword() {
    return [
      { id: "password", type: "password", label: "Mot de passe", required: true, colSize: "col-12" },
      { id: "confirmPassword", type: "password", label: "Confirmer le mot de passe", required: true, colSize: "col-12" },
    ]
  }

  // Validation schemas
  loginSchema = yup.object({
    email: yup.string().email('Email invalide').required('Email est requis'),
    password: yup.string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .required('Mot de passe est requis'),
  })

  registerSchema = yup.object({
    name: yup.string().required('Nom est requis'),
    phone: yup.string().required('Téléphone est requis'),
    password: yup.string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .required('Mot de passe est requis'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre')
      .required('Confirmer le mot de passe est requis'),
  })

  codeConfirmSchema = yup.object({
    phone: yup.string().required('Téléphone est requis'),
    code: yup.string().required('Code est requis'),
  })

  resetPasswordSchema = yup.object({
    oldPassword: yup.string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .required('Ancien mot de passe est requis'),
    password: yup.string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .required('Nouveau mot de passe est requis'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre')
      .required('Confirmer le mot de passe est requis'),
  })

  forgotPasswordSchema = yup.object({
    phone: yup.string().required('Téléphone est requis'),
  })

  changePasswordSchema = yup.object({
    password: yup.string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .required('Mot de passe est requis'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre')
      .required('Confirmer le mot de passe est requis'),
  })

  // Confirmation dialogs
  confirmLogout = {
    title: "Déconnexion",
    description: "Voulez-vous vraiment vous déconnecter ?",
  }

  confirmDeleteAccount = {
    title: "Supprimer le compte",
    description: "Voulez-vous vraiment supprimer votre compte ?",
  }

  confirmChangePassword = {
    title: "Changer le mot de passe",
    description: "Voulez-vous vraiment changer votre mot de passe ?",
  }

  confirmResetPassword = {
    title: "Réinitialiser le mot de passe",
    description: "Voulez-vous vraiment réinitialiser votre mot de passe ?",
  }

  confirmForgotPassword = {
    title: "Mot de passe oublié",
    description: "Voulez-vous vraiment réinitialiser votre mot de passe ?",
  }
}

export default AuthRepository;