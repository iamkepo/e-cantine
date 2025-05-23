/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";
import { ParamsQuery } from "@/core/types";

class RestaurantsModel extends Model {
  constructor() {
    super(prisma.restaurants);
  }

  createRestaurant = async (credentials: any) => {
    const restaurant = await this.create(credentials);
    return restaurant;
  }
  
  checkRestaurant = async (phone: string) => {
    const restaurant = await this.getOne('phone', phone);
    return restaurant;
  }

  getRestaurants = async (params: ParamsQuery & {userId?: number}) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.status) {
      where.status = params.status;
    }
    if (params.userId) {
      where.userId = params.userId;
    }
    const restaurantsList = await this.getAll(params, where);
    return restaurantsList;
  }

  getRestaurant = async (id: number) => {
    const restaurant = await this.getOne('id', id);
    return restaurant;
  }

  checkAttributeRestaurant = (att: string) => {
    return this.checkAttribute(['phone', 'name', 'status'], att);
  }

  patchRestaurant = async (id: number, patch: {attr: string, val: any}) => {
    const restaurant = await this.patch(id, patch);
    return restaurant;
  }

  updateRestaurant = async (id: number, credentials: any) => {
    const restaurant = await this.update(id, credentials);
    return restaurant;
  }

  deleteRestaurant = async (id: number) => {
    const restaurant = await this.delete(id);
    return restaurant;
  }

  deleteManyRestaurants = async (ids: number[]) => {
    const restaurants = await this.deleteMany(ids);
    return restaurants;
  }
}

export default RestaurantsModel;
