import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/helpers/request";

const typesService = {
  createType(credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/type/create')
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

  fetchTypes() {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/type/list')
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  fetchType(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/type/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchType(id: number, credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/type/${id}`)
        .setData(credentials)
        .method(HttpRequestType.PATCH)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  updateType(id: number, credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/type/${id}`)
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

  deleteType(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/type/${id}`)
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

export default typesService;
