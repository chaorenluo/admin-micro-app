const get = function(name: string) {
  const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  const arr = document.cookie.match(reg);
  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
};
const set = function(key: string, value: string, options: any) {
  const now_domain = location.hostname;
  options = Object.assign({}, options, {
    domain: now_domain,
    path: '/'
  });
  let expires = options.expires;
  if (typeof options.expires === 'number') {
    expires = new Date();
    expires.setTime(expires.getTime() + options.expires * 24 * 60 * 60 * 1000);
  }
  const val = value ? encodeURIComponent(value) : '';
  document.cookie =
    key +
    '=' +
    val +
    (options.path ? '; path=' + options.path : '') +
    (expires ? '; expires=' + expires.toGMTString() : '') +
    (options.domain ? '; domain=' + options.domain : '') +
    (options.secure ? '; secure' : '');
};

const del = (name: string) => set(name, '', { expires: -1 });

export const $cookie = {
  get,
  set,
  del
};
