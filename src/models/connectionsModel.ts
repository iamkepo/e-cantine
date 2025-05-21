/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Model from "./model";

class ConnectionsModel extends Model {
  constructor() {
    super(prisma.connections);
  }

  createConnection = async (credentials: any) => {
    const connection = await this.create(credentials);
    return connection;
  }

  getConnections = async (params: { take: number, articleId: number, tagId: number, status: string, page: number, orderBy: string, order: string }) => {
    const { articleId, tagId } = params;
    const where: any = {};
      if (articleId > 0) {
        where.articleId = articleId;
      }
      if (tagId > 0) {
        where.tagId = tagId;
      }
      const connectionsList = await this.getAll({ ...params, search: '' }, where);
      return connectionsList;
  }

  getConnection = async (id: number) => {
    const connection = await this.getOne('id', id);
    return connection;
  }

  checkAttributeConnection = (att: string) => {
    return this.checkAttribute(['articleId', 'tagId', 'status'], att);
  }

  patchConnection = async (id: number, patch: {attr: string, val: any}) => {
    const connection = await this.patch(id, patch);
    return connection;
  }

  updateConnection = async (id: number, credentials: any) => {
    const connection = await this.update(id, credentials);
    return connection;
  }

  deleteConnection = async (id: number) => {
    const connection = await this.delete(id);
    return connection;
  }

  deleteManyConnections = async (ids: number[]) => {
    const connections = await this.deleteMany(ids);
    return connections;
  }
}

export default ConnectionsModel;