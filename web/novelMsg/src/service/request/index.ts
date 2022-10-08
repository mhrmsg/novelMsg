import axios from "axios";
import { AxiosInstance } from "axios";

import type { MYRequestInterceptors, MYRequestConfig } from "./types";

class MYRequest {
  instance: AxiosInstance;
  interceptor?: MYRequestInterceptors;

  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config);
    this.interceptor = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseInterceptorCatch
    );
  }

  request<T = any>(config: MYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //如果在发送请求的时候有 interceptors
      //单独的 config 进行修改
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            //在发送请求的时候有对应的 response 拦截
            //单独响应的拦截
            res = config.interceptors.responseInterceptor(res);
          }
          //通过 resolve 将结果返回
          resolve(res);
        })
        .catch((err) => {
          return err;
        });
    });
  }

  get<T = any>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "post" });
  }

  delete<T = any>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "delete" });
  }

  patch<T = any>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "patch" });
  }
}
export default MYRequest;
