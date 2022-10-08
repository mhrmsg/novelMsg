import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface MYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  responseInterceptor?: (res: T) => T;

  requestInterceptorCatch?: (error: any) => any;
  responseInterceptorCatch?: (error: any) => any;
}

export interface MYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MYRequestInterceptors<T>;
  showLoading?: boolean;
}
