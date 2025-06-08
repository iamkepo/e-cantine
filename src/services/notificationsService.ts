import { Meta, ParamsQuery, SetData } from "@/core/types";
import { INotification } from "@/core/interfaces";
import Request from "@/configs/request";

class NotificationsService extends Request<INotification> {
  setData: SetData<INotification>;

  constructor(setNotification: SetData<INotification>) {
    super();
    this.setData = setNotification;
  }

  async createNotification(data: INotification) {
    this.setData('post', 'loading', true);
    await this.post('/notification/create', data)
      .then(data => {
        this.setData('post', 'data', data as INotification);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchNotifications(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/notification/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: INotification[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchNotification(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/notification', id)
      .then(data => {
        this.setData('getById', 'data', data as INotification);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchNotification(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/notification', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as INotification);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateNotification(id: number, data: INotification) {
    this.setData('put', 'loading', true);
    await this.put('/notification', id, data)
      .then(data => {
        this.setData('put', 'data', data as INotification);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteNotification(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/notification', id)
      .then(data => {
        this.setData('delete', 'data', data as INotification);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteNotifications(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/notification/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as INotification[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default NotificationsService;
