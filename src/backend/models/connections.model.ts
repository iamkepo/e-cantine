/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/libs/prisma";
import Base from "@/configs/base";
import { ParamsQuery } from "@/core/types";

class ConnectionsModel extends Base {
  constructor() {
    super(prisma.connections);
  }

  createConnection = async (credentials: any) => {
    const connection = await this.create(credentials);
    return connection;
  }

  getConnections = async (params: ParamsQuery & {articleId?: number, tagId?: number}) => {
    const where: any = {};
    if (params.articleId) {
      where.articleId = params.articleId;
    }
    if (params.tagId) {
      where.tagId = params.tagId;
    }
    if (params.status) {
      where.status = params.status;
    }
    const connectionsList = await this.getAll(params, where);
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