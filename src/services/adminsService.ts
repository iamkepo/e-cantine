import { Meta, ParamsQuery } from "@/core/types";
import { IAdmin } from "@/core/interfaces";
import Request from "@/configs/request";

class AdminService extends Request<IAdmin> {
  constructor() {
    super();
  }

  async createAdmin(data: IAdmin, onSuccess?: (data: IAdmin) => void, onError?: (error: Error) => void) {
    await this.post('/admin/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IAdmin);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchAdmins(params: ParamsQuery, onSuccess?: (data: { data: IAdmin[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/admin/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IAdmin[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchAdmin(id: number, onSuccess?: (data: IAdmin) => void, onError?: (error: Error) => void) {
    await this.getById('/admin', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IAdmin);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchAdmin(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IAdmin) => void, onError?: (error: Error) => void) {
    await this.patch('/admin', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IAdmin);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateAdmin(id: number, data: IAdmin, onSuccess?: (data: IAdmin) => void, onError?: (error: Error) => void) {
    await this.put('/admin', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IAdmin);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteAdmin(id: number, onSuccess?: (data: IAdmin) => void, onError?: (error: Error) => void) {
    await this.delete('/admin', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IAdmin);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteAdmins(ids: number[], onSuccess?: (data: IAdmin[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/admin/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IAdmin[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default AdminService;
