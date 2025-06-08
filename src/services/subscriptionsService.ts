import { Meta, ParamsQuery, SetData } from "@/core/types";
import { ISubscription } from "@/core/interfaces";
import Request from "@/configs/request";

class SubscriptionsService extends Request<ISubscription> {
  setData: SetData<ISubscription>;

  constructor(setSubscription: SetData<ISubscription>) {
    super();
    this.setData = setSubscription;
  }

  async createSubscription(data: ISubscription) {
    this.setData('post', 'loading', true);
    await this.post('/subscription/create', data)
      .then(data => {
        this.setData('post', 'data', data as ISubscription);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchSubscriptions(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/subscription/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: ISubscription[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchSubscription(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/subscription', id)
      .then(data => {
        this.setData('getById', 'data', data as ISubscription);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchSubscription(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/subscription', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as ISubscription);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateSubscription(id: number, data: ISubscription) {
    this.setData('put', 'loading', true);
    await this.put('/subscription', id, data)
      .then(data => {
        this.setData('put', 'data', data as ISubscription);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteSubscription(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/subscription', id)
      .then(data => {
        this.setData('delete', 'data', data as ISubscription);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteSubscriptions(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/subscription/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as ISubscription[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default SubscriptionsService;
