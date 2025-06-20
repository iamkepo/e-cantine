/* eslint-disable @typescript-eslint/no-explicit-any */
import CommandsModel from "@/backend/models/commands.model";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";

const commandsModel = new CommandsModel();
const commandsController = {
  createCommand: async (req: Request) => {
    const body = await req.json();
    try {
      const command = await commandsModel.createCommand(body);
      if (!command) {
        return new Response(JSON.stringify({ error: 'Command creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: command }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Command creation failed: ${error}` }), { status: 400 });
    }
  },
  getCommands: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const sort = searchParams.get('sort') || 'desc';
    const eventId = parseInt(searchParams.get('eventId') || '0', 10);
    const restaurantId = parseInt(searchParams.get('restaurantId') || '0', 10);
    
    const params = { take, status, page, orderBy, sort, eventId, restaurantId };
    try {
      const commands = await commandsModel.getCommands(params);
      return new Response(JSON.stringify({ data: commands }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching commands: ${error}` }), { status: 400 });
    }
  },
  getCommand: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const command = await commandsModel.getCommand(id);
      if (!command) {
        return new Response(JSON.stringify({ error: 'Command not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: command }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching command: ${error}` }), { status: 400 });
    }
  },
  patchCommand: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const { attr, val } = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!commandsModel.checkAttributeCommand(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const command = await commandsModel.patchCommand(id, {attr, val});
      if (!command) {
        return new Response(JSON.stringify({ error: 'Command not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: command }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateCommand: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const command = await commandsModel.updateCommand(id, body);
      if (!command) {
        return new Response(JSON.stringify({ error: 'Command not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: command }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteCommand: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const command = await commandsModel.deleteCommand(id);
      if (!command) {
        return new Response(JSON.stringify({ error: 'Command not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: command }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteCommands: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const commands = await commandsModel.deleteManyCommands(ids);
      if (!commands) {
        return new Response(JSON.stringify({ error: 'Commands not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: commands }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default commandsController;
