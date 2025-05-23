/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/services/request";
import { ParamsQuery } from "@/core/types";

const subscriptionsService = {
  createSubscription(data: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/subscription/create')
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

  fetchSubscriptions(params: ParamsQuery) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/subscription/list')
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

  fetchSubscription(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/subscription/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchSubscription(id: number, patch: { attr: string, val: any }) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/subscription/${id}`)
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

  updateSubscription(id: number, data: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/subscription/${id}`)
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

  deleteSubscription(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/subscription/${id}`)
        .method(HttpRequestType.DELETE)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  deleteSubscriptions(ids: number[]) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/subscription/list`)
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

export default subscriptionsService;
