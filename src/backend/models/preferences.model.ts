/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Base from "@/configs/base";
import { ParamsQuery } from "@/core/types";

class PreferencesModel extends Base {
  constructor() {
    super(prisma.preferences);
  }

  createPreference = async (credentials: any) => {
    const preference = await this.create(credentials);
    return preference;
  }

  getPreferences = async (params: ParamsQuery & {clientId?: number, tagId?: number}) => {
    const where: any = {};
    if (params.clientId) {
      where.clientId = params.clientId;
    }
    if (params.tagId) {
      where.tagId = params.tagId;
    }
    if (params.status) {
      where.status = params.status;
    }
    const preferencesList = await this.getAll(params, where);
    return preferencesList;
  }

  getPreference = async (id: number) => {
    const preference = await this.getOne('id', id);
    return preference;
  }

  checkAttributePreference = (att: string) => {
    return this.checkAttribute(['status'], att);
  }

  patchPreference = async (id: number, patch: {attr: string, val: any}) => {
    const preference = await this.patch(id, patch);
    return preference;
  }

  updatePreference = async (id: number, credentials: any) => {
    const preference = await this.update(id, credentials);
    return preference;
  }

  deletePreference = async (id: number) => {
    const preference = await this.delete(id);
    return preference;
  }

  deleteManyPreferences = async (ids: number[]) => {
    const preferences = await this.deleteMany(ids);
    return preferences;
  }
}

export default PreferencesModel;
