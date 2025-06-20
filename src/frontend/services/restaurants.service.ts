import { Meta, ParamsQuery } from "@/core/types";
import { IRestaurant } from "@/core/interfaces";
import Request from "@/configs/request";

class RestaurantsService extends Request<IRestaurant> {
  constructor() {
    super();
  }

  async createRestaurant(data: IRestaurant, onSuccess?: (data: IRestaurant) => void, onError?: (error: Error) => void) {
    await this.post('/restaurant/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IRestaurant);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchRestaurants(params: ParamsQuery, onSuccess?: (data: { data: IRestaurant[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/restaurant/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IRestaurant[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchRestaurant(id: number, onSuccess?: (data: IRestaurant) => void, onError?: (error: Error) => void) {
    await this.getById('/restaurant', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IRestaurant);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchRestaurant(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IRestaurant) => void, onError?: (error: Error) => void) {
    await this.patch('/restaurant', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IRestaurant);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateRestaurant(id: number, data: IRestaurant, onSuccess?: (data: IRestaurant) => void, onError?: (error: Error) => void) {
    await this.put('/restaurant', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IRestaurant);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteRestaurant(id: number, onSuccess?: (data: IRestaurant) => void, onError?: (error: Error) => void) {
    await this.delete('/restaurant', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IRestaurant);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteRestaurants(ids: number[], onSuccess?: (data: IRestaurant[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/restaurant/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IRestaurant[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default RestaurantsService;
