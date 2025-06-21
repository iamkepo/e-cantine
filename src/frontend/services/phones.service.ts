import { Meta, ParamsQuery } from "@/core/types";
import { IPhone } from "@/core/interfaces";
import Request from "@/configs/request";

class PhonesService extends Request<IPhone> {
  constructor() {
    super();
  }

  async createPhone(data: IPhone, onSuccess?: (data: IPhone) => void, onError?: (error: Error) => void) {
    await this.post('/phone/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPhone);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchPhones(params: ParamsQuery, onSuccess?: (data: { data: IPhone[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/phone/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IPhone[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchPhone(id: number, onSuccess?: (data: IPhone) => void, onError?: (error: Error) => void) {
    await this.getById('/phone', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPhone);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchPhone(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IPhone) => void, onError?: (error: Error) => void) {
    await this.patch('/phone', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPhone);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updatePhone(id: number, data: IPhone, onSuccess?: (data: IPhone) => void, onError?: (error: Error) => void) {
    await this.put('/phone', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPhone);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deletePhone(id: number, onSuccess?: (data: IPhone) => void, onError?: (error: Error) => void) {
    await this.delete('/phone', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPhone);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deletePhones(ids: number[], onSuccess?: (data: IPhone[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/phone/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPhone[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default PhonesService;
