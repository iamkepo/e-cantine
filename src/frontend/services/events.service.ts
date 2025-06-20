import { Meta, ParamsQuery } from "@/core/types";
import { IEvent } from "@/core/interfaces";
import Request from "@/configs/request";

class EventsService extends Request<IEvent> {
  constructor() {
    super();
  }

  async createEvent(data: IEvent, onSuccess?: (data: IEvent) => void, onError?: (error: Error) => void) {
    await this.post('/event/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IEvent);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchEvents(params: ParamsQuery, onSuccess?: (data: { data: IEvent[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/event/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IEvent[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchEvent(id: number, onSuccess?: (data: IEvent) => void, onError?: (error: Error) => void) {
    await this.getById('/event', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IEvent);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchEvent(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IEvent) => void, onError?: (error: Error) => void) {
    await this.patch('/event', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IEvent);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateEvent(id: number, data: IEvent, onSuccess?: (data: IEvent) => void, onError?: (error: Error) => void) {
    await this.put('/event', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IEvent);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteEvent(id: number, onSuccess?: (data: IEvent) => void, onError?: (error: Error) => void) {
    await this.delete('/event', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IEvent);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteEvents(ids: number[], onSuccess?: (data: IEvent[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/event/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IEvent[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default EventsService;
