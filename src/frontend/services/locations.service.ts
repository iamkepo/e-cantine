import { Meta, ParamsQuery } from "@/core/types";
import { ILocation } from "@/core/interfaces";
import Request from "@/configs/request";

class LocationsService extends Request<ILocation> {
  constructor() {
    super();
  }

  async createLocation(data: ILocation, onSuccess?: (data: ILocation) => void, onError?: (error: Error) => void) {
    await this.post('/location/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ILocation);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchLocations(params: ParamsQuery, onSuccess?: (data: { data: ILocation[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/location/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: ILocation[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchLocation(id: number, onSuccess?: (data: ILocation) => void, onError?: (error: Error) => void) {
    await this.getById('/location', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ILocation);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchLocation(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: ILocation) => void, onError?: (error: Error) => void) {
    await this.patch('/location', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ILocation);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateLocation(id: number, data: ILocation, onSuccess?: (data: ILocation) => void, onError?: (error: Error) => void) {
    await this.put('/location', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ILocation);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteLocation(id: number, onSuccess?: (data: ILocation) => void, onError?: (error: Error) => void) {
    await this.delete('/location', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ILocation);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteLocations(ids: number[], onSuccess?: (data: ILocation[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/location/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ILocation[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default LocationsService;
