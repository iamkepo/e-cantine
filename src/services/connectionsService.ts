/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/services/request";
import { ParamsQuery } from "@/core/types";

const connectionsService = {
  createConnection(credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/connection/create')
        .setData(credentials)
        .method(HttpRequestType.POST)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  fetchConnections(params: ParamsQuery) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/connection/list')
        .params(params)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  fetchConnection(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/connection/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchConnection(id: number, patch: any) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/connection/${id}`)
        .setData({
          attr: patch.attr,
          val: patch.val
        })
        .method(HttpRequestType.PATCH)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  updateConnection(id: number, credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/connection/${id}`)
        .setData(credentials)
        .method(HttpRequestType.PUT)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  deleteConnection(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/connection/${id}`)
        .method(HttpRequestType.DELETE)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  deleteConnections(ids: number[]) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/connection/list`)
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
};

export default connectionsService;
