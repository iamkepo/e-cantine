/* eslint-disable @typescript-eslint/no-explicit-any */
import LocationsModel from "@/backend/models/locations.model";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";

const locationsModel = new LocationsModel();
const locationsController = {
  createLocation: async (req: Request) => {
    const body = await req.json();
    try {
      const location = await locationsModel.createLocation(body);
      if (!location) {
        return new Response(JSON.stringify({ error: 'Location creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: location }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Location creation failed: ${error}` }), { status: 400 });
    }
  },
  getLocations: async (req: Request) => {
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
      const locations = await locationsModel.getLocations(params);
      return new Response(JSON.stringify({ data: locations }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching locations: ${error}` }), { status: 400 });
    }
  },
  getLocation: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const location = await locationsModel.getLocation(id);
      if (!location) {
        return new Response(JSON.stringify({ error: 'Location not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: location }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching location: ${error}` }), { status: 400 });
    }
  },
  patchLocation: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!locationsModel.checkAttributeLocation(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const location = await locationsModel.patchLocation(id, {attr, val});
      if (!location) {
        return new Response(JSON.stringify({ error: 'Location not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: location }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateLocation: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const location = await locationsModel.updateLocation(id, body);
      if (!location) {
        return new Response(JSON.stringify({ error: 'Location not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: location }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteLocation: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const location = await locationsModel.deleteLocation(id);
      if (!location) {
        return new Response(JSON.stringify({ error: 'Location not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: location }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteLocations: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const locations = await locationsModel.deleteManyLocations(ids);
      if (!locations) {
        return new Response(JSON.stringify({ error: 'Locations not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: locations }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default locationsController;
