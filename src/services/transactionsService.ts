import { Meta, ParamsQuery } from "@/core/types";
import { ITransaction } from "@/core/interfaces";
import Request from "@/configs/request";

class TransactionsService extends Request<ITransaction> {
  constructor() {
    super();
  }

  async createTransaction(data: ITransaction, onSuccess?: (data: ITransaction) => void, onError?: (error: Error) => void) {
    await this.post('/transaction/create', data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITransaction);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchTransactions(params: ParamsQuery, onSuccess?: (data: { data: ITransaction[], meta: Meta }) => void, onError?: (error: Error) => void) {
    await this.get('/transaction/list', params)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as { data: ITransaction[], meta: Meta });
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async fetchTransaction(id: number, onSuccess?: (data: ITransaction) => void, onError?: (error: Error) => void) {
    await this.getById('/transaction', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITransaction);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async patchTransaction(id: number, patch: { attr: string, val: unknown }, onSuccess?: (data: ITransaction) => void, onError?: (error: Error) => void) {
    await this.patch('/transaction', id, patch)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITransaction);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async updateTransaction(id: number, data: ITransaction, onSuccess?: (data: ITransaction) => void, onError?: (error: Error) => void) {
    await this.put('/transaction', id, data)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITransaction);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteTransaction(id: number, onSuccess?: (data: ITransaction) => void, onError?: (error: Error) => void) {
    await this.delete('/transaction', id)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITransaction);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  async deleteTransactions(ids: number[], onSuccess?: (data: ITransaction[]) => void, onError?: (error: Error) => void) {
    await this.deleteMany('/transaction/list', ids)
      .then(data => {
        if (onSuccess) {
          onSuccess(data as ITransaction[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default TransactionsService;
