/* eslint-disable @typescript-eslint/no-explicit-any */
import NotificationsModel from "@/models/notificationsModel";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";
import { NotificationType } from "@/enums";

const notificationsModel = new NotificationsModel();
const notificationsController = {
  createNotification: async (req: Request) => {
    const body = await req.json();
    try {
      const notification = await notificationsModel.createNotification(body);
      if (!notification) {
        return new Response(JSON.stringify({ error: 'Notification creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: notification }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Notification creation failed: ${error}` }), { status: 400 });
    }
  },

  getNotifications: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const userId = parseInt(searchParams.get('userId') || '0', 10);
    const type = searchParams.get('type') || '';
    const seen = searchParams.get('seen') === 'true' ? true : false;
    const notificationType = type as NotificationType;

    const params = { take, search, status, page, orderBy, order, userId, type: notificationType, seen };

    try {
      const notifications = await notificationsModel.getNotifications(params);
      return new Response(JSON.stringify({ data: notifications }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching notifications: ${error}` }), { status: 400 });
    }
  },

  getNotification: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const notification = await notificationsModel.getNotification(id);
      if (!notification) {
        return new Response(JSON.stringify({ error: 'Notification not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: notification }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching notification: ${error}` }), { status: 400 });
    }
  },

  patchNotification: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!notificationsModel.checkAttributeNotification(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const notification = await notificationsModel.patchNotification(id, {attr, val});
      if (!notification) {
        return new Response(JSON.stringify({ error: 'Notification not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: notification }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },

  updateNotification: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const notification = await notificationsModel.updateNotification(id, body);
      if (!notification) {
        return new Response(JSON.stringify({ error: 'Notification not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: notification }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },

  deleteNotification: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const notification = await notificationsModel.deleteNotification(id);
      if (!notification) {
        return new Response(JSON.stringify({ error: 'Notification not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: notification }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },

  deleteNotifications: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const notifications = await notificationsModel.deleteManyNotifications(ids);
      if (!notifications) {
        return new Response(JSON.stringify({ error: 'Notifications not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: notifications }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default notificationsController;
