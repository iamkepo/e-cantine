/* eslint-disable @typescript-eslint/no-explicit-any */
import ClientsModel from "@/models/clientsModel";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";

const clientsModel = new ClientsModel();
const clientsController = {
  createClient: async (req: Request) => {
    const body = await req.json();
    try {
      const client = await clientsModel.createClient(body);
      if (!client) {
        return new Response(JSON.stringify({ error: 'Client creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: client }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Client creation failed: ${error}` }), { status: 400 });
    }
  },
  getClients: async (req: Request) => {
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
      const clients = await clientsModel.getClients(params);
      return new Response(JSON.stringify({ data: clients }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching clients: ${error}` }), { status: 400 });
    }
  },
  getClient: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const client = await clientsModel.getClient(id);
      if (!client) {
        return new Response(JSON.stringify({ error: 'Client not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: client }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching client: ${error}` }), { status: 400 });
    }
  },
  patchClient: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!clientsModel.checkAttributeClient(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const client = await clientsModel.patchClient(id, {attr, val});
      if (!client) {
        return new Response(JSON.stringify({ error: 'Client not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: client }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateClient: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const client = await clientsModel.updateClient(id, body);
      if (!client) {
        return new Response(JSON.stringify({ error: 'Client update failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: client }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteClient: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const client = await clientsModel.deleteClient(id);
      if (!client) {
        return new Response(JSON.stringify({ error: 'Client not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: client }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteClients: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const clients = await clientsModel.deleteManyClients(ids);
      if (!clients) {
        return new Response(JSON.stringify({ error: 'Clients not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: clients }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default clientsController;
