import http from '../common/request'
const GoodService = {
    async getGoodsById() { // 查询所有商品
      var res = await http({
        url: "searchGoods.do",
        method: "POST",
        data: {}
      });
      return res.data.data;
    },
		async deleteGoodsById(id) { // 删除商品
		  var res = await http({
		    url: "deleteGoodsById.do",
		    method: "POST",
		    data: {id:id}
		  });
		  return res;
		},
		async insertGoods(num,name,picUrl,notes,supplier,marketPrice,costPrice) { // 添加商品
		  var res = await http({
		    url: "insertGoods.do",
		    method: "POST",
		    data: {num:num,name:name,picUrl:picUrl,notes:notes,supplier:supplier,marketPrice:marketPrice,costPrice:costPrice}
		  });
		  return res;
		}
}
export default GoodService