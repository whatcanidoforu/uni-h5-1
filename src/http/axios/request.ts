import axios, { isCancel } from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import type { Result } from "./types";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  rgkRequestType?: string;
}

interface CustomerInternalAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  rgkRequestType?: string;
}

interface CustomerAxiosResponse<T = any, D = any> extends AxiosResponse<T, D> {
  config: CustomerInternalAxiosRequestConfig;
}

const whiteList = ["common.addUsageLog", "auth.getUserAuthValues"];

class Request {
  // axios 实例
  instance: AxiosInstance;
  // * 存放取消请求控制器Map
  abortControllerMap: Map<string, AbortController>;

  constructor(config: CustomAxiosRequestConfig) {
    this.instance = axios.create(config);
    // 初始化存放取消请求控制器Map
    this.abortControllerMap = new Map();
    // 请求拦截
    this.instance.interceptors.request.use(
      (res: CustomerInternalAxiosRequestConfig) => {
        const url = res.url || "";
        if (!whiteList.find((item) => url.includes(`method=${item}&`))) {
          const controller = new AbortController();
          res.signal = controller.signal;
          this.abortControllerMap.set(url, controller);
        }
        return res;
      },
      (err: AxiosError) => {
        uni.showToast({
          title: "请求失败",
          icon: "none",
        });
        return Promise.reject(err);
      }
    );

    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      (res: CustomerAxiosResponse) => {
        const url = res.config.url || "";
        this.abortControllerMap.delete(url);
        if (res.config.rgkRequestType == "outer") {
          return res;
        }
        if (res.config.rgkRequestType == "wuye") {
          return res;
        }
        if (res.data.code === "SUCCESS" || res.data.message == "success") {
          return res;
        }
        if (
          res.config.responseType == "stream" ||
          res.config.responseType == "blob"
        ) {
          return res;
        }
        let message = "";
        switch (res.data.code) {
          case "ERROR_BIZ":
            message = res.data.message || "业务错误";
            break;
          case "ERROR_SYS":
            message = res.data.message || "系统错误";
            break;
          case "ERROR_NOT_LOGIN":
            message = "未登录";
            uni.showToast({
              title: message,
              icon: "none",
            });
            this.cancelAllRequest();
            uni.removeStorageSync("sessionId");
            uni.removeStorageSync("userId");
            uni.removeStorageSync("oid");
            uni.removeStorageSync("oldToken");
            uni.removeStorageSync("oldEmpId");
            const pages = getCurrentPages();
            const currentPage = pages[pages.length - 1];
            const currentRoute = currentPage.route || "";
            if (currentRoute !== "pages/login/index") {
              uni.reLaunch({
                url: "/pages/login/index",
              });
            }
            break;
          case "ERROR_ILLEGAL_REQ":
            message = "非法请求";
            break;
          case "ERROR_AUTH":
            message = "没有权限";
            break;
          default:
            message = "未知错误";
            break;
        }
        if (res.data.code !== "ERROR_NOT_LOGIN") {
          if (!url.includes("company.qixin.gateway")) {
            uni.showToast({
              title: message,
              icon: "none",
            });
          }
        }
        return Promise.reject(res.data);
      },
      (err) => {
        if (!isCancel(err)) {
          console.log(">>>>>> 1", err);
          uni.showToast({
            title: err?.response?.data?.message || "网络异常",
            icon: "none",
          });
        }
        return Promise.reject(err);
      }
    );

    // router.afterEach(() => {
    //   // 路由导航取消所有请求
    //   this.cancelAllRequest()
    // })
  }
  request<T>(config: CustomAxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res: CustomerAxiosResponse<Result<T>>) => {
          if (res.config.rgkRequestType == "outer") {
            resolve(res.data as T);
          } else if (res.config.rgkRequestType == "wuye") {
            resolve(res.data as T);
          } else if (
            res.config.responseType == "stream" ||
            res.config.responseType == "blob"
          ) {
            resolve(res.data as T);
          } else {
            resolve(res.data.body);
          }
        })
        .catch((err: AxiosError) => {
          reject(err);
        });
    });
  }
  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort();
    }
    this.abortControllerMap.clear();
  }
  /**
   * 取消指定的请求
   * @param url 待取消的请求URL
   */
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort();
      this.abortControllerMap.delete(_url);
    }
  }
}

export default Request;
