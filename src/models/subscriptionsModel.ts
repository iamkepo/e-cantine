/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";
import { ParamsQuery } from "@/core/types";

class SubscriptionsModel extends Model {
  constructor() {
    super(prisma.subscriptions);
  }

  createSubscription = async (credentials: any) => {
    const subscription = await this.create(credentials);
    return subscription;
  }

  getSubscriptions = async (params: ParamsQuery & {clientId?: number, transactionId?: number, startDate?: Date, endDate?: Date}) => {
    const where: any = {};
    if (params.clientId) {
      where.clientId = params.clientId;
    }
    if (params.transactionId) {
      where.transactionId = params.transactionId;
    }
    if (params.startDate) {
      where.startDate = params.startDate;
    }
    if (params.endDate) {
      where.endDate = params.endDate;
    }
    if (params.status) {
      where.status = params.status;
    }
    const subscriptionsList = await this.getAll(params, where);
    return subscriptionsList;
  }

  getSubscription = async (id: number) => {
    const subscription = await this.getOne('id', id);
    return subscription;
  }

  checkAttributeSubscription = (att: string) => {
    return this.checkAttribute(['startDate', 'endDate', 'weeks', 'checkedDays', 'status'], att);
  }

  patchSubscription = async (id: number, patch: {attr: string, val: any}) => {
    const subscription = await this.patch(id, patch);
    return subscription;
  }

  updateSubscription = async (id: number, credentials: any) => {
    const subscription = await this.update(id, credentials);
    return subscription;
  }

  deleteSubscription = async (id: number) => {
    const subscription = await this.delete(id);
    return subscription;
  }

  deleteManySubscriptions = async (ids: number[]) => {
    const subscriptions = await this.deleteMany(ids);
    return subscriptions;
  }
}

export default SubscriptionsModel;
