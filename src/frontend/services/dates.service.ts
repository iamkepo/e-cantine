import { Meta, ParamsQuery } from "@/core/types";
import { IDate } from "@/core/interfaces";
import Request from "@/configs/request";

class DatesService extends Request<IDate> {
  constructor() {
    super();
  }

  async createDate(data: IDate, onSuccess?: (data: IDate) => void, onError?: (error: Error) => void) {
    await this.post('/date/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDate);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchDates(params: ParamsQuery, onSuccess?: (data: { data: IDate[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/date/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IDate[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchDate(id: number, onSuccess?: (data: IDate) => void, onError?: (error: Error) => void) {
    await this.getById('/date', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDate);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchDate(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IDate) => void, onError?: (error: Error) => void) {
    await this.patch('/date', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDate);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateDate(id: number, data: IDate, onSuccess?: (data: IDate) => void, onError?: (error: Error) => void) {
    await this.put('/date', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDate);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteDate(id: number, onSuccess?: (data: IDate) => void, onError?: (error: Error) => void) {
    await this.delete('/date', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDate);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteDates(ids: number[], onSuccess?: (data: IDate[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/date/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IDate[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default DatesService;
