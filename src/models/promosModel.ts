/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";
import { ParamsQuery } from "@/core/types";

class PromosModel extends Model {
  constructor() {
    super(prisma.promos);
  }

  createPromo = async (credentials: any) => {
    const promo = await this.create(credentials);
    return promo;
  }

  getPromos = async (params: ParamsQuery & {discount?: number, maxUsage?: number, countUsage?: number}) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { code: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.discount) {
      where.discount = params.discount;
    }
    if (params.maxUsage) {
      where.maxUsage = params.maxUsage;
    }
    if (params.countUsage) {
      where.countUsage = params.countUsage;
    }
    if (params.status) {
      where.status = params.status;
    }
    const promosList = await this.getAll(params, where);
    return promosList;
  }

  getPromo = async (id: number) => {
    const promo = await this.getOne('id', id);
    return promo;
  }

  checkAttributePromo = (att: string) => {
    return this.checkAttribute(['code', 'discount', 'maxUsage', 'countUsage', 'status'], att);
  }

  patchPromo = async (id: number, patch: {attr: string, val: any}) => {
    const promo = await this.patch(id, patch);
    return promo;
  }

  updatePromo = async (id: number, credentials: any) => {
    const promo = await this.update(id, credentials);
    return promo;
  }

  deletePromo = async (id: number) => {
    const promo = await this.delete(id);
    return promo;
  }

  deleteManyPromos = async (ids: number[]) => {
    const promos = await this.deleteMany(ids);
    return promos;
  }
}

export default PromosModel;
