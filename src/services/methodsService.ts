import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IMethod } from "@/core/interfaces";
import Request from "@/configs/request";

class MethodsService extends Request<IMethod> {
  setData: SetData<IMethod>;

  constructor(setMethod: SetData<IMethod>) {
    super();
    this.setData = setMethod;
  }

  async createMethod(data: IMethod) {
    this.setData('post', 'loading', true);
    await this.post('/method/create', data)
      .then(data => {
        this.setData('post', 'data', data as IMethod);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchMethods(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/method/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IMethod[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchMethod(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/method', id)
      .then(data => {
        this.setData('getById', 'data', data as IMethod);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchMethod(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/method', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IMethod);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateMethod(id: number, data: IMethod) {
    this.setData('put', 'loading', true);
    await this.put('/method', id, data)
      .then(data => {
        this.setData('put', 'data', data as IMethod);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteMethod(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/method', id)
      .then(data => {
        this.setData('delete', 'data', data as IMethod);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteMethods(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/method/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IMethod[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default MethodsService;
