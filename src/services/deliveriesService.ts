import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IDelivery } from "@/core/interfaces";
import Request from "@/configs/request";

class DeliveriesService extends Request<IDelivery> {
  setData: SetData<IDelivery>;

  constructor(setDelivery: SetData<IDelivery>) {
    super();
    this.setData = setDelivery;
  }

  async createDelivery(data: IDelivery) {
    this.setData('post', 'loading', true);
    await this.post('/delivery/create', data)
      .then(data => {
        this.setData('post', 'data', data as IDelivery);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchDeliveries(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/delivery/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IDelivery[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchDelivery(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/delivery', id)
      .then(data => {
        this.setData('getById', 'data', data as IDelivery);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchDelivery(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/delivery', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IDelivery);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateDelivery(id: number, data: IDelivery) {
    this.setData('put', 'loading', true);
    await this.put('/delivery', id, data)
      .then(data => {
        this.setData('put', 'data', data as IDelivery);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteDelivery(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/delivery', id)
      .then(data => {
        this.setData('delete', 'data', data as IDelivery);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteDeliveries(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/delivery/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IDelivery[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default DeliveriesService;
