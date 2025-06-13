import { Meta, ParamsQuery } from "@/core/types";
import { INotification } from "@/core/interfaces";
import Request from "@/configs/request";

class NotificationsService extends Request<INotification> {
  constructor() {
    super();
  }

  async createNotification(data: INotification, onSuccess?: (data: INotification) => void, onError?: (error: Error) => void) {
    await this.post('/notification/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as INotification);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchNotifications(params: ParamsQuery, onSuccess?: (data: { data: INotification[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/notification/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: INotification[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchNotification(id: number, onSuccess?: (data: INotification) => void, onError?: (error: Error) => void) {
    await this.getById('/notification', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as INotification);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchNotification(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: INotification) => void, onError?: (error: Error) => void) {
    await this.patch('/notification', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as INotification);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateNotification(id: number, data: INotification, onSuccess?: (data: INotification) => void, onError?: (error: Error) => void) {
    await this.put('/notification', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as INotification);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteNotification(id: number, onSuccess?: (data: INotification) => void, onError?: (error: Error) => void) {
    await this.delete('/notification', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as INotification);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteNotifications(ids: number[], onSuccess?: (data: INotification[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/notification/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as INotification[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default NotificationsService;
