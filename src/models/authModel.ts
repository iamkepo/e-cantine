/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import { generateAccessToken, generateRefreshToken } from "@/libs/jwt";
import UsersModel from "./usersModel";
import ClientsModel from "./clientsModel";
import AdminsModel from "./adminsModel";

class AuthModel {
  users: any;
  clients: any;
  usersModel: UsersModel;
  clientsModel: ClientsModel;
  adminsModel: AdminsModel;

  constructor() {
    this.users = prisma.users;
    this.clients = prisma.clients;
    this.usersModel = new UsersModel();
    this.clientsModel = new ClientsModel();
    this.adminsModel = new AdminsModel();
  }

  login = async (credentials: any) => {
    const { phone, password } = credentials;
    try {
      const client = await this.clientsModel.getClient(phone);
      const user = await this.usersModel.getUser(client.userId);

      await this.usersModel.checkPassword(password, user);
      
      const accessToken = generateAccessToken(client);
      const refreshToken = generateRefreshToken(client);

      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  loginAdmin = async (credentials: any) => {
    const { email, password } = credentials;
    try {
      const admin = await this.adminsModel.getAdmin(email);
      const user = await this.usersModel.getUser(admin.userId);

      await this.usersModel.checkPassword(password, user);

      const accessToken = generateAccessToken(admin);
      const refreshToken = generateRefreshToken(admin);

      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  register = async (credentials: any) => {
    try {
      await this.clientsModel.checkClient(credentials.phone);

      const newUser = await this.usersModel.createUser(credentials);
      const newClient = await this.clientsModel.createClient(newUser);
     
      return { newUser, newClient };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export default AuthModel;
