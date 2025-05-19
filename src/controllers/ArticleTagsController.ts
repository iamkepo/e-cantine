/* eslint-disable @typescript-eslint/no-explicit-any */

import { Params } from "@/core/interfaces";
import ArticleTagsModel from "@/models/articleTagsModel";
import { NextRequest } from "next/server";

const articleTagsModel = new ArticleTagsModel();
const articleTagsController = {
  createArticleTag: async (req: Request) => {
    const body = await req.json();
    try {
      const articleTag = await articleTagsModel.createArticleTag(body);
      if (!articleTag) {
        return new Response(JSON.stringify({ error: 'ArticleTag not created' }), { status: 400 });
      }
      return new Response(JSON.stringify({data: articleTag}), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: `ArticleTag creation failed: ${error}` }), { status: 400 });
    }
  },

  getArticleTags: async (req: Request) => {  
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const articleId = parseInt(searchParams.get('articleId') || '0', 10);
    const tagId = parseInt(searchParams.get('tagId') || '0', 10);
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
  
    try {
      const articleTags = await articleTagsModel.getArticleTags({ take, articleId, tagId, status, page });
      if (!articleTags) {
        return new Response(JSON.stringify({ error: 'ArticleTags not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: articleTags}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  getArticleTag: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const articleTag = await articleTagsModel.getArticleTag(id);
      if (!articleTag) {
        return new Response(JSON.stringify({ error: 'ArticleTag not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: articleTag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  patchArticleTag: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!articleTagsModel.checkAttributeArticleTag(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const articleTag = await articleTagsModel.patchArticleTag(id, {attr, val});
      if (!articleTag) {
        return new Response(JSON.stringify({ error: 'ArticleTag not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: articleTag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  updateArticleTag: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      const articleTag = await articleTagsModel.updateArticleTag(id, body);
      if (!articleTag) {
        return new Response(JSON.stringify({ error: 'ArticleTag not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: articleTag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteArticleTag: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const articleTag = await articleTagsModel.deleteArticleTag(id);
      if (!articleTag) {
        return new Response(JSON.stringify({ error: 'ArticleTag not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: articleTag}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteArticleTags: async (req: Request) => {
    const body = await req.json();
    try {
      const articleTags = await articleTagsModel.deleteManyArticleTags(body);
      if (!articleTags) {
        return new Response(JSON.stringify({ error: 'ArticleTags not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: articleTags}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
}

export default articleTagsController;
