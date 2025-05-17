/* eslint-disable @typescript-eslint/no-explicit-any */

import { Params } from "@/core/interfaces";
import ArticlesModel from "@/models/articlesModel";
import { NextRequest } from "next/server";

const articlesModel = new ArticlesModel();
const articlesController = {
  createArticle: async (req: Request) => {
    const body = await req.json();
    try {
      const article = await articlesModel.createArticle(body);
      if (!article) {
        return new Response(JSON.stringify({ error: 'Article not created' }), { status: 400 });
      }
      return new Response(JSON.stringify({article: article}), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Article creation failed: ${error}` }), { status: 400 });
    }
  },

  getArticles: async (req: Request) => {  
    const { searchParams } = new URL(req.url);
    const skip = parseInt(searchParams.get('skip') || '0', 10); // nombre d'articles à ignorer
    const take = parseInt(searchParams.get('take') || '10', 10); // nombre d'articles à récupérer
    const search = searchParams.get('search') || '';
    const typeId = parseInt(searchParams.get('typeId') || '0', 10); // id du type
    const categoryId = parseInt(searchParams.get('categoryId') || '0', 10); // id de la catégorie
    try {
      const articles = await articlesModel.getArticles({ typeId, categoryId, skip, take, search });
      return new Response(JSON.stringify({articles: articles}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  },

  getArticle: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const article = await articlesModel.getArticle(id);
      if (!article) {
        return new Response(JSON.stringify({ error: 'Article not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({article: article}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  },

  patchArticle: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      const article = await articlesModel.patchArticle(id, {attr, val});
      if (!article) {
        return new Response(JSON.stringify({ error: 'Article not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({article: article}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  },

  updateArticle: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      const article = await articlesModel.updateArticle(id, body);
      if (!article) {
        return new Response(JSON.stringify({ error: 'Article not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({article: article}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  },

  deleteArticle: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const article = await articlesModel.deleteArticle(id);
      if (!article) {
        return Response.json({ error: 'Article not found' }, { status: 404 });
      }
      return Response.json({article: article}, { status: 200 });
    } catch (error) {
      console.error(error);
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  },
}

export default articlesController;
