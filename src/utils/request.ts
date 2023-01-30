import axios, { AxiosInstance, AxiosResponse } from "axios";
import qs from "qs";
export interface ApiClientOptions {
  host: string;
  basePath?: string;
}

function buildUrl(host: string, path: string): string {
  return `${host}${path ?? ""}`;
}

let defaultClient: AxiosInstance;

export function configureApiClient(options: ApiClientOptions): AxiosInstance {
  const instance = axios.create({
    baseURL: buildUrl(options.host, options.basePath ?? ""),
    withCredentials: true,
    responseType: "json",
    timeout: 1000 * 30,
    paramsSerializer: {
      serialize: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
    },
  });
  // instance.interceptors.request.use((config: any) => {
  //   const token = localStorage.getItem("X-Access-Token") ?? "";
  //    config.headers["X-Access-Token"] = token;
  //   return config;
  // });
  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
      if (typeof response.data !== "object") {
        return response;
      }
      return response;
    },
    (err) => {
      if (err.response?.status == 401 && location.pathname !== "/login") {
        window.location.href = "/login";
      } else if (err.code === "ERR_NETWORK") {
        console.log("error", "网络中断", err.message);
      } else if (err.code === "ECONNABORTED") {
        console.log("error", "网络超时", err.message);
      }
      return Promise.resolve({
        data: {
          result: null,
          message: err.message,
        },
      });
    }
  );

  defaultClient = instance;
  return apiClient();
}

export const API_BASE_PATH = "/api";

const apiOptions: ApiClientOptions = {
  host: "",
  basePath: API_BASE_PATH,
};

configureApiClient(apiOptions);

export default function apiClient(): AxiosInstance {
  if (defaultClient == null) {
    throw new Error("failing fast: must configure api client before using it");
  }
  return defaultClient;
}
