import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/helpers/request";

const categoriesService = {
  createCategory(credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/category/create')
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

  fetchCategories() {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/category/list')
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  fetchCategory(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/category/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchCategory(id: number, credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/category/${id}`)
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

  updateCategory(id: number, credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/category/${id}`)
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

  deleteCategory(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/category/${id}`)
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

export default categoriesService;
