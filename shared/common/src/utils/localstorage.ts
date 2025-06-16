// import { useUser } from "../hook";

interface ILocalStorageOption {
  with_uid?: boolean
  json?: number | 1 | 0,
  expires?: number
}

const default_option = {
  with_uid: false // 登入情况默认带uid
};

const keyWithUid = (key: string, with_uid?: boolean) => {
  // const { user } = useUser();
  // if (!user.value) { // 未登入不需要带uid
  //   return key;
  // }
  // const uid = user.value.uid;
  // if (with_uid && uid) {
  //   return `u${uid}_${key}`;
  // }
  return key;
};

const remove = function(key: string, option?: ILocalStorageOption) {
  option = { ...default_option, ...option };
  key = keyWithUid(key, option.with_uid);
  return window.localStorage.removeItem(key);
};

const clear = function() {
  window.localStorage.clear();
};

const set = function(key: string, value: any, option?: ILocalStorageOption) {
  option = { ...default_option, ...option };
  key = keyWithUid(key, option.with_uid);

  let val = value;
  const time = new Date().getTime();
  let endTime = 0;

  if (option.json) {
    val = JSON.stringify(val);
  }
  if (option.expires) { // 天数
    endTime = Math.floor(option.expires * 86400 * 1000 + time);
    val = val + '=>' + endTime;
  }
  return window.localStorage.setItem(key, val);
};

const get = function(key: string, option?: ILocalStorageOption) {
  option = { ...default_option, ...option };
  key = keyWithUid(key, option.with_uid);

  const now = new Date().getTime();
  let data = window.localStorage.getItem(key) || '';
  const val = data.split('=>');

  if (val.length > 1) { // 有设置有效期
    if (now < parseInt(val[1])) {
      data = val[0];
    } else { // 过期
      remove(key);
      data = '';
    }
  }

  try {
    // const ndata = JSON.parse(data);
    // return ndata;
    if (data.indexOf('{') > -1 || data.indexOf('[') > -1) { // 防止 这种类型字符串 815314e7 转成数字 8153140000000
      const ndata = JSON.parse(data);
      return ndata;
    }
    return data;
  } catch (err) {
    // console.log(`获取${key}为非json数据`);
  }
  return data;
};

export const $localstorage = {
  get,
  set,
  clear,
  remove
};
