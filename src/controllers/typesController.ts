/* eslint-disable @typescript-eslint/no-explicit-any */

import { Params } from "@/core/types";
import TypesModel from "@/models/typesModel";
import { NextRequest } from "next/server";

const typesModel = new TypesModel();
const typesController = {
  createType: async (req: Request) => {
    const body = await req.json();
    try {
      const type = await typesModel.createType(body);
      if (!type) {
        return new Response(JSON.stringify({ error: 'Type creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({data: type}), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Type creation failed: ${error}` }), { status: 400 });
    }
  },

  getTypes: async (req: Request) => {  
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
  
    try {
      const types = await typesModel.getTypes({ take, search, status, page, orderBy, order });
      return new Response(JSON.stringify({data: types}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  getType: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const type = await typesModel.getType(id);
      return new Response(JSON.stringify({data: type}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  patchType: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {    
      if(!typesModel.checkAttributeType(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const type = await typesModel.patchType(id, {attr, val});
      if (!type) {
        return new Response(JSON.stringify({ error: 'Type not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: type}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  updateType: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      const type = await typesModel.updateType(id, body);
      if (!type) {
        return new Response(JSON.stringify({ error: 'Type not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: type}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteType: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const type = await typesModel.deleteType(id);
      if (!type) {
        return new Response(JSON.stringify({ error: 'Type delete failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({data: type}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteTypes: async (req: Request) => {
    const { ids } = await req.json();
    try {
      const types = await typesModel.deleteManyTypes(ids);
      if (!types) {
        return new Response(JSON.stringify({ error: 'Types not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: types}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
}

export default typesController;
