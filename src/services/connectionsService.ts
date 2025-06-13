import { Meta, ParamsQuery } from "@/core/types";
import { IConnection } from "@/core/interfaces";
import Request from "@/configs/request";

class ConnectionsService extends Request<IConnection> {
  constructor() {
    super();
  }

  async createConnection(data: IConnection, onSuccess?: (data: IConnection) => void, onError?: (error: Error) => void) {
    await this.post('/connection/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IConnection);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchConnections(params: ParamsQuery, onSuccess?: (data: { data: IConnection[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/connection/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IConnection[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchConnection(id: number, onSuccess?: (data: IConnection) => void, onError?: (error: Error) => void) {
    await this.getById('/connection', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IConnection);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchConnection(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IConnection) => void, onError?: (error: Error) => void) {
    await this.patch('/connection', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IConnection);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateConnection(id: number, data: IConnection, onSuccess?: (data: IConnection) => void, onError?: (error: Error) => void) {
    await this.put('/connection', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IConnection);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteConnection(id: number, onSuccess?: (data: IConnection) => void, onError?: (error: Error) => void) {
    await this.delete('/connection', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IConnection);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteConnections(ids: number[], onSuccess?: (data: IConnection[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/connection/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IConnection[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default ConnectionsService;
