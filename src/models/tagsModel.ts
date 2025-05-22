/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";
import { ParamsQuery } from "@/core/types";

class TagsModel extends Model {
  constructor() {
    super(prisma.tags);
  }

  createTag = async (credentials: any) => {
    const tag = await this.create(credentials);
    return tag;
  }

  getTags = async (params: ParamsQuery) => {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
      ];
    }
    if (params.status) {
      where.status = params.status;
    }
    const tagsList = await this.getAll(params, where);
    return tagsList;
  }

  getTag = async (id: number) => {
    const tag = await this.getOne('id', id);
    return tag;
  }

  checkAttributeTag = (att: string) => {
    return this.checkAttribute(['name', 'status'], att);
  }

  patchTag = async (id: number, patch: {attr: string, val: any}) => {
    const tag = await this.patch(id, patch);
    return tag;
  }

  updateTag = async (id: number, credentials: any) => {
    const tag = await this.update(id, credentials);
    return tag;
  }

  deleteTag = async (id: number) => {
    const tag = await this.delete(id);
    return tag;
  }

  deleteManyTags = async (ids: number[]) => {
    const tags = await this.deleteMany(ids);
    return tags;
  }
}

export default TagsModel;