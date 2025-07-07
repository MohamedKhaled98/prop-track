import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import storageUtils from "../utils/storageUtils";
import { notification } from "antd";

const isAuthRoute = (url?: string) => url?.startsWith("/auth");
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const attachAuthInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const isAuthenticating = isAuthRoute(config.url);

    if (!isAuthenticating) {
      config.headers["x-agent-id"] = storageUtils.getAgentAccessId() || "";
    }
    await delay(1000);
    return config;
  });
};

export const attachErrorHandlerInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    response => response,
    async (error: AxiosError | any) => {
      if (error.code === "ERR_NETWORK") notification.error({ message: "Network Error" });

      const data: any = error.response?.data as { message?: string };
      if (data?.message) {
        error.message = data.message;
      }
      if (data?.errors) {
        error.errors = data?.errors;
        error.message = data?.errors?.[0];
      }

      return Promise.reject(error);
    },
  );
};
