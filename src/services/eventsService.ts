import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IEvent } from "@/core/interfaces";
import Request from "@/configs/request";

class EventsService extends Request<IEvent> {
  setData: SetData<IEvent>;

  constructor(setEvent: SetData<IEvent>) {
    super();
    this.setData = setEvent;
  }

  async createEvent(data: IEvent) {
    this.setData('post', 'loading', true);
    await this.post('/event/create', data)
      .then(data => {
        this.setData('post', 'data', data as IEvent);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchEvents(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/event/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IEvent[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchEvent(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/event', id)
      .then(data => {
        this.setData('getById', 'data', data as IEvent);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchEvent(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/event', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IEvent);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateEvent(id: number, data: IEvent) {
    this.setData('put', 'loading', true);
    await this.put('/event', id, data)
      .then(data => {
        this.setData('put', 'data', data as IEvent);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteEvent(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/event', id)
      .then(data => {
        this.setData('delete', 'data', data as IEvent);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteEvents(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/event/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IEvent[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default EventsService;
