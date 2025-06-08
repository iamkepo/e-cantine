import { Meta, ParamsQuery, SetData } from "@/core/types";
import { ICategory } from "@/core/interfaces";
import Request from "@/configs/request";

class CategoriesService extends Request<ICategory> {
  setData: SetData<ICategory>;
  constructor(setCategory: SetData<ICategory>) {
    super();
    this.setData = setCategory;
  }

  async createCategory(data: ICategory) {
    this.setData('post', 'loading', true);
    await this.post('/category/create', data)
      .then(data => {
        this.setData('post', 'data', data as ICategory);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchCategories(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/category/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: ICategory[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchCategory(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/category', id)
      .then(data => {
        this.setData('getById', 'data', data as ICategory);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchCategory(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/category', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as ICategory);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateCategory(id: number, data: ICategory) {
    this.setData('put', 'loading', true);
    await this.put('/category', id, data)
      .then(data => {
        this.setData('put', 'data', data as ICategory);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteCategory(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/category', id)
      .then(data => {
        this.setData('delete', 'data', data as ICategory);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteCategories(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/category/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as ICategory[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default CategoriesService;
