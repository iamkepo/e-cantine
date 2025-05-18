import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/helpers/request";

const articlesService = {
  createArticle(credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/article/create')
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

  fetchArticles() {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/article/list')
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  fetchArticle(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/article/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchArticle(id: number, credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/article/${id}`)
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

  updateArticle(id: number, credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/article/${id}`)
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

  deleteArticle(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/article/${id}`)
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

export default articlesService;
