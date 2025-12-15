import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import AxiosCustom from "@/configs/AxiosCustom";
import { IAuth } from "@/core";
import Request from "@/configs/request";

class AuthService extends Request<IAuth> {
  constructor() {
    super();
  }
  
  logout() {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append('/auth/better/sign-out')
        .method(HttpRequestType.POST)
        .then(async (response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  /**
   * Sign in with email/password using better-auth
   * Creates session via HTTP-only cookies
   */
  login(credentials: object) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append('/auth/better/sign-in')
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

  /**
   * Admin login - still uses better-auth sign-in
   * Role validation happens server-side
   */
  loginAdmin(credentials: object) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append('/auth/better/sign-in')
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

  /**
   * Register new user with better-auth
   */
  register(data: object) {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append('/auth/better/sign-up')
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

  /**
   * Get current user session from better-auth
   */
  fetchCurrentUser() {
    return new Promise((resolve, reject) => {
      new AxiosCustom()
        .append('/auth/better/session')
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


