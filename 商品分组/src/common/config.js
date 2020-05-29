var extConfig = {
	"extEnable": true,
	"extAppid": "wx009019c2db5e2248",
	"ext": {
	  "groupId": "2c933e6b6147d1c70162b928daec15ec",
	  "appId": "wx009019c2db5e2248",
	  "wxaAppId":"wx009019c2db5e2248",
	  "path":"https://swdev.suconnected.com/",
	  "rootTradingAreaId":"2c933e6763401dff0163402485780000",
	  "tradingAreaNo":"1152",
	  "rootTradingAreaNo":"1162"
	}
}
const config = {
	getPath() {
		return extConfig.ext.path;
	},
	getWXAAppId() {
		return extConfig.ext.wxaAppId;
	},
	getRootTradingAreaId() {
		return extConfig.ext.rootTradingAreaId;
	},
	getGroupId() {
		return extConfig.ext.groupId;
	}
}
export default config