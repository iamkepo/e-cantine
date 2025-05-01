/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { HttpRequestContentType, HttpRequestType } from '../enums';
import authLocal from "./authLocal";

const env = { public: { apiUrl: '' } };

export const client = axios.create();
class Request {   
  public config: any;

  constructor() {
    this.config = {
      baseURL: env.public.apiUrl,
      headers: {
        'content-type': HttpRequestContentType.APPLICATION_JSON,
      },
    };

    client.interceptors.request.use(this.handleRequest, this.handleRequestError);
    client.interceptors.response.use(this.handleResponse, this.handleResponseError);
  }

  private async handleRequest(config: any): Promise<any> {
    const accessToken = await authLocal.getAccessToken();
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }

  private handleRequestError(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  private async handleResponse(response: AxiosResponse): Promise<AxiosResponse> {
    return response;
  }

  private async handleResponseError(error: any) {
    const originalRequest = error.config;
    if (error.response?.status === 401 ) {    
       
      if (error.config.baseURL == env.public.apiUrl+'/auth/signin') { 
        return Promise.reject(error);
      }
      
      if (originalRequest?._retry !== true && error.config.baseURL != env.public.apiUrl+'/auth/refresh') {

        originalRequest._retry = true;
        const refreshToken = await authLocal.getRefreshToken();
        
        if (!refreshToken) {
          await authLocal.removeTokens()
          return Promise.reject(error);
        }

        await axios.post(env.public.apiUrl+'/auth/refresh', {refreshToken: refreshToken})
        .then(async (response: { data: { accessToken: string; refreshToken: string; }; }) => {
          client.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}`;
          originalRequest.headers['authorization'] = `Bearer ${response.data.accessToken}`;
          
          await authLocal.setAccessToken(response.data.accessToken);
          await authLocal.setRefreshToken(response.data.refreshToken)
        }).catch(async (err: { response: { status: number; }; }) => {
          if (err?.response?.status == 401) {
            await authLocal.removeTokens();
          }

          return Promise.reject(err);
        });

        return client(originalRequest);
      }
    }

    return Promise.reject(error);
  }

  public headersAuthorization(token: string | null): this {
    this.config.headers = { ...this.config.headers, "Authorization": token };
    return this;
  }

  public contentType(type: HttpRequestContentType): this {
    this.config.headers = { ...this.config.headers, "content-type": type };
    return this;
  }

  public responseType(type: string): this {
    this.config.headers = { ...this.config.headers, responseType: type };
    return this;
  }

  public append(endpoint: string): this {
    this.config.baseURL += endpoint;
    return this;
  }

  public method(method: HttpRequestType): this {
    this.config.method = method;
    return this;
  }

  public _methode(type: HttpRequestType): this {
    this.config.headers = { 
      ...this.config.headers, 
      "X-HTTP-Method-Override": type,
      "_methode": type 
    };
    return this;
  }

  public params(params: any): this {
    this.config.params = params;
    return this;
  }

  public setData(data: any): this {
    this.config.data = data;

    if (this.config.headers["Content-type"] === HttpRequestContentType.FORM_URLENCODED) {
      this.config.data = JSON.stringify(data);
    }

    if (this.config.headers["Content-type"] === HttpRequestContentType.FORM_DATA) {
      const formData = new FormData();
      for (const key in data) {
        const fieldValue = data[key];
        if (Array.isArray(fieldValue)) {
          // formData.append(key, JSON.stringify(data[key]));

          fieldValue.forEach((x) => {
            if (x) {
              formData.append(`${key}[]`, x);
            } else {
              formData.append(`${key}[]`, "");
            }
          });
        } else {
          if (data[key]) {
            formData.append(key, data[key]);
          } else {
            formData.append(key, "");
          }
        }
      }
      this.config.data = formData;
    }

    return this;
  }

  public async then(callback: (response: AxiosResponse) => void): Promise<void> {
    const response_1 = await client(this.config);
    callback(response_1);
  }

  public catch(callback: (error: AxiosError) => void): void {
    client(this.config)
      .catch((error: AxiosError) => {
        callback(error);
      });
  }
}

export default Request;
