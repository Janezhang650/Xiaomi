/**
 * @description 模板替换函数
 * @param {Function} tpl 模板文件
 * @param {Object} tplObj 需替换的模板参数对象
 * @returns {String}
 */
function tplReplace (tpl, tplObj) {
  return tpl().replace(/{{(.*?)}}/g, (node, key) => {
    return tplObj[key.trim()];
  });
}

/**
 * @description 去除字符串的空格
 * @param {String} str 字符串
 * @returns {String} 去除空格后的字符串
 */
function trimSpaces (str) {
  return str.replace(/\s+/g, '');
}

/**
 * @description 从URL获取对应key的value值
 * @param {String} key 
 * @returns {String} value
 */
function getUrlQueryValue (key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i')
  const res = window.location.search.substr(1).match(reg);

  return res != null ? decodeURIComponent(res[2]) : null;
}

/**
 * @description 节流函数
 * @param {Function} fn 回调函数
 * @param {Number} delay 延迟时间
 * @returns {Function}
 */
function throttle (fn, delay) {
  let beginTime = new Date(),
      timer = null;

  return function () {
    var _self = this,
        args = arguments,
        currentTime = new Date();
    
    clearTimeout(timer);

    if (currentTime - beginTime >= delay) {
      fn.apply(_self, args);
      beginTime = currentTime;
    } else {
      timer = setTimeout(() => {
        fn.apply(_self, args);
      }, delay)
    }
  }
}

/**
 * @description 获取时间
 * @returns {String} 时间
 */
function getDateTime () {
  const date = new Date();

  const year = date.getFullYear(),
        month = addToZero(date.getMonth() + 1),
        day = addToZero(date.getDate()),
        hour = addToZero(date.getHours()),
        minute = addToZero(date.getMinutes()),
        second = addToZero(date.getSeconds());

  function addToZero (value) {
    return value >= 10 ? value : '0' + value;
  }

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

/**
 * @description 产生6位随机数
 * @returns {String} 返回当前时间戳与随机数的组合
 */
function setRandNum () {
  let num = '';

  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }

  return new Date().getTime() + num;
}

export {
  tplReplace,
  trimSpaces,
  getUrlQueryValue,
  throttle,
  getDateTime,
  setRandNum
}