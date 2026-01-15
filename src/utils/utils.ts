import axios, {AxiosError, Method, AxiosRequestConfig} from 'axios';

import {secureStorage} from './secureStorage';

// Create an Axios instance
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    const token = await secureStorage.getItem('AUTH_TOKEN');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function isObject(variable: unknown): variable is Record<string, unknown> {
  return variable !== null && typeof variable === 'object';
}

export async function apiReq<TResponse = unknown, TData = unknown>(
  endPoint: string,
  data: TData,
  method: Method,
  headers: Record<string, unknown> = {},
  requestOptions: AxiosRequestConfig = {}
): Promise<TResponse> {
  return new Promise(async (res, rej) => {
    try {
      const config: AxiosRequestConfig = {
        headers,
        ...requestOptions,
      };

      let response;

      if (method === 'get' || method === 'delete') {
        response = await axiosInstance.request({
          url: endPoint,
          method,
          params: data as Record<string, unknown>,
          ...config,
        });
      } else {
        response = await axiosInstance.request({
          url: endPoint,
          method,
          data,
          ...config,
        });
      }

      const {data: responseData} = response;
      if ((responseData as {status?: boolean})?.status === false) {
        return rej(responseData);
      }
      return res(responseData as TResponse);
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        return rej(error);
      }

      if (
        error instanceof AxiosError &&
        error.response?.data &&
        isObject(error.response.data)
      ) {
        const errorData = error.response.data as {error?: string} & Record<
          string,
          unknown
        >;
        return rej({
          ...errorData,
          error: errorData.error || 'Network Error',
        });
      } else {
        const apiError = {
          error,
          message: error instanceof Error ? error.message : 'Network Error',
        };
        return rej(apiError);
      }
    }
  });
}

export function apiGet<TResponse = unknown, TData = Record<string, unknown>>(
  endPoint: string,
  data: TData = {} as TData,
  headers: Record<string, unknown> = {},
  requestOptions: AxiosRequestConfig = {}
): Promise<TResponse> {
  return apiReq<TResponse, TData>(
    endPoint,
    data,
    'get',
    headers,
    requestOptions
  );
}

export function apiPost<TResponse = unknown, TData = unknown>(
  endPoint: string,
  data: TData,
  headers: Record<string, unknown> = {},
  requestOptions: AxiosRequestConfig = {}
): Promise<TResponse> {
  return apiReq<TResponse, TData>(
    endPoint,
    data,
    'post',
    headers,
    requestOptions
  );
}

export function apiPut<TResponse = unknown, TData = unknown>(
  endPoint: string,
  data: TData,
  headers: Record<string, unknown> = {},
  requestOptions: AxiosRequestConfig = {}
): Promise<TResponse> {
  return apiReq<TResponse, TData>(
    endPoint,
    data,
    'put',
    headers,
    requestOptions
  );
}

export function apiDelete<TResponse = unknown, TData = Record<string, unknown>>(
  endPoint: string,
  data: TData = {} as TData,
  headers: Record<string, unknown> = {},
  requestOptions: AxiosRequestConfig = {}
): Promise<TResponse> {
  return apiReq<TResponse, TData>(
    endPoint,
    data,
    'delete',
    headers,
    requestOptions
  );
}
