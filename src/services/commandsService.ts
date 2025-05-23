/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/services/request";
import { ParamsQuery } from "@/core/types";

const commandsService = {
  createCommand(data: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/command/create')
        .setData(data)
        .method(HttpRequestType.POST)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  fetchCommands(params: ParamsQuery) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/command/list')
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

  fetchCommand(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/command/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchCommand(id: number, patch: { attr: string, val: any }) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/command/${id}`)
        .setData({ attr: patch.attr, val: patch.val })
        .method(HttpRequestType.PATCH)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  updateCommand(id: number, data: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/command/${id}`)
        .setData(data)
        .method(HttpRequestType.PUT)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  deleteCommand(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/command/${id}`)
        .method(HttpRequestType.DELETE)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  deleteCommands(ids: number[]) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/command/list`)
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

export default commandsService;
