/**
 * Created by mac on 17/12/15.
 */

const ConfigUtil = {
  async doCheckProgramEnv() { //检查环境是小程序还是网页
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){    //判断是否是微信环境
      return 'wxEnv'
    }else{
      //非微信环境逻辑
      return 'web'
    }

  },
  getServerDomain(){
    //return 'http://192.168.1.45:8080'
    //return 'https://swdev.suconnected.com'
    return 'https://www.suconnected.com'
  },
  toTransformRequestBodyParameters(obj) { //转化http请求的body为可用的格式 JSON
    var query = '';
    var name, value, fullSubName, subName, subValue, innerObj, i;
    for (name in obj) {
      value = obj[name];
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this.toTransformRequestBodyParameters(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          if(subValue==null||subValue===""){
            continue;
          }
          fullSubName = name + '.' + subName + '';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this.toTransformRequestBodyParameters(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  }

}
export default ConfigUtil
