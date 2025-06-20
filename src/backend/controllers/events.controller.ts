/* eslint-disable @typescript-eslint/no-explicit-any */
import EventsModel from "@/backend/models/events.model";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";
import { Slot } from "@/enums";

const eventsModel = new EventsModel();
const eventsController = {
  createEvent: async (req: Request) => {
    const body = await req.json();
    try {
      const event = await eventsModel.createEvent(body);
      if (!event) {
        return new Response(JSON.stringify({ error: 'Event creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: event }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Event creation failed: ${error}` }), { status: 400 });
    }
  },
  getEvents: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const sort = searchParams.get('sort') || 'desc';
    const slot = searchParams.get('slot') || '';
    const articleId = parseInt(searchParams.get('articleId') || '0', 10);
    const dateId = parseInt(searchParams.get('dateId') || '0', 10);
    const subscriptionId = parseInt(searchParams.get('subscriptionId') || '0', 10);

    const params = { take, status, page, orderBy, sort, slot: slot as Slot, articleId, dateId, subscriptionId };
    try {
      const events = await eventsModel.getEvents(params);
      return new Response(JSON.stringify({ data: events }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching events: ${error}` }), { status: 400 });
    }
  },
  getEvent: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const event = await eventsModel.getEvent(id);
      if (!event) {
        return new Response(JSON.stringify({ error: 'Event not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: event }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching event: ${error}` }), { status: 400 });
    }
  },
  patchEvent: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const { attr, val } = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!eventsModel.checkAttributeEvent(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const event = await eventsModel.patchEvent(id, {attr, val});
      if (!event) {
        return new Response(JSON.stringify({ error: 'Event not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: event }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateEvent: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const event = await eventsModel.updateEvent(id, body);
      if (!event) {
        return new Response(JSON.stringify({ error: 'Event not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: event }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteEvent: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const event = await eventsModel.deleteEvent(id);
      return new Response(JSON.stringify({ data: event }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteEvents: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const events = await eventsModel.deleteManyEvents(ids);
      if (!events) {
        return new Response(JSON.stringify({ error: 'Events not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: events }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default eventsController;
