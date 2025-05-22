/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";
import { ParamsQuery } from "@/core/types";

class TransactionsModel extends Model {
  constructor() {
    super(prisma.transactions);
  }

  createTransaction = async (credentials: any) => {
    const transaction = await this.create(credentials);
    return transaction;
  }

  getTransactions = async (params: ParamsQuery & { promoId?: number, subscriptionId?: number, methodId?: number }) => {
    const where: any = {};
    if (params.status) {
      where.status = params.status;
    }
    if (params.promoId) {
      where.promoId = params.promoId;
    }
    if (params.subscriptionId) {
      where.subscriptionId = params.subscriptionId;
    }
    if (params.methodId) {
      where.methodId = params.methodId;
    }
    const transactionsList = await this.getAll(params, where);
    return transactionsList;
  }

  getTransaction = async (id: number) => {
    const transaction = await this.getOne('id', id);
    return transaction;
  }

  checkAttributeTransaction = (att: string) => {
    return this.checkAttribute(['promoId', 'subscriptionId', 'methodId', 'status'], att);
  }

  patchTransaction = async (id: number, patch: {attr: string, val: any}) => {
    const transaction = await this.patch(id, patch);
    return transaction;
  }

  updateTransaction = async (id: number, credentials: any) => {
    const transaction = await this.update(id, credentials);
    return transaction;
  }

  deleteTransaction = async (id: number) => {
    const transaction = await this.delete(id);
    return transaction;
  }

  deleteManyTransactions = async (ids: number[]) => {
    const transactions = await this.deleteMany(ids);
    return transactions;
  }
}

export default TransactionsModel;
