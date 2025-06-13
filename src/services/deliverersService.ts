import { Meta, ParamsQuery } from "@/core/types";
import { IDeliverer } from "@/core/interfaces";
import Request from "@/configs/request";

class DeliverersService extends Request<IDeliverer> {
  constructor() {
    super();
  }

  async createDeliverer(data: IDeliverer, onSuccess?: (data: IDeliverer) => void, onError?: (error: Error) => void) {
    await this.post('/deliverer/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDeliverer);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchDeliverers(params: ParamsQuery, onSuccess?: (data: { data: IDeliverer[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/deliverer/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IDeliverer[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchDeliverer(id: number, onSuccess?: (data: IDeliverer) => void, onError?: (error: Error) => void) {
    await this.getById('/deliverer', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDeliverer);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchDeliverer(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IDeliverer) => void, onError?: (error: Error) => void) {
    await this.patch('/deliverer', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDeliverer);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateDeliverer(id: number, data: IDeliverer, onSuccess?: (data: IDeliverer) => void, onError?: (error: Error) => void) {
    await this.put('/deliverer', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDeliverer);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteDeliverer(id: number, onSuccess?: (data: IDeliverer) => void, onError?: (error: Error) => void) {
    await this.delete('/deliverer', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDeliverer);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteDeliverers(ids: number[], onSuccess?: (data: IDeliverer[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/deliverer/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDeliverer[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default DeliverersService;
