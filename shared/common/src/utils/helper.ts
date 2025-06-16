export namespace $helper {

  // 時間戳 轉 時間日期
  export function date_format(fmt, date) { // eg: date_format('yyyy-MM-dd hh:mm', time)
    // author: meizz
    const o = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)); }
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); }
    }
    return fmt;
  }
  // 普通日期字符串轉換 eg: 2019-01-30 10:00:00
  export function date2UnixTime(date_time) {
    if (!date_time) {
      return 0;
    }
    return Math.floor(Date.parse(new Date(date_time.replace(' ', 'T') + '+08:00')) / 1000);
  }

  /**
   * 日期转今天、昨天、
   * @param {String} [timestamp] [当前日期]
   * @param {Boolean} [isPrefix] [是否要带今天、昨天]
   * @return {String} [新日期格式]
   */
  export function date2Format(timestamp, isPrefix = true, fmt = 'yyyy-MM-dd hh:mm') {
    function zeroize(num) {
      return (String(num).length == 1 ? '0' : '') + num;
    }

    let prefix = '';
    let formatTime = '';
    // safari不支持new Date转换'-'，需要转成'/'
    // const stampDate = new Date(timestamp.replace(/-/g, '/'));
    const stampDate = new Date(timestamp.replace(' ', 'T') + '+08:00');
    const stampY = stampDate.getFullYear();
    const stampM = stampDate.getMonth() + 1;
    const stampD = stampDate.getDate();
    const stampH = stampDate.getHours();
    const stampI = stampDate.getMinutes();

    // 当前日期
    const curDate = new Date();

    // 今天
    if (curDate.getFullYear() === stampY && curDate.getMonth() + 1 === stampM && curDate.getDate() === stampD) {
      prefix = '今天 ';
      formatTime = zeroize(stampH) + ':' + zeroize(stampI);
    } else {
      // 时间戳加一天转换成的日期对象
      const newDate = new Date(curDate.getTime() - 86400000);
      if (newDate.getFullYear() === stampY && newDate.getMonth() + 1 === stampM && newDate.getDate() === stampD) {
        prefix = '昨天 ';
        formatTime = zeroize(stampH) + ':' + zeroize(stampI);
      } else if (curDate.getFullYear() === stampY) { // 今年
        formatTime = zeroize(stampM) + '.' + zeroize(stampD);
      } else {
        formatTime = date_format(fmt, stampDate);
      }
    }

    return isPrefix ? prefix + formatTime : formatTime;
  }

  // 延时
  export function waitSleep(timeout = 3000) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve(true);
      }, timeout)
    );
  }
}
