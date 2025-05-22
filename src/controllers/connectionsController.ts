/* eslint-disable @typescript-eslint/no-explicit-any */

import { Params } from "@/core/types";
import ConnectionsModel from "@/models/connectionsModel";
import { NextRequest } from "next/server";

const connectionsModel = new ConnectionsModel();
const connectionsController = {
  createConnection: async (req: Request) => {
    const body = await req.json();
    try {
      const connection = await connectionsModel.createConnection(body);
      if (!connection) {
        return new Response(JSON.stringify({ error: 'Connection not created' }), { status: 400 });
      }
      return new Response(JSON.stringify({data: connection}), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Connection creation failed: ${error}` }), { status: 400 });
    }
  },

  getConnections: async (req: Request) => {  
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const articleId = parseInt(searchParams.get('articleId') || '0', 10);
    const tagId = parseInt(searchParams.get('tagId') || '0', 10);
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
  
    try {
      const connections = await connectionsModel.getConnections({ take, articleId, tagId, status, page, orderBy, order });
      if (!connections) {
        return new Response(JSON.stringify({ error: 'Connections not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: connections}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  getConnection: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const connection = await connectionsModel.getConnection(id);
      if (!connection) {
        return new Response(JSON.stringify({ error: 'Connection not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: connection}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  patchConnection: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!connectionsModel.checkAttributeConnection(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const connection = await connectionsModel.patchConnection(id, {attr, val});
      if (!connection) {
        return new Response(JSON.stringify({ error: 'Connection not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: connection}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  updateConnection: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const connection = await connectionsModel.updateConnection(id, body);
      if (!connection) {
        return new Response(JSON.stringify({ error: 'Connection not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: connection}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteConnection: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const connection = await connectionsModel.deleteConnection(id);
      if (!connection) {
        return new Response(JSON.stringify({ error: 'Connection not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: connection}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteConnections: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const connections = await connectionsModel.deleteManyConnections(ids);
      if (!connections) {
        return new Response(JSON.stringify({ error: 'Connections not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: connections}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
}

export default connectionsController;
