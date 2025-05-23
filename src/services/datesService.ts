/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/services/request";
import { ParamsQuery } from "@/core/types";

const datesService = {
  createDate(data: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/date/create')
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

  fetchDates(params: ParamsQuery) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/date/list')
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

  fetchDate(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/date/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchDate(id: number, patch: { attr: string, val: any }) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/date/${id}`)
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

  updateDate(id: number, data: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/date/${id}`)
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

  deleteDate(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/date/${id}`)
        .method(HttpRequestType.DELETE)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  deleteDates(ids: number[]) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/date/list`)
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

export default datesService;
