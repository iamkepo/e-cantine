import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IRestaurant } from "@/core/interfaces";
import Request from "@/configs/request";

class RestaurantsService extends Request<IRestaurant> {
  setData: SetData<IRestaurant>;

  constructor(setRestaurant: SetData<IRestaurant>) {
    super();
    this.setData = setRestaurant;
  }

  async createRestaurant(data: IRestaurant) {
    this.setData('post', 'loading', true);
    await this.post('/restaurant/create', data)
      .then(data => {
        this.setData('post', 'data', data as IRestaurant);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchRestaurants(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/restaurant/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IRestaurant[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchRestaurant(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/restaurant', id)
      .then(data => {
        this.setData('getById', 'data', data as IRestaurant);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchRestaurant(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/restaurant', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IRestaurant);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateRestaurant(id: number, data: IRestaurant) {
    this.setData('put', 'loading', true);
    await this.put('/restaurant', id, data)
      .then(data => {
        this.setData('put', 'data', data as IRestaurant);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteRestaurant(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/restaurant', id)
      .then(data => {
        this.setData('delete', 'data', data as IRestaurant);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteRestaurants(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/restaurant/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IRestaurant[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default RestaurantsService;
