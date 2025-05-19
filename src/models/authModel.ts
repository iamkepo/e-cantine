/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateAccessToken, generateRefreshToken } from "@/libs/jwt";
import UsersModel from "./usersModel";
import ClientsModel from "./clientsModel";
import AdminsModel from "./adminsModel";

class AuthModel extends UsersModel {
  clientsModel: ClientsModel;
  adminsModel: AdminsModel;

  constructor() {
    super();
    this.clientsModel = new ClientsModel();
    this.adminsModel = new AdminsModel();
  }

  login = async (credentials: any) => {
    const { phone, password } = credentials;
    try {
      const client = await this.clientsModel.getClient(phone);
      const user = await this.getUser(client.userId);

      await this.checkPassword(password, user);
      
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
      const user = await this.getUser(admin.userId);

      await this.checkPassword(password, user);

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

      const newUser = await this.create(credentials);
      const newClient = await this.clientsModel.createClient(newUser);
     
      return { newUser, newClient };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export default AuthModel;
