import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IClient } from "@/core/interfaces";
import Request from "@/configs/request";

class ClientsService extends Request<IClient> {
  setData: SetData<IClient>;
  constructor(setClient: SetData<IClient>) {
    super();
    this.setData = setClient;
  }

  async createClient(data: IClient) {
    this.setData('post', 'loading', true);
    await this.post('/client/create', data)
      .then(data => {
        this.setData('post', 'data', data as IClient);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchClients(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/client/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IClient[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchClient(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/client', id)
      .then(data => {
        this.setData('getById', 'data', data as IClient);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchClient(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/client', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IClient);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateClient(id: number, data: IClient) {
    this.setData('put', 'loading', true);
    await this.put('/client', id, data)
      .then(data => {
        this.setData('put', 'data', data as IClient);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteClient(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/client', id)
      .then(data => {
        this.setData('delete', 'data', data as IClient);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteClients(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/client/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IClient[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default ClientsService;
