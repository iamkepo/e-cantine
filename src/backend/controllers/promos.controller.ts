/* eslint-disable @typescript-eslint/no-explicit-any */
import PromosModel from "@/backend/models/promos.model";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";


const promosModel = new PromosModel();
const promosController = {
  createPromo: async (req: Request) => {
    const body = await req.json();
    try {
      const promo = await promosModel.createPromo(body);
      if (!promo) {
        return new Response(JSON.stringify({ error: 'Promo creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: promo }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Promo creation failed: ${error}` }), { status: 400 });
    }
  },
  getPromos: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const sort = searchParams.get('sort') || 'desc';
    const discount = parseInt(searchParams.get('discount') || '0', 10);
    const maxUsage = parseInt(searchParams.get('maxUsage') || '0', 10);
    const countUsage = parseInt(searchParams.get('countUsage') || '0', 10);

    const params = { take, search, status, page, orderBy, sort, discount, maxUsage, countUsage };

    try {
      const promos = await promosModel.getPromos(params);
      return new Response(JSON.stringify({ data: promos }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching promos: ${error}` }), { status: 400 });
    }
  },
  getPromo: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const promo = await promosModel.getPromo(id);
      if (!promo) {
        return new Response(JSON.stringify({ error: 'Promo not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: promo }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching promo: ${error}` }), { status: 400 });
    }
  },
  patchPromo: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!promosModel.checkAttributePromo(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const promo = await promosModel.patchPromo(id, {attr, val});
      if (!promo) {
        return new Response(JSON.stringify({ error: 'Promo not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: promo }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updatePromo: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const promo = await promosModel.updatePromo(id, body);
      if (!promo) {
        return new Response(JSON.stringify({ error: 'Promo not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: promo}), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deletePromo: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const promo = await promosModel.deletePromo(id);
      if (!promo) {
        return new Response(JSON.stringify({ error: 'Promo not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: promo }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deletePromos: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const promos = await promosModel.deleteManyPromos(ids);
      if (!promos) {
        return new Response(JSON.stringify({ error: 'Promos not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: promos }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default promosController;
