import { Meta, ParamsQuery, SetData } from "@/core/types";
import { ILocation } from "@/core/interfaces";
import Request from "@/configs/request";

class LocationsService extends Request<ILocation> {
  setData: SetData<ILocation>;

  constructor(setLocation: SetData<ILocation>) {
    super();
    this.setData = setLocation;
  }

  async createLocation(data: ILocation) {
    this.setData('post', 'loading', true);
    await this.post('/location/create', data)
      .then(data => {
        this.setData('post', 'data', data as ILocation);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchLocations(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/location/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: ILocation[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchLocation(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/location', id)
      .then(data => {
        this.setData('getById', 'data', data as ILocation);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchLocation(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/location', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as ILocation);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateLocation(id: number, data: ILocation) {
    this.setData('put', 'loading', true);
    await this.put('/location', id, data)
      .then(data => {
        this.setData('put', 'data', data as ILocation);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteLocation(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/location', id)
      .then(data => {
        this.setData('delete', 'data', data as ILocation);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteLocations(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/location/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as ILocation[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default LocationsService;
