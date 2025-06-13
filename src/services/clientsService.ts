import { Meta, ParamsQuery } from "@/core/types";
import { IClient } from "@/core/interfaces";
import Request from "@/configs/request";

class ClientsService extends Request<IClient> {
  constructor() {
    super();
  }

  async createClient(data: IClient, onSuccess?: (data: IClient) => void, onError?: (error: Error) => void) {
    await this.post('/client/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IClient);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchClients(params: ParamsQuery, onSuccess?: (data: { data: IClient[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/client/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IClient[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchClient(id: number, onSuccess?: (data: IClient) => void, onError?: (error: Error) => void) {
    await this.getById('/client', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IClient);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchClient(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IClient) => void, onError?: (error: Error) => void) {
    await this.patch('/client', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IClient);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateClient(id: number, data: IClient, onSuccess?: (data: IClient) => void, onError?: (error: Error) => void) {
    await this.put('/client', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IClient);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteClient(id: number, onSuccess?: (data: IClient) => void, onError?: (error: Error) => void) {
    await this.delete('/client', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IClient);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteClients(ids: number[], onSuccess?: (data: IClient[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/client/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IClient[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default ClientsService;
