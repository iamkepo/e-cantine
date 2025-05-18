import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/helpers/request";

const articleTagsService = {
  createArticleTag(credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/article-tag/create')
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

  fetchArticleTags() {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/article-tag/list')
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  fetchArticleTag(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/article-tag/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchArticleTag(id: number, credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/article-tag/${id}`)
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

  updateArticleTag(id: number, credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/article-tag/${id}`)
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

  deleteArticleTag(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/article-tag/${id}`)
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

export default articleTagsService;
