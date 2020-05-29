const util = {
	doRemoveByValue(arr, val) { //根据数组的对象，从数组中删除
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == val) {
				arr.splice(i, 1);
				break;
			}
		}
	},
	getGroup(list, index = 0, group = []) { //商品排列组合
		var need_apply = new Array();
		need_apply.push(list[index]);
		for (var i = 0; i < group.length; i++) {
			var A = new Array()
			A = A.concat(group[i], list[index])
			need_apply.push(A);
		}
		group.push.apply(group, need_apply);
		if (index + 1 >= list.length) return group;
		else return this.getGroup(list, index + 1, group);
	},
	SortUp (num) { //按照num排序的方法 由小到大
		return function(objectN, objectM) {
			var idN =Number(objectN[num]) 
			var idM =Number(objectM[num]) 
			if (idN < idM) return -1
			else if (idN > idM) return 1
			else return 0
		}
	},
	SortDown (num) { //按照num排序的方法 由大到小
		return function(objectN, objectM) {
			var idN =Number(objectN[num]) 
			var idM =Number(objectM[num]) 
			if (idN < idM) return 1
			else if (idN > idM) return -1
			else return 0
		}
	},
}
export default util
