/* eslint-disable @typescript-eslint/no-explicit-any */

import { Params } from "@/core/interfaces";
import CategoriesModel from "@/models/categoriesModel";
import { NextRequest } from "next/server";

const categoriesModel = new CategoriesModel();
const categoriesController = {
  createCategory: async (req: Request) => {
    const body = await req.json();
    try {
      const category = await categoriesModel.createCategory(body);
      if (!category) {
        return new Response(JSON.stringify({ error: 'Category not created' }), { status: 400 });
      }
      return new Response(JSON.stringify({data: category}), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Category creation failed: ${error}` }), { status: 400 });
    }
  },

  getCategories: async (req: Request) => {  
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
  
    try {
      const categories = await categoriesModel.getCategories({ take, search, status, page });
      return new Response(JSON.stringify({data: categories}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  getCategory: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const category = await categoriesModel.getCategory(id);
      if (!category) {
        return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: category}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  patchCategory: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!categoriesModel.checkAttributeCategory(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const category = await categoriesModel.patchCategory(id, {attr, val});
      if (!category) {
        return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: category}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  updateCategory: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      const category = await categoriesModel.updateCategory(id, body);
      if (!category) {
        return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: category}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteCategory: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const category = await categoriesModel.deleteCategory(id);
      if (!category) {
        return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: category}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteCategories: async (req: Request) => {
    const { ids } = await req.json();
    try {
      const categories = await categoriesModel.deleteManyCategories(ids);
      if (!categories) {
        return new Response(JSON.stringify({ error: 'Categories not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: categories}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
}

export default categoriesController;
