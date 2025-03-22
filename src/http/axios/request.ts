import type { Result } from "./types";

interface CustomAxiosRequestConfig {
  url?: string;
  method?:
    | "GET"
    | "OPTIONS"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT"
    | undefined;
  baseURL?: string;
  headers?: any;
  params?: any;
  data?: any;
  timeout?: number;
  responseType?: string;
  rgkRequestType?: string;
}

class Request {
  private baseURL: string;
  private timeout: number;
  private headers: any;
  private requestTask: any;

  constructor(config: CustomAxiosRequestConfig) {
    this.baseURL = config.baseURL || "";
    this.timeout = config.timeout || 1000 * 60 * 5;
    this.headers = config.headers || {};
  }

  request<T>(config: CustomAxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseURL}${config.url}`;
      const method = config.method || "GET";
      const header = { ...this.headers, ...config.headers };
      const data = config.data || {};
      const timeout = config.timeout || this.timeout;

      this.requestTask = uni.request({
        url,
        method,
        header,
        data,
        timeout,
        success: (res: any) => {
          if (res.statusCode === 200) {
            console.log("请求成功 res.statusCode", res);
            resolve(res.data.body as T);
          } else {
            reject(res.data.body);
          }
        },
        fail: (err: any) => {
          reject(err);
        },
      });
    });
  }

  cancelRequest() {
    if (this.requestTask) {
      this.requestTask.abort();
    }
  }
}

export default Request;
