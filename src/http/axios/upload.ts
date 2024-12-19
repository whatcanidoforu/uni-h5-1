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
  const _sessionId = localStorage.getItem("sessionId");
  const _userId = localStorage.getItem("userId");
  const _oid = localStorage.getItem("oid");
  config.method = "POST";
  config.url = `?sessionId=${_sessionId}&userId=${_userId}&method=${config.url}&oid=${_oid}`;
  const _globalBaseURL = window?.globalApi?.business ?? "";
  config.baseURL = _globalBaseURL || config.baseURL;
  return request.request<T>(config);
};

export default uploadRequest;
