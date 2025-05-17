/* eslint-disable @typescript-eslint/no-explicit-any */

import { Params } from "@/core/interfaces";
import ArticleTagsModel from "@/models/articleTagsModel";

const articleTagsModel = new ArticleTagsModel();
const articleTagsController = {
  createArticleTag: async (req: Request) => {
    const body = await req.json();
    try {
      const articleTag = await articleTagsModel.createArticleTag(body);
      if (!articleTag) {
        return new Response(JSON.stringify({ error: 'ArticleTag not created' }), { status: 400 });
      }
      return new Response(JSON.stringify({articleTag: articleTag}), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `ArticleTag creation failed: ${error}` }), { status: 400 });
    }
  },

  getArticleTags: async (req: Request) => {  
    const { searchParams } = new URL(req.url);
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    const take = parseInt(searchParams.get('take') || '10', 10);
  
    try {
      const articleTags = await articleTagsModel.getArticleTags({ skip, take });
      if (!articleTags) {
        return new Response(JSON.stringify({ error: 'ArticleTags not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({articleTags: articleTags}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  getArticleTag: async (req: Request, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const articleTag = await articleTagsModel.getArticleTag(id);
      if (!articleTag) {
        return new Response(JSON.stringify({ error: 'ArticleTag not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({articleTag: articleTag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  patchArticleTag: async (req: Request, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      const articleTag = await articleTagsModel.patchArticleTag(id, {attr, val});
      if (!articleTag) {
        return new Response(JSON.stringify({ error: 'ArticleTag not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({articleTag: articleTag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  updateArticleTag: async (req: Request, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      const articleTag = await articleTagsModel.updateArticleTag(id, body);
      if (!articleTag) {
        return new Response(JSON.stringify({ error: 'ArticleTag not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({articleTag: articleTag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteArticleTag: async (req: Request, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const articleTag = await articleTagsModel.deleteArticleTag(id);
      if (!articleTag) {
        return new Response(JSON.stringify({ error: 'ArticleTag not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({articleTag: articleTag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
}

export default articleTagsController;
