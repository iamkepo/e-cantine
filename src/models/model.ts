import { ParamsQuery } from "@/core/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
class Model {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  create = async (credentials: any) => {
    try {
      const credentialsModel = { 
        ...credentials,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const model = await this.model.create({ data: credentialsModel });
      return model;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getAll = async (params: ParamsQuery & unknown, where?: any) => {
    try {
      const { take = 10, page = 1, orderBy = 'createdAt', order = 'desc' } = params;
      const whereModel: any = where ? where : {};

      const data = await this.model.findMany({
        where: whereModel,
        skip: (page - 1) * take,
        take,
        orderBy: { [orderBy]: order },
      });
      const total = await this.model.count({ where: whereModel });
  
      return {
        data,
        meta: {
          total,
          page,
          pageCount: Math.ceil(total / take),
          limit: take,
        },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  getOne = async (attr: string, val: unknown) => {
    try {
      const model = await this.model.findUnique({ where: { [attr]: val } });
      return model;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  checkAttribute = (attributes: string[], att: string) => {
    return attributes.includes(att);
  }

  patch = async (id: number, patch: {attr: string, val: any}) => {
    try {
      const model = await this.model.update({ where: { id }, data: { [patch.attr]: patch.val } });
      return model;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  update = async (id: number, credentials: any) => {
    try {
      const model = await this.model.update({ where: { id }, data: credentials });
      return model;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  delete = async (id: number) => {
    try {
      const model = await this.model.delete({ where: { id } });
      return model;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteMany = async (ids: number[]) => {
    try {
      const models = await this.model.deleteMany({ where: { id: { in: ids } } });
      return models;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default Model;
