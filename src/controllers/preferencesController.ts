/* eslint-disable @typescript-eslint/no-explicit-any */
import PreferencesModel from "@/models/preferencesModel";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";

const preferencesModel = new PreferencesModel();
const preferencesController = {
  createPreference: async (req: Request) => {
    const body = await req.json();
    try {
      const preference = await preferencesModel.createPreference(body);
      if (!preference) {
        return new Response(JSON.stringify({ error: 'Preference creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: preference }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Preference creation failed: ${error}` }), { status: 400 });
    }
  },
  getPreferences: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const clientId = parseInt(searchParams.get('clientId') || '0', 10);
    const articleId = parseInt(searchParams.get('articleId') || '0', 10);

    const params = { take, status, page, orderBy, order, clientId, articleId };

    try {
      const preferences = await preferencesModel.getPreferences(params);
      return new Response(JSON.stringify({ data: preferences }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching preferences: ${error}` }), { status: 400 });
    }
  },
  getPreference: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const preference = await preferencesModel.getPreference(id);
      if (!preference) {
        return new Response(JSON.stringify({ error: 'Preference not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: preference }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching preference: ${error}` }), { status: 400 });
    }
  },
  patchPreference: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!preferencesModel.checkAttributePreference(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const preference = await preferencesModel.patchPreference(id, {attr, val});
      if (!preference) {
        return new Response(JSON.stringify({ error: 'Preference not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: preference }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updatePreference: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      const preference = await preferencesModel.updatePreference(id, body);
      if (!preference) {
        return new Response(JSON.stringify({ error: 'Preference not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: preference }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deletePreference: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const preference = await preferencesModel.deletePreference(id);
      if (!preference) {
        return new Response(JSON.stringify({ error: 'Preference not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: preference }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deletePreferences: async (req: Request) => {
    const body = await req.json();
    const { ids } = body;
    try {
      const preferences = await preferencesModel.deleteManyPreferences(ids);
      if (!preferences) {
        return new Response(JSON.stringify({ error: 'Preferences not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: preferences }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default preferencesController;
