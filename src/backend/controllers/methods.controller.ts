/* eslint-disable @typescript-eslint/no-explicit-any */
import MethodsModel from "@/backend/models/methods.model";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";

const methodsModel = new MethodsModel();
const methodsController = {
  createMethod: async (req: Request) => {
    const body = await req.json();
    try {
      const method = await methodsModel.createMethod(body);
      if (!method) {
        return new Response(JSON.stringify({ error: 'Method creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: method }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Method creation failed: ${error}` }), { status: 400 });
    }
  },
  getMethods: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const sort = searchParams.get('sort') || 'desc';
    
    const params = { take, search, status, page, orderBy, sort };
    try {
      const methods = await methodsModel.getMethods(params);
      return new Response(JSON.stringify({ data: methods }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching methods: ${error}` }), { status: 400 });
    }
  },
  getMethod: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const method = await methodsModel.getMethod(id);
      if (!method) {
        return new Response(JSON.stringify({ error: 'Method not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: method }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching method: ${error}` }), { status: 400 });
    }
  },
  patchMethod: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!methodsModel.checkAttributeMethod(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const method = await methodsModel.patchMethod(id, {attr, val});
      if (!method) {
        return new Response(JSON.stringify({ error: 'Method not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: method }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateMethod: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const method = await methodsModel.updateMethod(id, body);
      if (!method) {
        return new Response(JSON.stringify({ error: 'Method not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: method }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteMethod: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const method = await methodsModel.deleteMethod(id);
      if (!method) {
        return new Response(JSON.stringify({ error: 'Method not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: method }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteMethods: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const methods = await methodsModel.deleteManyMethods(ids);
      if (!methods) {
        return new Response(JSON.stringify({ error: 'Methods not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: methods }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default methodsController;
