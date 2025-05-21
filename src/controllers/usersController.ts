/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/libs/prisma";
import UsersModel from "@/models/usersModel";
import { Params } from "@/core/types";
import { NextRequest } from "next/server";

const usersModel = new UsersModel();
const usersController = {
  createUser: async (req: Request) => {
    const body = await req.json();
    try {
      delete body.confirmPassword;
      const credentialsUser = { 
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newUser = await prisma.users.create({ data: credentialsUser });

      return new Response(JSON.stringify({user: newUser}), { status: 201 });

    } catch (error: any) {
      return new Response(JSON.stringify({ error: `Registration failed: ${error}` }), { status: 400 });
    }
  },

  getUsers: async (req: Request) => {  
    const { searchParams } = new URL(req.url);
    const take = parseInt(searchParams.get('take') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('orderBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
  
    try {
      const users = await usersModel.getUsers({ take, search, status, page, orderBy, order });
  
      return new Response(JSON.stringify({data: users}), { status: 200 });
    } catch (error: any) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  getUser: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const user = await usersModel.getUser(id);
      return new Response(JSON.stringify({data: user}), { status: 200 });
    } catch (error: any) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  patchUser: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const {attr, val} = await req.json();
    try {
      if(!usersModel.checkAttributeUser(attr as string)) {
        return new Response(JSON.stringify({ error: 'Invalid patch attribute' }), { status: 400 });
      }
      const user = await usersModel.patchUser(id, {attr, val});
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: user}), { status: 200 });
    } catch (error: any) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  updateUser: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    const body = await req.json();
    try {
      const user = await usersModel.updateUser(id, body);
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: user}), { status: 200 });
    } catch (error: any) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteUser: async (req: NextRequest, params: Promise<Params>) => {
    const id = parseInt((await params).id || '0', 10);
    try {
      const user = await usersModel.deleteUser(id);
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: user}), { status: 200 });
    } catch (error: any) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

  deleteUsers: async (req: Request) => {
    const { ids } = await req.json();
    try {
      const users = await usersModel.deleteManyUsers(ids);
      if (!users) {
        return new Response(JSON.stringify({ error: 'Users not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({data: users}), { status: 200 });
    } catch (error: any) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
}

export default usersController;
