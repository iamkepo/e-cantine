import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IPromo } from "@/core/interfaces";
import Request from "@/configs/request";

class PromosService extends Request<IPromo> {
  setData: SetData<IPromo>;

  constructor(setPromo: SetData<IPromo>) {
    super();
    this.setData = setPromo;
  }

  async createPromo(data: IPromo) {
    this.setData('post', 'loading', true);
    await this.post('/promo/create', data)
      .then(data => {
        this.setData('post', 'data', data as IPromo);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchPromos(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/promo/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IPromo[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchPromo(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/promo', id)
      .then(data => {
        this.setData('getById', 'data', data as IPromo);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchPromo(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/promo', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IPromo);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updatePromo(id: number, data: IPromo) {
    this.setData('put', 'loading', true);
    await this.put('/promo', id, data)
      .then(data => {
        this.setData('put', 'data', data as IPromo);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deletePromo(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/promo', id)
      .then(data => {
        this.setData('delete', 'data', data as IPromo);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deletePromos(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/promo/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IPromo[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default PromosService;
