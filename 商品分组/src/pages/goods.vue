<template>
	<div>
		<div class="panel panel-primary">
			<div class="panel-heading">
				<h3 class="panel-title">组合商品</h3>
			</div>
		</div>
		<div class="form-inline">
			<label>
				编号:
				<input type="text" class="form-control" v-model="num" />
			</label>
			<label>
				名称:
				<input type="text" class="form-control" v-model="name" />
			</label>
			<label>
				选择图片：
				<input type="file" name="" id="" value="" name="saveFile" @change="tirggerFile($event)" style="width: 70px;" />
				<img :src="picUrl" alt="" style="height: 60px; width: 60px;"/>
			</label>
			<label>
				属性:
				<input type="text" class="form-control" v-model="notes" />
			</label>
			<label>
				供货商:
				<input type="text" class="form-control" v-model="supplier" />
			</label>
			<label>
				市场价:
				<input type="text" class="form-control" v-model="marketPrice" />
			</label>
			<label>
				成本价:
				<input type="text" class="form-control" v-model="costPrice" />
			</label>
			<input type="button" value="添加" class="btn btn-primary" @click="add()" />
		</div>
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
					<td class="btbg font-center">编号</td>
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
					<td>{{item.num}}</td>
					<td v-text="item.name"></td>
					<td><img :src="item.picUrl" height="100" /></td>
					<td v-text="item.notes"></td>
					<td v-text="item.supplier"></td>
					<td>{{item.creationTime}}</td>
					<td>{{item.marketPrice}}</td>
					<td>{{item.costPrice}}</td>
					<td>
						<a href="" @click.prevent="del(item.id)">删除</a>
					</td>
				</tr>
			</tbody>
		</table>
		<hr />
		<table v-if="listUp.length != 0" width="90%" border="0" cellspacing="1" cellpadding="4" bgcolor="#cccccc" class="tabtop13"
		 align="center">
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
					<td>{{item.num}}</td>
					<td v-text="item.name"></td>
					<td><img :src="item.picUrl" height="100" /></td>
					<td v-text="item.name"></td>
					<td v-text="item.name"></td>
					<td>{{item.marketPrice}}</td>
					<td>{{item.costPrice}}</td>
				</tr>
				<tr v-else v-for="(items,i) in item" :key="items.id">
					<td :rowspan="item.length" v-if="i < 1">组合</td>
					<td>{{items.id}}</td>
					<td v-text="items.name"></td>
					<td><img :src="items.picUrl" height="100" /></td>
					<td v-text="items.name"></td>
					<td v-text="items.name"></td>
					<td>{{items.marketPrice}}</td>
					<td>{{items.costPrice}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import GoodService from '@/serive/GoodSerive.js'
	import util from '../common/util.js'
	import TimeUtils from '../common/TimeUtil.js'

	export default {
		name: 'goods',
		data() {
			return {
				num: '',
				name: '',
				notes: '',
				supplier: '',
				costPrice: '',
				marketPrice: '',
				picUrl:'',
				keywords: '',
				minCost: 0, //最低市场价
				maxCost: '', //最高成本价
				listUp: [],
				list: [{
						num: 1,
						name: '五粮液',
						marketPrice: 400,
						costPrice: 200,
						picUrl: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg",
						supplier: "某市", //供货商
						notes: "规格：。。。。",
						creationTime: TimeUtils.formatGeneralTime(new Date(), "Y-M-D H:m:s")
					},
					{
						num: 2,
						name: '蓝瓶',
						marketPrice: 260,
						costPrice: 30,
						picUrl: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg",
						supplier: "某市", //供货商
						notes: "规格：。。。。",
						creationTime: TimeUtils.formatGeneralTime(new Date(), "Y-M-D H:m:s")
					},
					{
						num: 3,
						name: '乌龟',
						marketPrice: 200,
						costPrice: 80,
						picUrl: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg",
						supplier: "某市", //供货商
						notes: "规格：。。。。",
						creationTime: TimeUtils.formatGeneralTime(new Date(), "Y-M-D H:m:s")
					},
					{
						num: 4,
						name: '手机',
						marketPrice: 1000,
						costPrice: 700,
						picUrl: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg",
						supplier: "某市", //供货商
						notes: "规格：。。。。",
						creationTime: TimeUtils.formatGeneralTime(new Date(), "Y-M-D H:m:s")
					},

				]
			}
		},
		created() {
			console.log('开始检测是否存在绑定账户...');
			this.getGoods();

		},
		methods: {
			async getGoods() { //获取商品
				var goodsList = await GoodService.getGoodsById();
				goodsList.forEach(goods => {
					goods.creationTime = TimeUtils.formatGeneralTime(goods.creationTime, "Y-M-D H:m:s")
					this.list.push(goods)
				})
				this.list.sort(util.SortUp('num'))
			},
			async insertGoods() { //获取商品 num,name,picUrl,notes,supplier,marketPrice,costPrice
				var goods = await GoodService.insertGoods(this.num, this.name, this.picUrl, this.notes, this.supplier, this.marketPrice,
					this.costPrice)
				console.log(goods)
			},
			refresh() {
				this.list.sort(util.SortUp('num')) //根据list中的id排序
			},
			sortValue() {
				this.list.sort(util.SortUp('marketPrice')) //根据list中的value排序
			},
			sortCost() {
				this.list.sort(util.SortUp('costPrice')) //根据list中的cost排序
			},
			tirggerFile(event) {
				console.log(event)
				var self = this;
				var file = event.target.files[0]
				var param = new FormData() // 创建form对象
				param.append('file', file) // 通过append向form对象添加数据
				param.append('type', '1') // 添加form表单中其他数据
				console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
				var config = {
					headers: {
						'Content-Type': 'multipart/form-data',
						'Access-Control-Allow-Origin': '*'
					}
				}
				self.$http.post('http://localhost:8080/yuen/multimedia/doUploadHeadPortrait.do', param, config)
					.then(function(value) {
						var result = value.data.status;
						if (result == 1) {
							if (value.data.data == 0) {
								
							} else {
								console.log('请求处理');
								console.log(value.data.data)
								this.picUrl = 'http://localhost:8080/pic/'+value.data.data
								console.log(this.picUrl)
							}
						}
					}, function() {
						console.log('请求失败处理');
					});


			},
			add() {
				this.insertGoods()
				var good = {
					num: this.num,
					name: this.name,
					picUrl: this.picUrl,
					notes: this.notes,
					supplier: this.supplier,
					marketPrice: this.marketPrice,
					costPrice: this.costPrice
				}
				this.list.push(good)
				console.log(good)
				this.num = this.name = this.marketPrice = this.costPrice = this.picUrl = this.notes = this.supplier = ""
			}, //添加的方法
			del(id) {
				var index = this.list.findIndex(item => {
					if (item.id == id) {
						GoodService.deleteGoodsById(id)
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

			subGroup() {
				this.listUp = []
				var groupList = util.getGroup(this.list)
				groupList.forEach(goods => {
					console.log(goods)
					if (goods.marketPrice && (goods.marketPrice >= this.minCost) && (goods.costPrice <= this.maxCost)) { // 大于最低市场价 小于最高成本价
						this.listUp.push(goods)
					}
					if (goods.marketPrice == undefined) {
						goods.costPrice = 0
						goods.marketPrice = 0
						console.log(goods)
						goods.forEach(good => {
							goods.costPrice += good.costPrice
							goods.marketPrice += good.marketPrice
						})
						if ((goods.marketPrice >= this.minCost) && (goods.costPrice <= this.maxCost)) {
							this.listUp.push(goods)
						}
					}
					console.log(this.listUp)
				})
			},


		},

		onLoad(options) {},
		onShow() {},
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
