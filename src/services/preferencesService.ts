/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/services/request";
import { ParamsQuery } from "@/core/types";

const preferencesService = {
  createPreference(data: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/preference/create')
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

  fetchPreferences(params: ParamsQuery) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/preference/list')
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

  fetchPreference(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/preference/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchPreference(id: number, patch: { attr: string, val: any }) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/preference/${id}`)
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

  updatePreference(id: number, data: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/preference/${id}`)
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

  deletePreference(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/preference/${id}`)
        .method(HttpRequestType.DELETE)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  deletePreferences(ids: number[]) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/preference/list`)
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

export default preferencesService;
