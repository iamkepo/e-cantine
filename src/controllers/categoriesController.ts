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
      return new Response(JSON.stringify({category: category}), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Category creation failed: ${error}` }), { status: 400 });
    }
  },

  getCategories: async (req: Request) => {  
    const { searchParams } = new URL(req.url);
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    const take = parseInt(searchParams.get('take') || '10', 10);
  
    try {
      const categories = await categoriesModel.getCategories({ skip, take });
      return new Response(JSON.stringify({categories: categories}), { status: 200 });
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
      return new Response(JSON.stringify({category: category}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  patchCategory: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      const category = await categoriesModel.patchCategory(id, {attr, val});
      if (!category) {
        return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({category: category}), { status: 200 });
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
      return new Response(JSON.stringify({category: category}), { status: 200 });
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
      return new Response(JSON.stringify({category: category}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
}

export default categoriesController;
