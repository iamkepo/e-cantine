/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminsModel from "@/backend/models/admins.model";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";

const adminsModel = new AdminsModel();
const adminsController = {
  createAdmin: async (req: Request) => {
    const body = await req.json();
    try {
      const admin = await adminsModel.createAdmin(body);
      if (!admin) {
        return new Response(JSON.stringify({ error: 'Admin creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: admin }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Admin creation failed: ${error}` }), { status: 400 });
    }
  },
  getAdmins: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const sort = searchParams.get('sort') || 'desc';
    const userId = parseInt(searchParams.get('userId') || '0', 10);

    const params = { take, search, status, page, orderBy, sort, userId };

    try {
      const admins = await adminsModel.getAdmins(params);
      return new Response(JSON.stringify({ data: admins }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching admins: ${error}` }), { status: 400 });
    }
  },
  getAdmin: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const admin = await adminsModel.getAdmin(id);
      if (!admin) {
        return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: admin }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching admin: ${error}` }), { status: 400 });
    }
  },
  patchAdmin: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!adminsModel.checkAttributeAdmin(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const admin = await adminsModel.patchAdmin(id, {attr, val});
      if (!admin) {
        return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: admin }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateAdmin: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const admin = await adminsModel.updateAdmin(id, body);
      if (!admin) {
        return new Response(JSON.stringify({ error: 'Admin update failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: admin }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteAdmin: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const admin = await adminsModel.deleteAdmin(id);
      if (!admin) {
        return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: admin }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteAdmins: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const admins = await adminsModel.deleteManyAdmins(ids);
      if (!admins) {
        return new Response(JSON.stringify({ error: 'Admins not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: admins }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default adminsController;
