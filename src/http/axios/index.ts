import Request from "./request";
// import { usePermissionStore } from '@/stores/permission'
import type { AxiosRequestConfig } from "axios";
import { downloadLinkFile } from "@/utils";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  rgkRequestType?: string;
}

declare global {
  interface Window {
    globalApi?: {
      business?: string;
      property?: string;
    };
  }
}

const baseURL = import.meta.env.VITE_REQUEST_URL;
const wuyeBaseURL = import.meta.env.VITE_PROPERTY_URL;

const request = new Request({
  baseURL: baseURL,
  timeout: 1000 * 60 * 5,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json;charset=UTF-8",
  },
});

const requestWuye = new Request({
  baseURL: wuyeBaseURL,
  timeout: 1000 * 60 * 5,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json;charset=UTF-8",
  },
});

const rjkRequest = <T>(config: AxiosRequestConfig) => {
  // const permissionStore = usePermissionStore()
  const _sessionId = localStorage.getItem("sessionId");
  const _userId = localStorage.getItem("userId");
  const _oid = localStorage.getItem("oid");
  config.method = config.method || "POST";
  config.url = `?method=${config.url}&sessionId=${_sessionId}&userId=${_userId}&oid=${_oid}`;
  const _globalBaseURL = window?.globalApi?.business ?? "";
  config.baseURL = _globalBaseURL || config.baseURL;
  return request.request<T>(config);
};
const rjkRequestOuter = <T>(
  config: AxiosRequestConfig & { rgkRequestType?: string }
) => {
  // const permissionStore = usePermissionStore()
  const _sessionId = localStorage.getItem("sessionId");
  const _userId = localStorage.getItem("userId");
  const _oid = localStorage.getItem("oid");
  config.method = config.method || "POST";
  config.url = `${config.url}?sessionId=${_sessionId}&userId=${_userId}&oid=${_oid}`;
  const _globalBaseURL = window?.globalApi?.business ?? "";
  config.baseURL = _globalBaseURL || config.baseURL;
  return request.request<T>(config);
};

const rjkWuyeRequest = <T>(config: CustomAxiosRequestConfig) => {
  const _oldToken = localStorage.getItem("oldToken");
  config.method = config.method || "POST";
  config.rgkRequestType = "wuye";
  if (_oldToken) {
    config.headers = {
      ...config.headers,
      Authorization: "Bearer " + _oldToken,
    };
  }
  let queryString = "";
  if (config.method === "GET") {
    const params = config.params || {};
    for (const key in params) {
      let value = params[key];
      if (Array.isArray(params[key])) {
        params[key].forEach((item: any) => {
          queryString += `${key}=${encodeURIComponent(item || "")}&`;
        });
      } else {
        if (typeof value !== "boolean" && typeof value !== "number") {
          value = value || "";
        }
        queryString += `${key}=${encodeURIComponent(value)}&`;
      }
    }
    queryString = queryString.slice(0, -1);
    config.params = {};
  }
  if (queryString) {
    if (config.url?.includes("?")) {
      config.url = `${config.url}&${queryString}`;
    } else {
      config.url = `${config.url}?${queryString}`;
    }
  }
  const _globalBaseURL = window?.globalApi?.property ?? "";
  config.baseURL = _globalBaseURL || config.baseURL;
  return requestWuye.request<T>(config);
};

const rjkWuyeOpenRequest = (
  config: AxiosRequestConfig,
  open = true,
  fullPath = ""
) => {
  // const _oldToken = localStorage.getItem('oldToken')
  let queryString = "";
  if (config.params) {
    for (const key in config.params) {
      if (Object.prototype.hasOwnProperty.call(config.params, key)) {
        queryString += `&${key}=${encodeURIComponent(config.params[key])}`;
      }
    }
  }
  const _globalBaseURL = window?.globalApi?.property ?? "";
  let url = _globalBaseURL || wuyeBaseURL || "";
  if (!url) {
    url = `https://test.ruijiakeyun.com:2234/api`;
  }
  url = url + config.url;
  if (fullPath) {
    url = `${url.replace("/api", "")}${fullPath}`;
  } else {
    url = `${url}?${queryString}`;
  }
  if (open) {
    downloadLinkFile(url);
  }
  return url;
};

const rjkOpenRequest = (
  config: AxiosRequestConfig,
  open = true,
  fullPath = ""
) => {
  const _sessionId = localStorage.getItem("sessionId");
  const _userId = localStorage.getItem("userId");
  const _oid = localStorage.getItem("oid");
  let queryString = "";
  if (config.params) {
    for (const key in config.params) {
      if (Object.prototype.hasOwnProperty.call(config.params, key)) {
        queryString += `&${key}=${encodeURIComponent(config.params[key])}`;
      }
    }
  }
  const _globalBaseURL = window?.globalApi?.business ?? "";
  let url = _globalBaseURL || baseURL || "";
  if (url == "/api") {
    url = `https://api.ruijiakeyun.com:9443/gateway`;
  }
  if (fullPath) {
    url = `${url.replace("/gateway", "")}${fullPath}`;
  } else {
    url = `${url}?method=${config.url}&sessionId=${_sessionId}&userId=${_userId}${queryString}&oid=${_oid}`;
  }
  if (open) {
    downloadLinkFile(url);
  }
  return url;
};

export default rjkRequest;

export {
  request,
  rjkRequestOuter,
  rjkWuyeRequest,
  rjkOpenRequest,
  rjkWuyeOpenRequest,
  rjkRequest,
};
