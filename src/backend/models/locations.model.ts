/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Base from "@/configs/base";
import { ParamsQuery } from "@/core/types";

class LocationsModel extends Base {
  constructor() {
    super(prisma.locations);
  }

  createLocation = async (credentials: any) => {
    const location = await this.create(credentials);
    return location;
  }

  getLocations = async (params: ParamsQuery & {clientId?: number, latitude?: number, longitude?: number, zipCode?: string}) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { address: { contains: params.search, mode: 'insensitive' } },
        { city: { contains: params.search, mode: 'insensitive' } },
        { country: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.clientId) {
      where.clientId = params.clientId;
    }
    if (params.latitude) {
      where.latitude = params.latitude;
    }
    if (params.longitude) {
      where.longitude = params.longitude;
    }
    if (params.zipCode) {
      where.zipCode = params.zipCode;
    }
    if (params.status) {
      where.status = params.status;
    }
    const locationsList = await this.getAll(params, where);
    return locationsList;
  }

  getLocation = async (id: number) => {
    const location = await this.getOne('id', id);
    return location;
  }

  checkAttributeLocation = (att: string) => {
    return this.checkAttribute(['address', 'latitude', 'longitude', 'city', 'country', 'zipCode', 'status'], att);
  }

  patchLocation = async (id: number, patch: {attr: string, val: any}) => {
    const location = await this.patch(id, patch);
    return location;
  }

  updateLocation = async (id: number, credentials: any) => {
    const location = await this.update(id, credentials);
    return location;
  }

  deleteLocation = async (id: number) => {
    const location = await this.delete(id);
    return location;
  }

  deleteManyLocations = async (ids: number[]) => {
    const locations = await this.deleteMany(ids);
    return locations;
  }
}

export default LocationsModel;
