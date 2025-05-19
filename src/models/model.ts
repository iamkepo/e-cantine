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

  getAll = async (params: { take: number, search: string, status: string, page: number }, where?: any) => {
    try {
      const { take, search, status, page } = params;
      const whereModel: any = where ? where : {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
        ]
      };
      if (status) {
        whereModel.status = status;
      }
      const data = await this.model.findMany({
        where: whereModel,
        skip: (page - 1) * take,
        take,
        orderBy: { createdAt: 'desc' },
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
