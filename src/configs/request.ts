import { ParamsQuery } from "@/core/types";
import AxiosCustom from "./AxiosCustom";
import { HttpRequestType } from "@/enums";
import { AxiosError, AxiosResponse } from "axios";

class Request<T> {

  post(path: string, data: T) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append(`${path}`)
        .setData(data)
        .method(HttpRequestType.POST)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  get(path: string, params: ParamsQuery) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append(`${path}`)
        .params(params)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  getById(path: string, id: number) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append(`${path}/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  patch(path: string, id: number, patch: { attr: string, val: unknown }) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append(`${path}/${id}`)
        .setData({ attr: patch.attr, val: patch.val })
        .method(HttpRequestType.PATCH)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  put(path: string, id: number, data: T) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append(`${path}/${id}`)
        .setData(data)
        .method(HttpRequestType.PUT)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  delete(path: string, id: number) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append(`${path}/${id}`)
        .method(HttpRequestType.DELETE)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  deleteMany(path: string, ids: number[]) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append(`${path}`)
        .setData({ ids })
        .method(HttpRequestType.DELETE)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }
}

export default Request;
