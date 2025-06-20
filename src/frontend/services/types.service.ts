import { Meta, ParamsQuery } from "@/core/types";
import { IType } from "@/core/interfaces";
import Request from "@/configs/request";

class TypesService extends Request<IType> {
  constructor() {
    super();
  }

  async createType(data: IType, onSuccess?: (data: IType) => void, onError?: (error: Error) => void) {
    await this.post('/type/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IType);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchTypes(params: ParamsQuery, onSuccess?: (data: { data: IType[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/type/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IType[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchType(id: number, onSuccess?: (data: IType) => void, onError?: (error: Error) => void) {
    await this.getById('/type', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IType);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchType(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IType) => void, onError?: (error: Error) => void) {
    await this.patch('/type', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IType);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateType(id: number, data: IType, onSuccess?: (data: IType) => void, onError?: (error: Error) => void) {
    await this.put('/type', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IType);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteType(id: number, onSuccess?: (data: IType) => void, onError?: (error: Error) => void) {
    await this.delete('/type', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IType);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteTypes(ids: number[], onSuccess?: (data: IType[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/type/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IType[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default TypesService;
