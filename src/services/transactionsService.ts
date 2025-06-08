import { Meta, ParamsQuery, SetData } from "@/core/types";
import { ITransaction } from "@/core/interfaces";
import Request from "@/configs/request";

class TransactionsService extends Request<ITransaction> {
  setData: SetData<ITransaction>;

  constructor(setTransaction: SetData<ITransaction>) {
    super();
    this.setData = setTransaction;
  }

  async createTransaction(data: ITransaction) {
    this.setData('post', 'loading', true);
    await this.post('/transaction/create', data)
      .then(data => {
        this.setData('post', 'data', data as ITransaction);
      })
      .catch(error => {
        this.setData('post', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('post', 'loading', false);
      });
  }

  async fetchTransactions(params: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/transaction/list', params)
      .then(data => {
        this.setData('get', 'data', data as { data: ITransaction[], meta: Meta });
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }

  async fetchTransaction(id: number) {
    this.setData('getById', 'loading', true);
    await this.getById('/transaction', id)
      .then(data => {
        this.setData('getById', 'data', data as ITransaction);
      })
      .catch(error => {
        this.setData('getById', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('getById', 'loading', false);
      });
  }

  async patchTransaction(id: number, patch: { attr: string, val: unknown }) {
    this.setData('patch', 'loading', true);
    await this.patch('/transaction', id, patch)
      .then(data => {
        this.setData('patch', 'data', data as ITransaction);
      })
      .catch(error => {
        this.setData('patch', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('patch', 'loading', false);
      });
  }

  async updateTransaction(id: number, data: ITransaction) {
    this.setData('put', 'loading', true);
    await this.put('/transaction', id, data)
      .then(data => {
        this.setData('put', 'data', data as ITransaction);
      })
      .catch(error => {
        this.setData('put', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('put', 'loading', false);
      });
  }

  async deleteTransaction(id: number) {
    this.setData('delete', 'loading', true);
    await this.delete('/transaction', id)
      .then(data => {
        this.setData('delete', 'data', data as ITransaction);
      })
      .catch(error => {
        this.setData('delete', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('delete', 'loading', false);
      });
  }

  async deleteTransactions(ids: number[]) {
    this.setData('deleteMany', 'loading', true);
    await this.deleteMany('/transaction/list', ids)
      .then(data => {
        this.setData('deleteMany', 'data', data as ITransaction[]);
      })
      .catch(error => {
        this.setData('deleteMany', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('deleteMany', 'loading', false);
      });
  }
}

export default TransactionsService;
