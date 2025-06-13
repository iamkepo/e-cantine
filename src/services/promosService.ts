import { Meta, ParamsQuery } from "@/core/types";
import { IPromo } from "@/core/interfaces";
import Request from "@/configs/request";

class PromosService extends Request<IPromo> {
  constructor() {
    super();
  }

  async createPromo(data: IPromo, onSuccess?: (data: IPromo) => void, onError?: (error: Error) => void) {
    await this.post('/promo/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPromo);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchPromos(params: ParamsQuery, onSuccess?: (data: { data: IPromo[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/promo/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IPromo[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchPromo(id: number, onSuccess?: (data: IPromo) => void, onError?: (error: Error) => void) {
    await this.getById('/promo', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPromo);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchPromo(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IPromo) => void, onError?: (error: Error) => void) {
    await this.patch('/promo', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPromo);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updatePromo(id: number, data: IPromo, onSuccess?: (data: IPromo) => void, onError?: (error: Error) => void) {
    await this.put('/promo', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPromo);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deletePromo(id: number, onSuccess?: (data: IPromo) => void, onError?: (error: Error) => void) {
    await this.delete('/promo', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPromo);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deletePromos(ids: number[], onSuccess?: (data: IPromo[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/promo/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPromo[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default PromosService;
