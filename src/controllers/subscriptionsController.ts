/* eslint-disable @typescript-eslint/no-explicit-any */
import { Params } from "@/core/types";
import SubscriptionsModel from "@/models/subscriptionsModel";
import { NextRequest } from "next/server";

const subscriptionsModel = new SubscriptionsModel();
const subscriptionsController = {
  createSubscription: async (req: Request) => {
    const body = await req.json();
    try {
      const subscription = await subscriptionsModel.createSubscription(body);
      if (!subscription) {
        return new Response(JSON.stringify({ error: 'Subscription creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: subscription }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Subscription creation failed: ${error}` }), { status: 400 });
    }
  },
  getSubscriptions: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const sort = searchParams.get('sort') || 'desc';
    const clientId = parseInt(searchParams.get('clientId') || '0', 10);
    const transactionId = parseInt(searchParams.get('transactionId') || '0', 10);

    const params = { take, search, status, page, orderBy, sort, clientId, transactionId };

    try {
      const subscriptions = await subscriptionsModel.getSubscriptions(params);
      return new Response(JSON.stringify({ data: subscriptions }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching subscriptions: ${error}` }), { status: 400 });
    }
  },
  getSubscription: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const subscription = await subscriptionsModel.getSubscription(id);
      if (!subscription) {
        return new Response(JSON.stringify({ error: 'Subscription not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: subscription }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching subscription: ${error}` }), { status: 400 });
    }
  },
  patchSubscription: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!subscriptionsModel.checkAttributeSubscription(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const subscription = await subscriptionsModel.patchSubscription(id, {attr, val});
      if (!subscription) {
        return new Response(JSON.stringify({ error: 'Subscription not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: subscription }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateSubscription: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const subscription = await subscriptionsModel.updateSubscription(id, body);
      if (!subscription) {
        return new Response(JSON.stringify({ error: 'Subscription not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: subscription }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteSubscription: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const subscription = await subscriptionsModel.deleteSubscription(id);
      if (!subscription) {
        return new Response(JSON.stringify({ error: 'Subscription not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: subscription }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteSubscriptions: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const subscriptions = await subscriptionsModel.deleteManySubscriptions(ids);
      if (!subscriptions) {
        return new Response(JSON.stringify({ error: 'Subscriptions not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: subscriptions }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default subscriptionsController;
