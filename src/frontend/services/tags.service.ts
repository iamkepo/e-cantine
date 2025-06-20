import { Meta, ParamsQuery } from "@/core/types";
import { ITag } from "@/core/interfaces";
import Request from "@/configs/request";

class TagsService extends Request<ITag> {
  constructor() {
    super();
  }

  async createTag(data: ITag, onSuccess?: (data: ITag) => void, onError?: (error: Error) => void) {
    await this.post('/tag/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITag);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchTags(params: ParamsQuery, onSuccess?: (data: { data: ITag[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/tag/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: ITag[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchTag(id: number, onSuccess?: (data: ITag) => void, onError?: (error: Error) => void) {
    await this.getById('/tag', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITag);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchTag(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: ITag) => void, onError?: (error: Error) => void) {
    await this.patch('/tag', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITag);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateTag(id: number, data: ITag, onSuccess?: (data: ITag) => void, onError?: (error: Error) => void) {
    await this.put('/tag', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITag);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteTag(id: number, onSuccess?: (data: ITag) => void, onError?: (error: Error) => void) {
    await this.delete('/tag', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITag);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteTags(ids: number[], onSuccess?: (data: ITag[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/tag/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITag[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default TagsService;
