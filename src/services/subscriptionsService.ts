import { Meta, ParamsQuery } from "@/core/types";
import { ISubscription } from "@/core/interfaces";
import Request from "@/configs/request";

class SubscriptionsService extends Request<ISubscription> {
  constructor() {
    super();
  }

  async createSubscription(data: ISubscription, onSuccess?: (data: ISubscription) => void, onError?: (error: Error) => void) {
    await this.post('/subscription/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ISubscription);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchSubscriptions(params: ParamsQuery, onSuccess?: (data: { data: ISubscription[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/subscription/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: ISubscription[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchSubscription(id: number, onSuccess?: (data: ISubscription) => void, onError?: (error: Error) => void) {
    await this.getById('/subscription', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ISubscription);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchSubscription(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: ISubscription) => void, onError?: (error: Error) => void) {
    await this.patch('/subscription', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ISubscription);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateSubscription(id: number, data: ISubscription, onSuccess?: (data: ISubscription) => void, onError?: (error: Error) => void) {
    await this.put('/subscription', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ISubscription);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteSubscription(id: number, onSuccess?: (data: ISubscription) => void, onError?: (error: Error) => void) {
    await this.delete('/subscription', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ISubscription);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteSubscriptions(ids: number[], onSuccess?: (data: ISubscription[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/subscription/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ISubscription[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default SubscriptionsService;
