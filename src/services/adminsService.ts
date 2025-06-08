import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IAdmin } from "@/core/interfaces";
import Request from "@/configs/request";

class AdminService extends Request<IAdmin> {
  setData: SetData<IAdmin>;

  constructor(setAdmin: SetData<IAdmin>) {
    super();
    this.setData = setAdmin;
  }

  async createAdmin(data: IAdmin) {
    this.setData('post', 'loading', true);
    await this.post('/admin/create', data)
      .then(data => {
        this.setData('post', 'data', data as IAdmin);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchAdmins(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/admin/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IAdmin[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchAdmin(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/admin', id)
      .then(data => {
        this.setData('getById', 'data', data as IAdmin);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchAdmin(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/admin', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IAdmin);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateAdmin(id: number, data: IAdmin) {
    this.setData('put', 'loading', true);
    await this.put('/admin', id, data)
      .then(data => {
        this.setData('put', 'data', data as IAdmin);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteAdmin(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/admin', id)
      .then(data => {
        this.setData('delete', 'data', data as IAdmin);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteAdmins(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/admin/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IAdmin[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default AdminService;
