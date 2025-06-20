import { Meta, ParamsQuery } from "@/core/types";
import { ICommand } from "@/core/interfaces";
import Request from "@/configs/request";

class CommandsService extends Request<ICommand> {
  constructor() {
    super();
  }

  async createCommand(data: ICommand, onSuccess?: (data: ICommand) => void, onError?: (error: Error) => void) {
    await this.post('/command/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICommand);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchCommands(params: ParamsQuery, onSuccess?: (data: { data: ICommand[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/command/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: ICommand[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchCommand(id: number, onSuccess?: (data: ICommand) => void, onError?: (error: Error) => void) {
    await this.getById('/command', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICommand);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchCommand(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: ICommand) => void, onError?: (error: Error) => void) {
    await this.patch('/command', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICommand);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateCommand(id: number, data: ICommand, onSuccess?: (data: ICommand) => void, onError?: (error: Error) => void) {
    await this.put('/command', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICommand);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteCommand(id: number, onSuccess?: (data: ICommand) => void, onError?: (error: Error) => void) {
    await this.delete('/command', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICommand);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteCommands(ids: number[], onSuccess?: (data: ICommand[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/command/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ICommand[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default CommandsService;
