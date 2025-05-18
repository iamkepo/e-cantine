/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";

class TagsModel {
  tags: any;
  constructor() {
    this.tags = prisma.tags;
  }

  createTag = async (credentials: any) => {
    try {
      const credentialsTag = { 
        ...credentials,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const tag = await this.tags.create({ data: credentialsTag });
      if (!tag) {
        throw new Error('Tag not created');
      }
      return tag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getTags = async (params: { skip: number, take: number }) => {
    try {
      const { skip, take } = params;
      const tagsList = await this.tags.findMany({
        skip,
        take,
      });
      if (!tagsList) {
        throw new Error('Tags not found');
      }
      return tagsList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getTag = async (id: number) => {
    try {
      const tag = await this.tags.findUnique({ where: { id } });
      if (!tag) {
        throw new Error('Tag not found');
      }
      return tag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  checkAttributeTag = (att: string) => {
    return ['name', 'status'].includes(att);
  }

  patchTag = async (id: number, patch: {attr: string, val: any}) => {
    try {
      const tag = await this.tags.update({ where: { id }, data: { [patch.attr]: patch.val } });
      if (!tag) {
        throw new Error('Tag not found');
      }
      return tag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  updateTag = async (id: number, credentials: any) => {
    try {
      const tag = await this.tags.update({ where: { id }, data: credentials });
      if (!tag) {
        throw new Error('Tag not found');
      }
      return tag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteTag = async (id: number) => {
    try {
      const tag = await this.tags.delete({ where: { id } });
      return tag;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default TagsModel;
