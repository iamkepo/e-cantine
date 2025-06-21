/* eslint-disable @typescript-eslint/no-explicit-any */
import PhonesModel from "@/backend/models/phones.model";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";

const phonesModel = new PhonesModel();
const phonesController = {
  createPhone: async (req: Request) => {
    const body = await req.json();
    try {
      const phone = await phonesModel.createPhone(body);
      if (!phone) {
        return new Response(JSON.stringify({ error: 'Phone creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: phone }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Phone creation failed: ${error}` }), { status: 400 });
    }
  },
  getPhones: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const sort = searchParams.get('sort') || 'desc';
    const clientId = parseInt(searchParams.get('clientId') || '0', 10);
    const zipCode = searchParams.get('zipCode') || '';
    const latitude = parseFloat(searchParams.get('latitude') || '0');
    const longitude = parseFloat(searchParams.get('longitude') || '0');

    const params = { take, search, status, page, orderBy, sort, clientId, zipCode, latitude, longitude };
    try {
      const phones = await phonesModel.getPhones(params);
      return new Response(JSON.stringify({ data: phones }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching phones: ${error}` }), { status: 400 });
    }
  },
  getPhone: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const phone = await phonesModel.getPhone(id);
      if (!phone) {
        return new Response(JSON.stringify({ error: 'Phone not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: phone }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching phone: ${error}` }), { status: 400 });
    }
  },
  patchPhone: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!phonesModel.checkAttributePhone(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const phone = await phonesModel.patchPhone(id, {attr, val});
      if (!phone) {
        return new Response(JSON.stringify({ error: 'Phone not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: phone }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updatePhone: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const phone = await phonesModel.updatePhone(id, body);
      if (!phone) {
        return new Response(JSON.stringify({ error: 'Phone not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: phone }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deletePhone: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const phone = await phonesModel.deletePhone(id);
      if (!phone) {
        return new Response(JSON.stringify({ error: 'Phone not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: phone }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deletePhones: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const phones = await phonesModel.deleteManyPhones(ids);
      if (!phones) {
        return new Response(JSON.stringify({ error: 'Phones not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: phones }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default phonesController;
