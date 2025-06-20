import { Meta, ParamsQuery } from "@/core/types";
import { IDelivery } from "@/core/interfaces";
import Request from "@/configs/request";

class DeliveriesService extends Request<IDelivery> {
  constructor() {
    super();
  }

  async createDelivery(data: IDelivery, onSuccess?: (data: IDelivery) => void, onError?: (error: Error) => void) {
    await this.post('/delivery/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDelivery);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchDeliveries(params: ParamsQuery, onSuccess?: (data: { data: IDelivery[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/delivery/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IDelivery[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchDelivery(id: number, onSuccess?: (data: IDelivery) => void, onError?: (error: Error) => void) {
    await this.getById('/delivery', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDelivery);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchDelivery(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IDelivery) => void, onError?: (error: Error) => void) {
    await this.patch('/delivery', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDelivery);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateDelivery(id: number, data: IDelivery, onSuccess?: (data: IDelivery) => void, onError?: (error: Error) => void) {
    await this.put('/delivery', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDelivery);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteDelivery(id: number, onSuccess?: (data: IDelivery) => void, onError?: (error: Error) => void) {
    await this.delete('/delivery', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDelivery);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteDeliveries(ids: number[], onSuccess?: (data: IDelivery[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/delivery/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDelivery[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default DeliveriesService;
