/* eslint-disable @typescript-eslint/no-explicit-any */
import DeliverersModel from "@/models/deliverersModel";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";

const deliverersModel = new DeliverersModel();
const deliverersController = {
  createDeliverer: async (req: Request) => {
    const body = await req.json();
    try {
      const deliverer = await deliverersModel.createDeliverer(body);
      if (!deliverer) {
        return new Response(JSON.stringify({ error: 'Deliverer creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: deliverer }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Deliverer creation failed: ${error}` }), { status: 400 });
    }
  },
  getDeliverers: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const userId = parseInt(searchParams.get('userId') || '0', 10);
    
    const params = { take, search, status, page, orderBy, order, userId };
    try {
      const deliverers = await deliverersModel.getDeliverers(params);
      return new Response(JSON.stringify({ data: deliverers }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching deliverers: ${error}` }), { status: 400 });
    }
  },
  getDeliverer: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const deliverer = await deliverersModel.getDeliverer(id);
      if (!deliverer) {
        return new Response(JSON.stringify({ error: 'Deliverer not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: deliverer }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching deliverer: ${error}` }), { status: 400 });
    }
  },
  patchDeliverer: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const { attr, val } = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!deliverersModel.checkAttributeDeliverer(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const deliverer = await deliverersModel.patchDeliverer(id, {attr, val});
      if (!deliverer) {
        return new Response(JSON.stringify({ error: 'Deliverer not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: deliverer }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateDeliverer: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const deliverer = await deliverersModel.updateDeliverer(id, body);
      if (!deliverer) {
        return new Response(JSON.stringify({ error: 'Deliverer not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: deliverer }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteDeliverer: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const deliverer = await deliverersModel.deleteDeliverer(id);
      return new Response(JSON.stringify({ data: deliverer }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteDeliverers: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const deliverers = await deliverersModel.deleteManyDeliverers(ids);
      if (!deliverers) {
        return new Response(JSON.stringify({ error: 'Deliverers not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: deliverers }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default deliverersController;
