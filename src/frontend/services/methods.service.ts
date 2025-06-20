import { Meta, ParamsQuery } from "@/core/types";
import { IMethod } from "@/core/interfaces";
import Request from "@/configs/request";

class MethodsService extends Request<IMethod> {
  constructor() {
    super();
  }

  async createMethod(data: IMethod, onSuccess?: (data: IMethod) => void, onError?: (error: Error) => void) {
    await this.post('/method/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IMethod);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchMethods(params: ParamsQuery, onSuccess?: (data: { data: IMethod[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/method/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IMethod[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchMethod(id: number, onSuccess?: (data: IMethod) => void, onError?: (error: Error) => void) {
    await this.getById('/method', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IMethod);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchMethod(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IMethod) => void, onError?: (error: Error) => void) {
    await this.patch('/method', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IMethod);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateMethod(id: number, data: IMethod, onSuccess?: (data: IMethod) => void, onError?: (error: Error) => void) {
    await this.put('/method', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IMethod);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteMethod(id: number, onSuccess?: (data: IMethod) => void, onError?: (error: Error) => void) {
    await this.delete('/method', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IMethod);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteMethods(ids: number[], onSuccess?: (data: IMethod[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/method/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IMethod[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default MethodsService;
