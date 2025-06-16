import axios, { AxiosRequestConfig } from 'axios';

export const useAxios = (option: AxiosRequestConfig = {}) => {
  const baseURL = option.baseURL ?? '/api/v2';
  const timeout = option.timeout ?? 20000;
  const headers = option.headers ?? {};

  const req = axios.create({
    timeout,
    baseURL,
    headers
  });

  return req;
};
