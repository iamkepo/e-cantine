/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";

class ClientsModel {
  clients: any;
  constructor() {
    this.clients = prisma.clients;
  }

  createClient = async (newUser: any) => {
    try {
      await this.checkClient(newUser.phone);
      const credentialsClient = { 
        userId: newUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newClient = await this.clients.create({ data: credentialsClient });
      if (!newClient) {
        throw new Error('Client not created');
      }
      return newClient;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  checkClient = async (phone: string) => {
    try {
      const client = await this.clients.findUnique({ where: { phone } });
      if (client) {
        throw new Error('Client already exists');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  getClients = async () => {
    try {
      const clientsList = await this.clients.findMany();
      if (!clientsList) {
        throw new Error('Clients not found');
      }
      return clientsList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getClient = async (phone: string) => {
    try {
      const client = await this.clients.findUnique({ where: { phone } });
      if (!client) {
        throw new Error('Client not found');
      }
      return client;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  updateClient = async (id: string, credentials: any) => {
    try {
      const client = await this.clients.update({ where: { id }, data: credentials });
      if (!client) {
        throw new Error('Client not found');
      }
      return client;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteClient = async (id: string) => {
    try {
      const client = await this.clients.delete({ where: { id } });
      return client;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ClientsModel;
