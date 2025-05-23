/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import usersService from "@/services/usersService";
import * as yup from 'yup';
import Repository from "@/repositories/repository";
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IUser } from "@/core/interfaces";

class UserRepository extends Repository<IUser> {

  constructor(setUsers?: ({data, meta}: {data: IUser[], meta: Meta}) => void) {
    super(setUsers as unknown as ({data, meta}: {data: IUser[], meta: Meta}) => void);
  }

  async fetchUsers(params: ParamsQuery) {
    return this.fetchAll(() => usersService.fetchUsers(params) as Promise<{data: IUser[], meta: Meta}>);
  }

  async fetchUser(id: number) {
    return this.fetchOne(usersService.fetchUser as (id: number) => Promise<IUser>, id);
  }

  async createUser(payload: IUser) {
    return this.create(usersService.createUser as (payload: IUser) => Promise<IUser>, payload);
  }

  async changeStatusUser(id: number, status: string) {
    return this.patch(usersService.patchUser as (id: number, payload: {attr: string, val: any}) => Promise<IUser>, id, { attr: 'status', val: status });
  }

  async updateUser(id: number, payload: IUser) {
    return this.update(usersService.updateUser as (id: number, payload: IUser) => Promise<IUser>, id, payload);
  }

  async deleteUser(id: number) {
    return this.delete(usersService.deleteUser as (id: number) => Promise<IUser>, id);
  }

  async deleteUsers(ids: number[]) {
    return this.deleteList(usersService.deleteUsers as (ids: number[]) => Promise<IUser>, ids);
  }

  formCreateUser() {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12" },
    ]
  }

  formUpdateUser(user: IUser) {
    return [
      { id: "name", type: "text", label: "Nom", required: true, colSize: "col-12", value: user.name },
    ]
  }

  formFilterUser() {
    return [
      { id: "search", type: "text", placeholder: "Rechercher", colSize: "col-12 col-md-6" },
      { id: "status", type: "select", placeholder: "Status", colSize: "col-12 col-md-2", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadUser = [
    {label: 'Nom', key: 'name'},
    {label: 'Status', key: 'status'}
  ]

  filterUser = { take: 10, search: "", status: "", page: 1, orderBy: "createdAt", order: "desc" }

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
    description: "Voulez-vous vraiment changer le status de ce utilisateur ?",
  }

  userSchema = yup.object({
    id: yup.number().optional(),
    name: yup.string().required('Nom du utilisateur est requis'),
  })

  userFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}

export default UserRepository;