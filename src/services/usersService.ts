/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/services/request";

const usersService = {
  createUser(credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/user/create')
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

  fetchUsers({ 
    take = 10, 
    search = "", 
    status = "", 
    page = 1 
  }: { 
    take?: number, 
    search?: string, 
    status?: string, 
    page?: number 
  }) {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/user/list')
        .params({
          take,
          search,
          status,
          page
        })
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  fetchUser(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/user/${id}`)
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  patchUser(id: number, patch: {attr: string, val: any}) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/user/${id}`)
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

  updateUser(id: number, credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/user/${id}`)
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

  deleteUser(id: number) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(`/user/${id}`)
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

export default usersService;
