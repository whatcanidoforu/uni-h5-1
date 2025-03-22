import Request from "./request";
import type { AxiosRequestConfig } from "axios";

const request = new Request({
  baseURL: import.meta.env.VITE_UPLOAD_URL,
  timeout: 1000 * 60 * 5,
  headers: {
    "Content-Type": "multipart/form-data;charset=UTF-8",
  },
});

const uploadRequest = <T>(config: AxiosRequestConfig) => {
  const _sessionId = uni.getStorageSync("sessionId");
  const _userId = uni.getStorageSync("userId");
  config.method = "POST";
  config.url = `?sessionId=${_sessionId}&userId=${_userId}&method=${config.url}&oid=1`;
  const _globalBaseURL = uni.getStorageSync("globalApiBusiness") || "";
  config.baseURL = _globalBaseURL || config.baseURL;
  return request.request<T>(config);
};

export default uploadRequest;
