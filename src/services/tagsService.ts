import { Meta, ParamsQuery, SetData } from "@/core/types";
import { ITag } from "@/core/interfaces";
import Request from "@/configs/request";

class TagsService extends Request<ITag> {
  setData: SetData<ITag>;

  constructor(setTag: SetData<ITag>) {
    super();
    this.setData = setTag;
  }

  async createTag(data: ITag) {
    this.setData('post', 'loading', true);
    await this.post('/tag/create', data)
      .then(data => {
        this.setData('post', 'data', data as ITag);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchTags(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/tag/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: ITag[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchTag(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/tag', id)
      .then(data => {
        this.setData('getById', 'data', data as ITag);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchTag(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/tag', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as ITag);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateTag(id: number, data: ITag) {
    this.setData('put', 'loading', true);
    await this.put('/tag', id, data)
      .then(data => {
        this.setData('put', 'data', data as ITag);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteTag(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/tag', id)
      .then(data => {
        this.setData('delete', 'data', data as ITag);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteTags(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/tag/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as ITag[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default TagsService;
