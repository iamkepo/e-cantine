import { Meta, ParamsQuery, SetData } from "@/core/types";
import { ICommand } from "@/core/interfaces";
import Request from "@/configs/request";

class CommandsService extends Request<ICommand> {
  setData: SetData<ICommand>;

  constructor(setCommand: SetData<ICommand>) {
    super();
    this.setData = setCommand;
  }

  async createCommand(data: ICommand) {
    this.setData('post', 'loading', true);
    await this.post('/command/create', data)
      .then(data => {
        this.setData('post', 'data', data as ICommand);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchCommands(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/command/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: ICommand[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchCommand(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/command', id)
      .then(data => {
        this.setData('getById', 'data', data as ICommand);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchCommand(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/command', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as ICommand);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateCommand(id: number, data: ICommand) {
    this.setData('put', 'loading', true);
    await this.put('/command', id, data)
      .then(data => {
        this.setData('put', 'data', data as ICommand);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteCommand(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/command', id)
      .then(data => {
        this.setData('delete', 'data', data as ICommand);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteCommands(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/command/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as ICommand[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default CommandsService;
