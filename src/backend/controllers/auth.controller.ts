/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateAccessToken, generateRefreshToken } from "@/libs/jwt";
import jwt from "jsonwebtoken";
import UsersModel from "@/backend/models/users.model";
import ClientsModel from "@/backend/models/clients.model";
import AdminsModel from "@/backend/models/admins.model";
import DeliverersModel from "@/backend/models/deliverers.model";
import RestaurantsModel from "@/backend/models/restaurants.model";

const usersModel = new UsersModel();
const adminsModel = new AdminsModel();
const clientsModel = new ClientsModel();
const deliverersModel = new DeliverersModel();
const restaurantsModel = new RestaurantsModel();

const authController = {
  login: async (req: Request) => {
    const { email, password } = await req.json();
    try {
      const user = await usersModel.getUserByEmail(email);
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 400 });
      }
      const checkPassword = await usersModel.checkPassword(password, user);
      if (!checkPassword) {
        return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 400 });
      }
      const client = await clientsModel.getClient(user.id);
      if (!client) {
        return new Response(JSON.stringify({ error: 'Client not found' }), { status: 400 });
      }
      
      const accessToken = generateAccessToken({...client, scope: 'client'});
      const refreshToken = generateRefreshToken({...client, scope: 'client'});
      
      return new Response(JSON.stringify({data: { accessToken, refreshToken }}), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: 'Login failed: ' + error }), { status: 500 });
    }
  },
  register: async (req: Request) => {
    const {email, password, firstname, lastname } = await req.json();
    try {
      const userExists = await usersModel.getUserByEmail(email);
      if (userExists) {
        return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
      }
      const newUser = await usersModel.createUser({email, password, firstname, lastname});
      if (!newUser) {
        return new Response(JSON.stringify({ error: 'User not created' }), { status: 400 });
      }
      const newClient = await clientsModel.createClient(newUser.id);
      if (!newClient) {
        return new Response(JSON.stringify({ error: 'Client not created' }), { status: 400 });
      }
      
      return new Response(JSON.stringify({data: newClient}), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: `Registration failed: ${error}` }), { status: 400 });
    }
  },
  refresh: async (req: Request) => {
    const {refreshToken} = await req.json();
    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, data: any) => {
        if (err) {
          return new Response(JSON.stringify({ error: 'Refresh token failed: Invalid token' }), { status: 401 });
        }
        const user = usersModel.getUser(data.userId);
        if (!user) {
          return new Response(JSON.stringify({ error: 'User not found' }), { status: 400 });
        }
        let accessToken;
        switch (data.scope) {
          case 'client':
            const client = clientsModel.getClient(data.userId);
            if (!client) {
              return new Response(JSON.stringify({ error: 'Client not found' }), { status: 400 });
            }
            accessToken = generateAccessToken({...client, scope: 'client'});
            break;
          case 'admin':
            const admin = adminsModel.getAdmin(data.userId);
            if (!admin) {
              return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 400 });
            }
            accessToken = generateAccessToken({...admin, scope: 'admin'});
            break;
          case 'deliverer':
            const deliverer = deliverersModel.getDeliverer(data.userId);
            if (!deliverer) {
              return new Response(JSON.stringify({ error: 'Deliverer not found' }), { status: 400 });
            }
            accessToken = generateAccessToken({...deliverer, scope: 'deliverer'});
            break;
          case 'restaurant':
            const restaurant = restaurantsModel.getRestaurant(data.userId);
            if (!restaurant) {
              return new Response(JSON.stringify({ error: 'Restaurant not found' }), { status: 400 });
            }
            accessToken = generateAccessToken({...restaurant, scope: 'restaurant'});
            break;
          default:
            break;
        }
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

  loginAdmin: async (req: Request) => {
    const { email, password } = await req.json();
    try {
      const user = await usersModel.getUserByEmail(email);
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 400 });
      }
      const checkPassword = await usersModel.checkPassword(password, user);
      if (!checkPassword) {
        return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 400 });
      }
      const admin = await adminsModel.getAdmin(user.id);
      if (!admin) {
        return new Response(JSON.stringify({ error: 'Admin not found' }), { status: 400 });
      }
      const accessToken = generateAccessToken({...admin, scope: 'admin'});
      const refreshToken = generateRefreshToken({...admin, scope: 'admin'});
      
      return new Response(JSON.stringify({data: { accessToken, refreshToken }}), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: 'Login failed: ' + error }), { status: 500 });
    }
  },
  loginDeliverer: async (req: Request) => {
    const { email, password } = await req.json();
    try {
      const user = await usersModel.getUserByEmail(email);
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 400 });
      }
      const checkPassword = await usersModel.checkPassword(password, user);
      if (!checkPassword) {
        return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 400 });
      }
      const deliverer = await deliverersModel.getDeliverer(user.id);
      if (!deliverer) {
        return new Response(JSON.stringify({ error: 'Deliverer not found' }), { status: 400 });
      }
      const accessToken = generateAccessToken({...deliverer, scope: 'deliverer'});
      const refreshToken = generateRefreshToken({...deliverer, scope: 'deliverer'});
      
      return new Response(JSON.stringify({data: { accessToken, refreshToken }}), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: 'Login failed: ' + error }), { status: 500 });
    }
  },
  loginRestaurant: async (req: Request) => {
    const { email, password } = await req.json();
    try {
      const user = await usersModel.getUserByEmail(email);
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 400 });
      }
      const checkPassword = await usersModel.checkPassword(password, user);
      if (!checkPassword) {
        return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 400 });
      }
      const restaurant = await restaurantsModel.getRestaurant(user.id);
      if (!restaurant) {
        return new Response(JSON.stringify({ error: 'Restaurant not found' }), { status: 400 });
      }
      const accessToken = generateAccessToken({...restaurant, scope: 'restaurant'});
      const refreshToken = generateRefreshToken({...restaurant, scope: 'restaurant'});
      
      return new Response(JSON.stringify({data: { accessToken, refreshToken }}), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: 'Login failed: ' + error }), { status: 500 });
    }
  }
}

export default authController;
