/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, ParamsQuery } from "@/core/types";
import promosService from "@/services/promosService";
import Repository from "@/repositories/repository";
import * as yup from 'yup';
import { StatusActivation } from "@/enums";
import { statusRender } from "@/helpers/functions";
import { IPromo } from "@/core/interfaces";

export default class PromosRepository extends Repository<IPromo> {
  constructor(setPromos?: ({data, meta}: {data: IPromo[], meta: Meta}) => void) {
    super(setPromos as unknown as ({data, meta}: {data: IPromo[], meta: Meta}) => void);
  }

  async fetchPromos(params: ParamsQuery) {
    return this.fetchAll(() => promosService.fetchPromos(params) as Promise<{data: IPromo[], meta: Meta}>);
  }

  async fetchPromo(id: number) {
    return this.fetchOne(promosService.fetchPromo as (id: number) => Promise<IPromo>, id);
  }

  async createPromo(payload: IPromo) {
    return this.create(promosService.createPromo as (payload: IPromo) => Promise<IPromo>, payload);
  }

  async patchPromo(id: number, payload: {attr: string, val: any}) {
    return this.patch(promosService.patchPromo as (id: number, payload: {attr: string, val: any}) => Promise<IPromo>, id, payload);
  }

  async updatePromo(id: number, payload: IPromo) {
    return this.update(promosService.updatePromo as (id: number, payload: IPromo) => Promise<IPromo>, id, payload);
  }

  async deletePromo(id: number) {
    return this.delete(promosService.deletePromo as (id: number) => Promise<IPromo>, id);
  }

  async deletePromos(ids: number[]) {
    return this.deleteList(promosService.deletePromos as (ids: number[]) => Promise<any>, ids);
  }

  formCreatePromo() {
    return [
      { id: "code", type: "text", label: "Code", required: true, colSize: "col-12" },
      { id: "discount", type: "number", label: "Discount", required: true, colSize: "col-12" },
      { id: "maxUsage", type: "number", label: "Max Usage", required: true, colSize: "col-12" },
      { id: "startDate", type: "date", label: "Start Date", required: true, colSize: "col-12" },
      { id: "endDate", type: "date", label: "End Date", required: true, colSize: "col-12" },
    ]
  }

  formUpdatePromo(promo: IPromo) {
    return [
      { id: "code", type: "text", label: "Code", required: true, colSize: "col-12", value: promo.code },
      { id: "discount", type: "number", label: "Discount", required: true, colSize: "col-12", value: promo.discount },
      { id: "maxUsage", type: "number", label: "Max Usage", required: true, colSize: "col-12", value: promo.maxUsage },
      { id: "startDate", type: "date", label: "Start Date", required: true, colSize: "col-12", value: promo.startDate },
      { id: "endDate", type: "date", label: "End Date", required: true, colSize: "col-12", value: promo.endDate },
    ]
  }

  formFilterPromo() {
    return [
      { id: "search", type: "text", label: "Rechercher", colSize: "col-12 col-md-9" },
      { id: "status", type: "select", label: "Status", colSize: "col-12 col-md-3", options: Object.values(StatusActivation).map((status) => ({ label: statusRender(status), value: status })) },
    ]
  }

  tableHeadPromo = [
    {label: 'Code', key: 'code'},
    {label: 'Discount', key: 'discount'},
    {label: 'Max Usage', key: 'maxUsage'},
    {label: 'Start Date', key: 'startDate'},
    {label: 'End Date', key: 'endDate'},
    {label: 'Status', key: 'status'},
  ]

  filterPromo = { take: 10, status: "", page: 1, orderBy: "createdAt", order: "desc" }

  confirmDeletePromo = {
    title: "Supprimer la promo",
    description: "Voulez-vous vraiment supprimer la promo ?",
  }

  confirmDeletePromos = {
    title: "Supprimer les promos",
    description: "Voulez-vous vraiment supprimer les promos ?",
  }

  promoSchema = yup.object({
    id: yup.number().optional(),
    code: yup.string().required('Code est requis'),
    discount: yup.number().required('Discount est requis'),
    maxUsage: yup.number().required('Max Usage est requis'),
    startDate: yup.date().required('Start Date est requis'),
    endDate: yup.date().required('End Date est requis'),
  })

  promoFilterSchema = yup.object({
    search: yup.string().optional(),
    status: yup.string().optional(),
  })
}
