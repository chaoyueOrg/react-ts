import axios, { AxiosInstance, AxiosResponse } from "axios";

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
    paramsSerializer: {
      serialize: (params: unknown): string => JSON.stringify(params),
    },
  });
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
      }
      return Promise.reject(err);
    }
  );

  defaultClient = instance;
  return apiClient();
}

export const API_BASE_PATH = "/api";

const apiOptions: ApiClientOptions = {
  host: import.meta.env.VITE_API_HOST,
  basePath: API_BASE_PATH,
};

configureApiClient(apiOptions);

export default function apiClient(): AxiosInstance {
  if (defaultClient == null) {
    throw new Error("failing fast: must configure api client before using it");
  }
  return defaultClient;
}
