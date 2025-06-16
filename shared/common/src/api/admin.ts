import { useAxios } from "./setup";
import { requestStart, responseSuccess, responseFail } from "./interceptors";
import { useToken } from "@shared/common";

let baseURL = '/api/v2';
if (location.hostname.includes('debug')) {
  baseURL = `${location.protocol}//admin.debug.8591.com.tw/api/v2`;
}

const http = useAxios({
  baseURL,
  withCredentials: true,
  headers: {
    Client: 'web'
  }
});

const { getAdminToken } = useToken();

http.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
},
(error) => {
  return Promise.reject(error);
});

http.interceptors.request.use(requestStart);
http.interceptors.response.use(responseSuccess, responseFail);

interface IResponse {
  code: number;
  data: any;
  message: string;
}

export const $admin = {

};
