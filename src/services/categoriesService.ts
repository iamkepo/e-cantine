import { Meta, ParamsQuery } from "@/core/types";
import { ICategory } from "@/core/interfaces";
import Request from "@/configs/request";

class CategoriesService extends Request<ICategory> {
  constructor() {
    super();
  }

  async createCategory(data: ICategory, onSuccess?: (data: ICategory) => void, onError?: (error: Error) => void) {
    await this.post('/category/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICategory);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchCategories(params: ParamsQuery, onSuccess?: (data: { data: ICategory[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/category/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: ICategory[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchCategory(id: number, onSuccess?: (data: ICategory) => void, onError?: (error: Error) => void) {
    await this.getById('/category', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICategory);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchCategory(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: ICategory) => void, onError?: (error: Error) => void) {
    await this.patch('/category', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICategory);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateCategory(id: number, data: ICategory, onSuccess?: (data: ICategory) => void, onError?: (error: Error) => void) {
    await this.put('/category', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICategory);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteCategory(id: number, onSuccess?: (data: ICategory) => void, onError?: (error: Error) => void) {
    await this.delete('/category', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICategory);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteCategories(ids: number[], onSuccess?: (data: ICategory[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/category/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICategory[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default CategoriesService;
