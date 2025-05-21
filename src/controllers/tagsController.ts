/* eslint-disable @typescript-eslint/no-explicit-any */

import { Params } from "@/core/types";
import TagsModel from "@/models/tagsModel";
import { NextRequest } from "next/server";

const tagsModel = new TagsModel();
const tagsController = {
  createTag: async (req: Request) => {
    const body = await req.json();
    try {
      const tag = await tagsModel.createTag(body);
      return new Response(JSON.stringify({data: tag}), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Tag creation failed: ${error}` }), { status: 400 });
    }
  },

  getTags: async (req: Request) => {  
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
  
    try {
      const tags = await tagsModel.getTags({ take, search, status, page, orderBy, order });
      return new Response(JSON.stringify({data: tags}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  getTag: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const tag = await tagsModel.getTag(id);
      return new Response(JSON.stringify({data: tag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  patchTag: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!tagsModel.checkAttributeTag(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const tag = await tagsModel.patchTag(id, {attr, val});
      if (!tag) {
        return new Response(JSON.stringify({ error: 'Tag not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: tag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  updateTag: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      const tag = await tagsModel.updateTag(id, body);
      if (!tag) {
        return new Response(JSON.stringify({ error: 'Tag update failed' }), { status: 400 });
      }
      return new Response(JSON.stringify({data: tag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteTag: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const tag = await tagsModel.deleteTag(id);
      return new Response(JSON.stringify({data: tag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteTags: async (req: Request) => {
    const { ids } = await req.json();
    try {
      const tags = await tagsModel.deleteManyTags(ids);
      if (!tags) {
        return new Response(JSON.stringify({ error: 'Tags not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: tags}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
}

export default tagsController;
