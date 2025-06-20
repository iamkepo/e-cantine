import Request from "@/configs/request";
import { Meta, ParamsQuery } from "@/core/types";
import { IUser } from "@/core/interfaces";

class UsersService extends Request<IUser> {
  constructor() {
    super();
  }

  async createUser(data: IUser, onSuccess?: (data: IUser) => void, onError?: (error: Error) => void) {
    await this.post('/user/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IUser);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
  async fetchUsers(params: ParamsQuery, onSuccess?: (data: { data: IUser[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/user/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: IUser[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchUser(id: number, onSuccess?: (data: IUser) => void, onError?: (error: Error) => void) {
    await this.getById('/user', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IUser);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchUser(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: IUser) => void, onError?: (error: Error) => void) {
    await this.patch('/user', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IUser);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateUser(id: number, data: IUser, onSuccess?: (data: IUser) => void, onError?: (error: Error) => void) {
    await this.put('/user', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IUser);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteUser(id: number, onSuccess?: (data: IUser) => void, onError?: (error: Error) => void) {
    await this.delete('/user', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IUser);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteUsers(ids: number[], onSuccess?: (data: IUser[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/user/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IUser[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
};

export default UsersService;
