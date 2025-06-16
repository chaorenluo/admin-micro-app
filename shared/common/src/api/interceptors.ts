import { AxiosRequestConfig, AxiosResponse } from 'axios';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';
import { Message, Notification } from "@modules/arco-design";

interface ICodeMessage {
  [propName: number]: string
}
const StatusCodeMessage: ICodeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)'
};

const isMicroAppEnvironment = () => {
  return window.__MICRO_APP_ENVIRONMENT__;
};

export const requestStart = (request) => {
  // NProgress.start();
  return request;
};

// 接收拦截器
export const responseSuccess = (response: AxiosResponse) => {
  const { data } = response;
  const { message, code } = data;
  console.log('responseSuccess------1', response);

  // if (code != 200) {
  // NProgress.done();
  // 如果错误信息长度过长，使用 Notification 进行提示
  // if (message.length <= 15) {
  //   ElMessage.error(message || '服务器端错误');
  // } else {
  //   ElNotification.error(message || '服务器端错误');
  // }
  // }

  // NProgress.done();
  return response.data;
};

export const responseFail = (error: any) => {
  console.log('responseFail------', error);
  console.log('window.__MICRO_APP_ENVIRONMENT__', window.__MICRO_APP_ENVIRONMENT__);
  const { message, response } = error;
  if (!response) {
    return Promise.reject(error);
  }

  if (response.status != 200) {
    // 如果错误信息长度过长，使用 Notification 进行提示
    if (message.length <= 15) {
      Message.error(message || '服务器端错误');
    } else {
      Notification.error(message || '服务器端错误');
    }
  }

  // NProgress.done();
  // Message.clear();
  // const res = Object.assign({}, response);
  // res && Message.error(StatusCodeMessage[response.status] || '系统异常, 请检查网络或联系管理员！');

  return Promise.reject(error);
};
