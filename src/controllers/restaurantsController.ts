/* eslint-disable @typescript-eslint/no-explicit-any */
import RestaurantsModel from "@/models/restaurantsModel";
import { NextRequest } from "next/server";
import { Params } from "@/core/types";

const restaurantsModel = new RestaurantsModel();
const restaurantsController = {
  createRestaurant: async (req: Request) => {
    const body = await req.json();
    try {
      const restaurant = await restaurantsModel.createRestaurant(body);
      if (!restaurant) {
        return new Response(JSON.stringify({ error: 'Restaurant creation failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: restaurant }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Restaurant creation failed: ${error}` }), { status: 400 });
    }
  },
  getRestaurants: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const userId = parseInt(searchParams.get('userId') || '0', 10);

    const params = { take, search, status, page, orderBy, order, userId };

    try {
      const restaurants = await restaurantsModel.getRestaurants(params);
      return new Response(JSON.stringify({ data: restaurants }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching restaurants: ${error}` }), { status: 400 });
    }
  },
  getRestaurant: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const restaurant = await restaurantsModel.getRestaurant(id);
      if (!restaurant) {
        return new Response(JSON.stringify({ error: 'Restaurant not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: restaurant }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Error fetching restaurant: ${error}` }), { status: 400 });
    }
  },
  patchRestaurant: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!attr || !val) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!restaurantsModel.checkAttributeRestaurant(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const restaurant = await restaurantsModel.patchRestaurant(id, {attr, val});
      if (!restaurant) {
        return new Response(JSON.stringify({ error: 'Restaurant not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: restaurant }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Patch failed: ${error}` }), { status: 400 });
    }
  },
  updateRestaurant: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const restaurant = await restaurantsModel.updateRestaurant(id, body);
      if (!restaurant) {
        return new Response(JSON.stringify({ error: 'Restaurant update failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({ data: restaurant }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Update failed: ${error}` }), { status: 400 });
    }
  },
  deleteRestaurant: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const restaurant = await restaurantsModel.deleteRestaurant(id);
      if (!restaurant) {
        return new Response(JSON.stringify({ error: 'Restaurant not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: restaurant }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete failed: ${error}` }), { status: 400 });
    }
  },
  deleteRestaurants: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const restaurants = await restaurantsModel.deleteManyRestaurants(ids);
      if (!restaurants) {
        return new Response(JSON.stringify({ error: 'Restaurants not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ data: restaurants }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Delete many failed: ${error}` }), { status: 400 });
    }
  }
};

export default restaurantsController;
