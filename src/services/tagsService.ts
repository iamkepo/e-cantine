/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/services/request";

const tagsService = {
  createTag(credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/tag/create')
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

  fetchTags() {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/tag/list')
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  fetchTag(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/tag/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchTag(id: number, patch: any) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/tag/${id}`)
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

  updateTag(id: number, credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/tag/${id}`)
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

  deleteTag(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/tag/${id}`)
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

export default tagsService;
