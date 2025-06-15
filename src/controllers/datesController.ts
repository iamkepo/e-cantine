/* eslint-disable @typescript-eslint/no-explicit-any */
import DatesModel from "@/models/datesModel";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";

const datesModel = new DatesModel();
const datesController = {
  createDate: async (req: Request) => {
    const body = await req.json();
    try {
      const date = await datesModel.createDate(body);
      if (!date) {
        return new Response(JSON.stringify({ error: 'Date creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: date }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Date creation failed: ${error}` }), { status: 400 });
    }
  },
  getDates: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const sort = searchParams.get('sort') || 'desc';
    const subscriptionId = parseInt(searchParams.get('subscriptionId') || '0', 10);
    const locationId = parseInt(searchParams.get('locationId') || '0', 10);
    
    const params = { take, search, status, page, orderBy, sort, subscriptionId, locationId };
    try {
      const dates = await datesModel.getDates(params);
      return new Response(JSON.stringify({ data: dates }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching dates: ${error}` }), { status: 400 });
    }
  },
  getDate: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const date = await datesModel.getDate(id);
      if (!date) {
        return new Response(JSON.stringify({ error: 'Date not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: date }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching date: ${error}` }), { status: 400 });
    }
  },
  patchDate: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const { attr, val } = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!datesModel.checkAttributeDate(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const date = await datesModel.patchDate(id, {attr, val});
      if (!date) {
        return new Response(JSON.stringify({ error: 'Date not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: date }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateDate: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const date = await datesModel.updateDate(id, body);
      if (!date) {
        return new Response(JSON.stringify({ error: 'Date not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: date }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteDate: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const date = await datesModel.deleteDate(id);
      if (!date) {
        return new Response(JSON.stringify({ error: 'Date not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: date }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteDates: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const dates = await datesModel.deleteManyDates(ids);
      if (!dates) {
        return new Response(JSON.stringify({ error: 'Dates not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: dates }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default datesController;
