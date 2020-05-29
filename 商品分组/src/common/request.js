import axios from 'axios'
import config from '../common/config'
import ConfigUtil from '../common/ConfigUtil'
import util from '../common/util'
export default async function request (options) {
	if(options.header) {
		options.header['content-type'] = "application/x-www-form-urlencoded";
	}else {
		options.header = {'content-type':"application/x-www-form-urlencoded"}
	}
// 	if(!options.dateType || options.dateType == "json") { //如果设为 json，会尝试对返回的数据做一次 JSON.parse
// 		if(!options.data) {
// 			options.data = {};
// 		}
// 		console.log(options.data)
// 	}else {
// 		if(!options.data) {
// 			options.data = "";
// 		}
// 		options.data += "&token=" + uni.getStorageSync('bindToken');
// 		options.type = "json";
// 	}
	options.method = 'POST';
	options.url = 'http://localhost:8080/yuen/' + options.url;
	options.data = ConfigUtil.toTransformRequestBodyParameters(options.data);
	const response = await axios(options);
	return response
}
