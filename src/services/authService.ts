import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/services/request";

const base = '/api/v1/';
const authService = {
  login(credentials: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(base+'auth/login')
        .setData(credentials)
        .method(HttpRequestType.POST)
        .then(async (response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  register(data: object) {
    return new Promise((resolve, reject) => {
      new Request()
        .append(base+'auth/register')
        .method(HttpRequestType.POST)
        .setData(data)
        .then(async (response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },

  fetchCurrentUser() {
    return new Promise((resolve, reject) => {
      new Request()
        .append(base+'auth/me')
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }
};

export default authService;
