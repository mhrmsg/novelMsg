//service 的统一出口
import MYRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      //可以在这里做 token 判断 拦截
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (config) => {
      return config;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});

export default myRequest;
