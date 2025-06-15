import { Meta, ParamsQuery } from "@/core/types";
import { IArticle } from "@/core/interfaces";
import Request from "@/configs/request";

class ArticlesService extends Request<IArticle> {

  constructor() {
    super();
  }

  async createArticle(data: IArticle, onSuccess?: (data: IArticle) => void, onError?: (error: Error) => void) {
    await this.post('/article/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IArticle);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchArticles(params: ParamsQuery & { categoryId?: number, typeId?: number, tagIds?: number[], price?: number }, onSuccess?: (data: { data: IArticle[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/article/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IArticle[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchArticle(id: number, onSuccess?: (data: IArticle) => void, onError?: (error: Error) => void) {
    await this.getById('/article', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IArticle);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchArticle(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IArticle) => void, onError?: (error: Error) => void) {
    await this.patch('/article', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IArticle);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateArticle(id: number, data: IArticle, onSuccess?: (data: IArticle) => void, onError?: (error: Error) => void) {
    await this.put('/article', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IArticle);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteArticle(id: number, onSuccess?: (data: IArticle) => void, onError?: (error: Error) => void) {
    await this.delete('/article', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IArticle);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteArticles(ids: number[], onSuccess?: (data: IArticle[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/article/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IArticle[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default ArticlesService;
