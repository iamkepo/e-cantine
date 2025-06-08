import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IConnection } from "@/core/interfaces";
import Request from "@/configs/request";

class ConnectionsService extends Request<IConnection> {
  setData: SetData<IConnection>;

  constructor(setConnection: SetData<IConnection>) {
    super();
    this.setData = setConnection;
  }

  async createConnection(data: IConnection) {
    this.setData('post', 'loading', true);
    await this.post('/connection/create', data)
      .then(data => {
        this.setData('post', 'data', data as IConnection);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchConnections(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/connection/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IConnection[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchConnection(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/connection', id)
      .then(data => {
        this.setData('getById', 'data', data as IConnection);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchConnection(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/connection', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IConnection);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateConnection(id: number, data: IConnection) {
    this.setData('put', 'loading', true);
    await this.put('/connection', id, data)
      .then(data => {
        this.setData('put', 'data', data as IConnection);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteConnection(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/connection', id)
      .then(data => {
        this.setData('delete', 'data', data as IConnection);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteConnections(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/connection/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IConnection[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default ConnectionsService;
