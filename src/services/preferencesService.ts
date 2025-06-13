import { Meta, ParamsQuery } from "@/core/types";
import { IPreference } from "@/core/interfaces";
import Request from "@/configs/request";

class PreferencesService extends Request<IPreference> {
  constructor() {
    super();
  }

  async createPreference(data: IPreference, onSuccess?: (data: IPreference) => void, onError?: (error: Error) => void) {
    await this.post('/preference/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPreference);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchPreferences(params: ParamsQuery & { clientId?: number }, onSuccess?: (data: { data: IPreference[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/preference/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IPreference[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchPreference(id: number, onSuccess?: (data: IPreference) => void, onError?: (error: Error) => void) {
    await this.getById('/preference', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPreference);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchPreference(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IPreference) => void, onError?: (error: Error) => void) {
    await this.patch('/preference', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPreference);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updatePreference(id: number, data: IPreference, onSuccess?: (data: IPreference) => void, onError?: (error: Error) => void) {
    await this.put('/preference', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPreference);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deletePreference(id: number, onSuccess?: (data: IPreference) => void, onError?: (error: Error) => void) {
    await this.delete('/preference', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPreference);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deletePreferences(ids: number[], onSuccess?: (data: IPreference[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/preference/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IPreference[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default PreferencesService;
