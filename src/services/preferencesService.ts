import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IPreference } from "@/core/interfaces";
import Request from "@/configs/request";

class PreferencesService extends Request<IPreference> {
  setData: SetData<IPreference>;

  constructor(setPreference: SetData<IPreference>) {
    super();
    this.setData = setPreference;
  }

  async createPreference(data: IPreference) {
    this.setData('post', 'loading', true);
    await this.post('/preference/create', data)
      .then(data => {
        this.setData('post', 'data', data as IPreference);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchPreferences(params: ParamsQuery & { clientId?: number }) {
    this.setData('get', 'loading', true);
    await this.get('/preference/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IPreference[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchPreference(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/preference', id)
      .then(data => {
        this.setData('getById', 'data', data as IPreference);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchPreference(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/preference', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IPreference);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updatePreference(id: number, data: IPreference) {
    this.setData('put', 'loading', true);
    await this.put('/preference', id, data)
      .then(data => {
        this.setData('put', 'data', data as IPreference);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deletePreference(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/preference', id)
      .then(data => {
        this.setData('delete', 'data', data as IPreference);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deletePreferences(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/preference/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IPreference[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default PreferencesService;
