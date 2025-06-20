import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import AxiosCustom from "@/configs/AxiosCustom";
import { IAuth } from "@/core";
import Request from "@/configs/request";

class AuthService extends Request<IAuth> {
  constructor() {
    super();
  }
  
  
  logout() {}

  login(credentials: object) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append('/auth/login')
        .setData(credentials)
        .method(HttpRequestType.POST)
        .then(async (response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  register(data: object) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append('/auth/register')
        .method(HttpRequestType.POST)
        .setData(data)
        .then(async (response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  fetchCurrentUser() {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append('/auth/me')
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

export default AuthService;
