import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IType } from "@/core/interfaces";
import Request from "@/configs/request";

class TypesService extends Request<IType> {
  setData: SetData<IType>;

  constructor(setType: SetData<IType>) {
    super();
    this.setData = setType;
  }

  async createType(data: IType) {
    this.setData('post', 'loading', true);
    await this.post('/type/create', data)
      .then(data => {
        this.setData('post', 'data', data as IType);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchTypes(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/type/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IType[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchType(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/type', id)
      .then(data => {
        this.setData('getById', 'data', data as IType);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchType(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/type', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IType);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateType(id: number, data: IType) {
    this.setData('put', 'loading', true);
    await this.put('/type', id, data)
      .then(data => {
        this.setData('put', 'data', data as IType);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteType(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/type', id)
      .then(data => {
        this.setData('delete', 'data', data as IType);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteTypes(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/type/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IType[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default TypesService;
