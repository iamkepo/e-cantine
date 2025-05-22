/* eslint-disable @typescript-eslint/no-explicit-any */
import DeliveriesModel from "@/models/deliveriesModel";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";

const deliveriesModel = new DeliveriesModel();
const deliveriesController = {
  createDelivery: async (req: Request) => {
    const body = await req.json();
    try {
      const delivery = await deliveriesModel.createDelivery(body);
      if (!delivery) {
        return new Response(JSON.stringify({ error: 'Delivery creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: delivery }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delivery creation failed: ${error}` }), { status: 400 });
    }
  },
  getDeliveries: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const commandId = parseInt(searchParams.get('commandId') || '0', 10);
    const delivererId = parseInt(searchParams.get('delivererId') || '0', 10);
    
    const params = { take, status, page, orderBy, order, commandId, delivererId };
    try {
      const deliveries = await deliveriesModel.getDeliveries(params);
      return new Response(JSON.stringify({ data: deliveries }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching deliveries: ${error}` }), { status: 400 });
    }
  },
  getDelivery: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const delivery = await deliveriesModel.getDelivery(id);
      if (!delivery) {
        return new Response(JSON.stringify({ error: 'Delivery not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: delivery }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching delivery: ${error}` }), { status: 400 });
    }
  },
  patchDelivery: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const { attr, val } = await req.json();
    try {
      if(!deliveriesModel.checkAttributeDelivery(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const delivery = await deliveriesModel.patchDelivery(id, {attr, val});
      if (!delivery) {
        return new Response(JSON.stringify({ error: 'Delivery not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: delivery }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateDelivery: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      const delivery = await deliveriesModel.updateDelivery(id, body);
      return new Response(JSON.stringify({ data: delivery }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteDelivery: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const delivery = await deliveriesModel.deleteDelivery(id);
      return new Response(JSON.stringify({ data: delivery }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteDeliveries: async (req: Request) => {
    const body = await req.json();
    const { ids } = body;
    try {
      const deliveries = await deliveriesModel.deleteManyDeliveries(ids);
      if (!deliveries) {
        return new Response(JSON.stringify({ error: 'Deliveries not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: deliveries }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default deliveriesController;
