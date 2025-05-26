/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta } from "@/core/types";

class Repository<T> {
  public loading: {fetchAll: boolean; fetchOne: boolean; create: boolean; patch: boolean; update: boolean; delete: boolean; deleteList: boolean} = {fetchAll: false, fetchOne: false, create: false, patch: false, update: false, delete: false, deleteList: false};
  public error: {fetchAll: string; fetchOne: string; create: string; patch: string; update: string; delete: string; deleteList: string} = {fetchAll: '', fetchOne: '', create: '', patch: '', update: '', delete: '', deleteList: ''};
  setList?: ({data, meta}: {data: T[], meta: Meta}) => void;

  constructor(setList?: ({data, meta}: {data: T[], meta: Meta}) => void) {
    if (setList) {
      this.setList = setList;
    }
  }


  async fetchAll(callfront: () => Promise<{data: T[], meta: Meta}>): Promise<void | {data: T[], meta: Meta}> {
    this.error.fetchAll = '';
    try {
      this.loading.fetchAll = true;
      const data = await callfront();
      this.loading.fetchAll = false;
      if (this.setList) {
        this.setList(data);
      } else {
        return data;
      }

    } catch (error) {
      this.loading.fetchAll = false;
      this.error.fetchAll = error as string;
      console.error("Erreur fetchAll :", error);
      throw error;
    }
  }

  async fetchOne(callfront: (id: number) => Promise<T>, id: number): Promise<T> {
    this.error.fetchOne = '';
    try {
      this.loading.fetchOne = true;
      const data = await callfront(id);
      this.loading.fetchOne = false;
      return data;
    } catch (error) {
      this.loading.fetchOne = false;
      this.error.fetchOne = error as string;
      console.error("Erreur fetchOne :", error);
      throw error;
    }
  }

  async create(callfront: (payload: T) => Promise<T>, payload: T): Promise<T> {
    this.error.create = '';
    try {
      this.loading.create = true;
      const data = await callfront(payload);
      this.loading.create = false;
      return data;
    } catch (error) {
      this.loading.create = false;
      this.error.create = error as string;
      console.error("Erreur create :", error);
      throw error;
    }
  }

  async patch(callfront: (id: number, payload: {attr: string, val: any}) => Promise<T>, id: number, payload: {attr: string, val: any}): Promise<T> {
    this.error.patch = '';
    try {
      this.loading.patch = true;
      const data = await callfront(id, payload);
      this.loading.patch = false;
      return data;
    } catch (error) {
      this.loading.patch = false;
      this.error.patch = error as string;
      console.error("Erreur patch :", error);
      throw error;
    }
  }

  async update(callfront: (id: number, payload: T) => Promise<T>, id: number, payload: T): Promise<T> {
    this.error.update = '';
    try {
      this.loading.update = true;
      const data = await callfront(id, payload);
      this.loading.update = false;
      return data;
    } catch (error) {
      this.loading.update = false;
      this.error.update = error as string;
      console.error("Erreur update :", error);
      throw error;
    }
  }

  async delete(callfront: (id: number) => Promise<T>, id: number): Promise<T> {
    this.error.delete = '';
    try {
      this.loading.delete = true;
      const data = await callfront(id);
      this.loading.delete = false;
      return data;
    } catch (error) {
      this.loading.delete = false;
      this.error.delete = error as string;
      console.error("Erreur delete :", error);
      throw error;
    }
  }

  async deleteList(callfront: (ids: number[]) => Promise<T>, ids: number[]): Promise<T> {
    this.error.deleteList = '';
    try {
      this.loading.deleteList = true;
      const data = await callfront(ids);
      this.loading.deleteList = false;
      return data;
    } catch (error) {
      this.loading.deleteList = false;
      this.error.deleteList = error as string;
      console.error("Erreur delete liste :", error);
      throw error;
    }
  }

}

export default Repository;
