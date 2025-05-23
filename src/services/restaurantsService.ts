/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/services/request";
import { ParamsQuery } from "@/core/types";

const restaurantsService = {
  createRestaurant(data: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/restaurant/create')
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

  fetchRestaurants(params: ParamsQuery) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/restaurant/list')
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

  fetchRestaurant(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/restaurant/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchRestaurant(id: number, patch: { attr: string, val: any }) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/restaurant/${id}`)
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

  updateRestaurant(id: number, data: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/restaurant/${id}`)
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

  deleteRestaurant(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/restaurant/${id}`)
        .method(HttpRequestType.DELETE)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  deleteRestaurants(ids: number[]) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/restaurant/list`)
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

export default restaurantsService;
