/* eslint-disable @typescript-eslint/no-explicit-any */

import ArticlesModel from "@/models/articlesModel";

const articlesModel = new ArticlesModel();
const articlesController = {
  createArticle: async (req: Request) => {
    const body = await req.json();
    try {
      const article = await articlesModel.createArticle(body);
      return new Response(JSON.stringify({article: article}), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Article creation failed: ${error}` }), { status: 400 });
    }
  },

  getArticles: async (req: Request) => {  
    const { searchParams } = new URL(req.url);
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const typeId = searchParams.get('typeId') || '0';
  
    try {
      const articles = await articlesModel.getArticles({ typeId, skip, take });
      return new Response(JSON.stringify({articles: articles}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  getArticle: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '0';
    try {
      const article = await articlesModel.getArticle(id);
      return new Response(JSON.stringify({article: article}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  patchArticle: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '0';
    const {attr, val} = await req.json();
    try {
      const article = await articlesModel.patchArticle(id, {attr, val});
      return new Response(JSON.stringify({article: article}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  updateArticle: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '0';
    const body = await req.json();
    try {
      const article = await articlesModel.updateArticle(id, body);
      return new Response(JSON.stringify({article: article}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteArticle: async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '0';
    try {
      const article = await articlesModel.deleteArticle(id);
      return new Response(JSON.stringify({article: article}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
}

export default articlesController;
