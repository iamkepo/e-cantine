/* eslint-disable @typescript-eslint/no-explicit-any */
import { Params } from "@/core/types";
import TransactionsModel from "@/models/transactionsModel";
import { NextRequest } from "next/server";

const transactionsModel = new TransactionsModel();
const transactionsController = {
  createTransaction: async (req: Request) => {
    const body = await req.json();
    try {
      const transaction = await transactionsModel.createTransaction(body);
      if (!transaction) {
        return new Response(JSON.stringify({ error: 'Transaction creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: transaction }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Transaction creation failed: ${error}` }), { status: 400 });
    }
  },
  getTransactions: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const sort = searchParams.get('sort') || 'desc';
    const subscriptionId = parseInt(searchParams.get('subscriptionId') || '0', 10);
    const promoId = parseInt(searchParams.get('promoId') || '0', 10);
    const methodId = parseInt(searchParams.get('methodId') || '0', 10);

    const params = { take, search, status, page, orderBy, sort, subscriptionId, promoId, methodId };

    try {
      const transactions = await transactionsModel.getTransactions(params);
      return new Response(JSON.stringify({ data: transactions }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching transactions: ${error}` }), { status: 400 });
    }
  },
  getTransaction: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const transaction = await transactionsModel.getTransaction(id);
      if (!transaction) {
        return new Response(JSON.stringify({ error: 'Transaction not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: transaction }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching transaction: ${error}` }), { status: 400 });
    }
  },
  patchTransaction: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!transactionsModel.checkAttributeTransaction(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const transaction = await transactionsModel.patchTransaction(id, {attr, val});
      if (!transaction) {
        return new Response(JSON.stringify({ error: 'Transaction not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: transaction }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateTransaction: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const transaction = await transactionsModel.updateTransaction(id, body);
      if (!transaction) {
        return new Response(JSON.stringify({ error: 'Transaction not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: transaction }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteTransaction: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const transaction = await transactionsModel.deleteTransaction(id);
      if (!transaction) {
        return new Response(JSON.stringify({ error: 'Transaction not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: transaction }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteTransactions: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const transactions = await transactionsModel.deleteManyTransactions(ids);
      if (!transactions) {
        return new Response(JSON.stringify({ error: 'Transactions not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: transactions }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default transactionsController;
