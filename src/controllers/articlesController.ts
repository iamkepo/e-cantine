/* eslint-disable @typescript-eslint/no-explicit-any */

import { Params } from "@/core/types";
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
      return new Response(JSON.stringify({data: article}), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Article creation failed: ${error}` }), { status: 400 });
    }
  },

  getArticles: async (req: Request) => {  
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10); // nombre d'articles à récupérer
    const search = searchParams.get('search') || '';
    const typeId = parseInt(searchParams.get('typeId') || '0', 10); // id du type
    const categoryId = parseInt(searchParams.get('categoryId') || '0', 10); // id de la catégorie
    const status = searchParams.get('status') || ''; // statut de l'article
    const page = parseInt(searchParams.get('page') || '1', 10); // page
    const orderBy = searchParams.get('orderBy') || 'createdAt'; // champ sur lequel trier
    const sort = searchParams.get('sort') || 'desc'; // ordre du tri
    const tagIds = searchParams.getAll('tagIds[]').map(id => parseInt(id, 10)) // Récupère tous les IDs de tags et les convertit en nombres    
    let articleIds: number[] = [];

    try {
      if (tagIds && tagIds.length > 0) {
        articleIds = await articlesModel.getArticlesByTagIds(tagIds);
      }
      const articles = await articlesModel.getArticles({ typeId, categoryId, take, search, status, page, orderBy, sort }, articleIds);
      return new Response(JSON.stringify({data: articles}), { status: 200 });
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
      return new Response(JSON.stringify({data: article}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  },

  patchArticle: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if( !attr || !val ) {
        return new Response(JSON.stringify({ error: 'Missing patch attribute' }), { status: 400 });
      }
      if(!articlesModel.checkAttributeArticle(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const article = await articlesModel.patchArticle(id, {attr, val});
      if (!article) {
        return new Response(JSON.stringify({ error: 'Article not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: article}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  },

  updateArticle: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      if(!body) {
        return new Response(JSON.stringify({ error: 'Missing update body' }), { status: 400 });
      }
      const article = await articlesModel.updateArticle(id, body);
      if (!article) {
        return new Response(JSON.stringify({ error: 'Article not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: article}), { status: 200 });
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
      return Response.json({data: article}, { status: 200 });
    } catch (error) {
      console.error(error);
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  },

  deleteArticles: async (req: Request) => {
    const { ids } = await req.json();
    try {
      if(!ids || ids.length === 0) {
        return new Response(JSON.stringify({ error: 'Missing ids' }), { status: 400 });
      }
      const articles = await articlesModel.deleteManyArticles(ids);
      if (!articles) {
        return Response.json({ error: 'Articles not found' }, { status: 404 });
      }
      return Response.json({data: articles}, { status: 200 });
    } catch (error) {
      console.error(error);
      return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  },
}

export default articlesController;
