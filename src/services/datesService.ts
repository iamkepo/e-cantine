import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IDate } from "@/core/interfaces";
import Request from "@/configs/request";

class DatesService extends Request<IDate> {
  setData: SetData<IDate>;

  constructor(setDate: SetData<IDate>) {
    super();
    this.setData = setDate;
  }

  async createDate(data: IDate) {
    this.setData('post', 'loading', true);
    await this.post('/date/create', data)
      .then(data => {
        this.setData('post', 'data', data as IDate);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchDates(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/date/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IDate[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchDate(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/date', id)
      .then(data => {
        this.setData('getById', 'data', data as IDate);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchDate(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/date', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IDate);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateDate(id: number, data: IDate) {
    this.setData('put', 'loading', true);
    await this.put('/date', id, data)
      .then(data => {
        this.setData('put', 'data', data as IDate);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteDate(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/date', id)
      .then(data => {
        this.setData('delete', 'data', data as IDate);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteDates(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/date/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IDate[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default DatesService;
