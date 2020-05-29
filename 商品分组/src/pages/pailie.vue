<template>
	<div >
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h3 class="panel-title" @click="get_current_url('a','你好')">组合商品</h3>
				</div>
			</div>
						<!-- <div class="form-inline">
				<label>
					Id:
					<input type="text" class="form-control" v-model="id" />
				</label>
				<label>
					Name:
					<input type="text" class="form-control" v-model="name" />
				</label>
				<label>
					选择图片：
					<input type="file" style="opacity:0; filter:alpha(opacity=0); height: 60px; width: 60px; position: absolute; top: 0; left: 0; z-index: 9;"
					 @click="loadPic()">
					<img src="{$headimgurl}" style="height: 60px; width: 60px;" id="icon">
				</label>

				<label>
					市场价:
					<input type="text" class="form-control" v-model="value" />
				</label>
				<label>
					成本价:
					<input type="text" class="form-control" v-model="cost" />
				</label>
				<input type="button" value="添加" class="btn btn-primary" @click="add()" />
			</div> -->
			<div class="panel-body form-inline">
				<input type="button" value="排序(市场价)" class="btn btn-primary" @click="sortValue()" />
				<input type="button" value="排序(成本价)" class="btn btn-primary" @click="sortCost()" />
				<input type="button" value="刷新" class="btn btn-primary" @click="refresh()" />
				<label>
					搜索名称关键字：
					<input type="text" class="form-control" v-model="keywords" />
				</label>
				<label>
					最低市场价：
					<input type="text" class="form-control" v-model="minCost" />
				</label>
				<label>
					最高成本价：
					<input type="text" class="form-control" v-model="maxCost" />
				</label>
				<input type="button" value="分组" class="btn btn-primary" @click="subGroup()" />
			</div>
			<div></div>
			<table width="90%" border="0" cellspacing="1" cellpadding="4" bgcolor="#cccccc" class="tabtop13" align="center">
				<thead>
					<tr>
						<td class="btbg font-center">Id</td>
						<td class="btbg font-center">名称</td>
						<td class="btbg font-center">商品图</td>
						<td class="btbg font-center">属性</td>
						<td class="btbg font-center">供货商</td>
						<td class="btbg font-center">创建时间</td>
						<td class="btbg font-center">市场价</td>
						<td class="btbg font-center">成本价</td>
						<td class="btbg font-center">操作</td>
					</tr>
				</thead>
				<tbody class="font-center">
					<tr v-for="item in search(keywords)" :key="item.id">
						<td>{{item.id}}</td>
						<td v-text="item.name"></td>
						<td><img :src="item.img" height="100" /></td>
						<td v-text="item.name"></td>
						<td v-text="item.name"></td>
						<td>{{item.ctime | dateFormat}}</td>
						<td>{{item.value}}</td>
						<td>{{item.cost}}</td>
						<td>
							<a href="" @click.prevent="del(item.id)">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
			<hr />
			<table width="90%" border="0" cellspacing="1" cellpadding="4" bgcolor="#cccccc" class="tabtop13" align="center">
				<thead>
					<tr>
						<td class="btbg font-center">单品/组合</td>
						<td class="btbg font-center">Id</td>
						<td class="btbg font-center">名称</td>
						<td class="btbg font-center">商品图</td>
						<td class="btbg font-center">属性</td>
						<td class="btbg font-center">供货商</td>
						<td class="btbg font-center">市场价</td>
						<td class="btbg font-center">成本价</td>
					</tr>
				</thead>
				<tbody class="font-center" v-for="item in listUp" :key="item.id">
					<tr v-if="!item.length">
						<td>单品</td>
						<td>{{item.id}}</td>
						<td v-text="item.name"></td>
						<td><img :src="item.img" height="100" /></td>
						<td v-text="item.name"></td>
						<td v-text="item.name"></td>
						<td>{{item.value}}</td>
						<td>{{item.cost}}</td>
					</tr>
					<tr v-else v-for="(items,i) in item" :key="items.id">
						<td :rowspan="item.length" v-if="i < 1">组合</td>
						<td>{{items.id}}</td>
						<td v-text="items.name"></td>
						<td><img :src="items.img" height="100" /></td>
						<td v-text="items.name"></td>
						<td v-text="items.name"></td>
						<td>{{items.value}}</td>
						<td>{{items.cost}}</td>
					</tr>
				</tbody>
			</table>



    <div  class="introduce-box">
      <div class="introduce-left">
        <div style="height:100px;font-size:31px;color: #333333">会用了为企业提供专业的视频说明书整体解决方案</div>
        <div class="cell-box">
          <img src="../../assets/logo.png" :style="{width:'29px',height:'29px',margin:'10px'}"/>
          <div class="cell-content">
            <div>从专业的视频说明书展示工具</div>
            <div>到专业的视频说明书内容制作服务</div>
          </div>
        </div>
        <div class="cell-box">
          <img src="../../assets/logo.png" :style="{width:'29px',height:'29px',margin:'10px'}"/>
          <div class="cell-content">
            <div>企业可以通过会用了快速实现说明书的视频化</div>
            <div>客户将会更了解你的产品</div>
            <div>客户的满意度会得到显著提升</div>
          </div>
        </div>
        <div class="cell-box">
          <img src="../../assets/logo.png" :style="{width:'29px',height:'29px',margin:'10px'}"/>
          <div class="cell-content">
            <div>通过会用了的云端分析平台</div>
            <div>你将第一次如此真实得了解你的客户数据</div>
          </div>
        </div>
        <button style="width:200px;height:42px;
background:linear-gradient(108deg,rgba(16,186,254,1) 0%,rgba(16,161,254,1) 100%);border-radius:5px;color: #fff;font-size: 14px ">为什么以及如何接入会用了</button>
      </div>
      <div class="introduce-right">
        <img src="../../assets/logo.png" :style="{width:'405px',height:'330px',margin:'10px'}"/>
      </div>
    </div>
  </div>
</template>

<script>
	import GoodService from '@/serive/GoodSerive.js'
	import util from '../common/util.js'
	export default {
		name: 'goods',
		data() {
			return {
				id: '',
				name: '',
				img: '',
				cost: '',
				value: '',
				keywords: '',
				minCost: 1000, //市场价
				maxCost: 3000, //成本价
				listUp: [],
				list: [{
						id: 1,
						name: '奔驰',
						value: 2000,
						cost: 1000,
						img: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg",
						supplier: "", //供货商
						ctime: new Date()
					},
					{
						id: 2,
						name: '宝马',
						value: 3000,
						cost: 2000,
						img: "./img/logo.png",
						supplier: "", //供货商
						ctime: new Date()
					},
					{
						id: 3,
						name: '大众',
						value: 1000,
						cost: 800,
						img: "./img/logo.png",
						supplier: "", //供货商
						ctime: new Date()
					},
					{
						id: 4,
						name: '玛莎拉蒂',
						value: 5000,
						cost: 3000,
						img: "./img/logo.png",
						supplier: "", //供货商
						ctime: new Date()
					}
				]
			}
		},
		created(){
			// console.log('开始检测是否存在绑定账户...');
			// this.doStatisticsOrderStatus();
		},
		methods: {

			// async doStatisticsOrderStatus() {//获取订单数
			// 		var orderStatusCountList = await GoodService.getGoodsById();
			// 		console.log(orderStatusCountList);
			//
			// },
      get_current_url(param, value){
      	var param_value = "";
      	var connector = "";	//参数连接符
      	var add_param = param + "=" + value;
      	
      	var current_href = window.location.href;
      	if(current_href.indexOf("?") >= 0 ) { 
      		connector = "&";
      	}else{
      		connector = "?";
      	}
      	if(current_href.indexOf(param) >= 0){	//如果参数存在，就替换此参数
      		param_value = get_url_param(param);
      		var pre_param = param + "=" + param_value;
      		current_href = current_href.replace(pre_param,add_param);
      	}else{
      		current_href += connector + add_param;
      	}
      	window.location.href = current_href;
      },
       
      //获取url中参数的值
      get_url_param(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
          var r = window.location.search.substr(1).match(reg);  //匹配目标参数
          if (r != null) return r[2]; return null; //返回参数值        
          //if (r != null) return unescape(r[2]); return null; //返回参数值
      },
				refresh() {
					var objectArraySort = function(id) { //按照市场价排序的方法
						return function(objectN, objectM) {
							var idN = objectN[id]
							var idM = objectM[id]
							if (idN < idM) return -1
							else if (idN > idM) return 1
							else return 0
						}
					}
					this.list.sort(objectArraySort('id')) //根据list中的value排序
				},
				sortValue() {
					var objectArraySort = function(value) { //按照市场价排序的方法
						return function(objectN, objectM) {
							var valueN = objectN[value]
							var valueM = objectM[value]
							if (valueN < valueM) return 1
							else if (valueN > valueM) return -1
							else return 0
						}
					}
					this.list.sort(objectArraySort('value')) //根据list中的value排序
				},
				sortCost() {
					var objectArraySort = function(cost) { //按照成本价排序的方法
						return function(objectN, objectM) {
							var costN = objectN[cost]
							var costM = objectM[cost]
							if (costN < costM) return 1
							else if (costN > costM) return -1
							else return 0
						}
					}
					this.list.sort(objectArraySort('cost')) //根据list中的cost排序
				},
				add() {
					var car = {
						id: this.id,
						name: this.name,
						value: this.value,
						cost: this.cost,
						img: this.img,
						ctime: new Date()
					}
					this.list.push(car)
					this.id = this.name = this.value = this.cost = ""
				}, //添加的方法
				del(id) {
					var index = this.list.findIndex(item => {
						if (item.id == id) {
							return true;
						}
					})
					this.list.splice(index, 1)
				},
				search(keywords) {
					var newList = []
					this.list.forEach(item => {
						if (item.name.indexOf(keywords) != -1) {
							newList.push(item)
						}
					})
					return newList
				},
				// 					loadPic(){
				// 						console.log(obj, id)
				// 						console.log("11111")
				// 						function handleFiles(obj, id) {
				// 							console.log("222222")
				// 							file = document.getElementById("icon");
				// 							console.log(files)
				// 							var files = obj.files;
				// 							console.log(files)
				// 							img = new Image();
				// 							if (window.URL) {
				// 								//File API
				// 								img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
				// 								img.onload = function(e) {
				// 									window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
				// 								}
				// 							}
				// 							console.log(file.src)
				// 							console.log(img.src)
				// 							file.src = img.src;
				// 							console.log(this.list)
				// 						}
				// 						handleFiles(obj, id)
				//
				// 					},

				subGroup() {
					console.log("222222")
					this.listUp = []
					function getGroup (list, index = 0, group = []) { //商品排列组合
						var need_apply = new Array();
						need_apply.push(list[index]);
						for (var i = 0; i < group.length; i++) {
							var A = new Array()
							A = A.concat(group[i], list[index])
							need_apply.push(A);
						}
						group.push.apply(group, need_apply);
						if (index + 1 >= list.length) return group;
						else return getGroup(list, index + 1, group);
					}
					var groupList = getGroup(this.list)
					console.log(groupList)
					groupList.forEach(goods => {
						if (goods.cost && (goods.cost >= this.minCost) && (goods.value <= this.maxCost)) { // 大于最低市场价 小于最高成本价
							this.listUp.push(goods)
						}
						if (goods.cost == undefined) {
							goods.cost = 0
							goods.value = 0
							goods.forEach(good => {
								goods.cost += good.cost
								goods.value += good.value
							})
							if ((goods.cost >= this.minCost) && (goods.value <= this.maxCost)) {
								this.listUp.push(goods)
							}
						}
					})
				},


		},
		onLoad(options) {},
		onShow() {
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.app {
		margin-bottom: 100px;
	}

	.form-control {
		width: 5%;
	}

	.panel-body {
		margin-left: 5%;
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.form-inline {
		width: 80%;
	}

	.btbg {
		background: #e9faff !important
	}

	.group {
		border: #000000 1px solid;
		background: yellow;
	}

	.groups {
		background: green;
	}

	.font-center {
		text-align: center
	}

	.tabtop13 td {
		background-color: #ffffff;
		height: 25px;
		line-height: 150%;
	}
</style>
