/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateAccessToken } from "@/libs/jwt";
import jwt from "jsonwebtoken";
import AuthModel from "@/models/authModel";

const authModel = new AuthModel();
const authController = {
  login: async (req: Request) => {
    const body = await req.json();
    try {
      const { accessToken, refreshToken } = await authModel.login(body);
      
      return new Response(JSON.stringify({data: { accessToken, refreshToken }}), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: 'Login failed: ' + error }), { status: 500 });
    }
  },
  loginAdmin: async (req: Request) => {
    const body = await req.json();
    try {
      const { accessToken, refreshToken } = await authModel.loginAdmin(body);
      
      return new Response(JSON.stringify({data: { accessToken, refreshToken }}), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: 'Login failed: ' + error }), { status: 500 });
    }
  },
  register: async (req: Request) => {
    const body = await req.json();
    try {
      const { newUser, newClient } = await authModel.register(body);
  
      return new Response(JSON.stringify({data: {user: newUser, client: newClient}}), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: `Registration failed: ${error}` }), { status: 400 });
    }
  },
  refresh: async (req: Request) => {
    const body = await req.json();
    const refreshToken = body.refreshToken;
    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, data: any) => {
        if (err) {
          return new Response(JSON.stringify({ error: 'Refresh token failed: Invalid token' }), { status: 401 });
        }
        const accessToken = generateAccessToken(data);
        return new Response(JSON.stringify({data: { accessToken }}), { status: 200 });
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: 'Refresh token failed: Internal Server Error' }), { status: 500 });
    }
  },
  me: (req: Request) => {
    try {
      const user = req.headers.get("user");
      return new Response(JSON.stringify({data: user}), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  },
}

export default authController;
