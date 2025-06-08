import Request from "@/configs/request";
import { Meta, ParamsQuery, SetData } from "@/core/types";
import { IUser } from "@/core/interfaces";

class UsersService extends Request<IUser> {
  setData: SetData<IUser>;

  constructor(setUser: SetData<IUser>) {
    super();
    this.setData = setUser;
  }

  async createUser(data: IUser) {
    this.setData('post', 'loading', true);
    await this.post('/user/create', data)
      .then(data => {
        this.setData('post', 'data', data as IUser);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }
  async fetchUsers(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/user/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: IUser[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchUser(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/user', id)
      .then(data => {
        this.setData('getById', 'data', data as IUser);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchUser(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/user', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as IUser);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateUser(id: number, data: IUser) {
    this.setData('put', 'loading', true);
    await this.put('/user', id, data)
      .then(data => {
        this.setData('put', 'data', data as IUser);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteUser(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/user', id)
      .then(data => {
        this.setData('delete', 'data', data as IUser);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteUsers(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/user/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as IUser[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
};

export default UsersService;
