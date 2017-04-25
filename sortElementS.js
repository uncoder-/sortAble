/*
 *
 */
function sortElementS(obj) {
	this.init(obj);
}
sortElementS.prototype = {
	init: function (args) {
		//初始化
		this.parent = document.querySelector(args.container);
		this.items = document.querySelectorAll(args.itemClass);
		this.control = document.querySelector(args.control);
		this.orginPosition = [];
		this.orginIndex = [];
		this.movePosition = [];

		this.getOriginPosition();
		this.sortEvent();
	},
	/**
	 * [getOriginPosition 获取原始的数据]
	 */
	getOriginPosition: function () {
		var items = this.items;
		var orginIndex = this.orginIndex;
		var orginPosition = this.orginPosition;
		for (var i = 0; i < items.length; i++) {
			var position = {};
			position.top = items[i].offsetTop;
			position.left = items[i].offsetLeft;
			orginPosition.push(position);
			orginIndex.push(items[i].dataset.value);
		}
		//console.log(orginPosition);
	},
	sortOriginIndex: function () {
		//浅拷贝一份原始索引，方便做排序运算不影响原始排序
		var newIndex = [];
		for (var i = 0; i < this.orginIndex.length; i++) {
			newIndex[i] = this.orginIndex[i];
		}
		return newIndex;
	},
	sortEvent: function () {
		var self = this;
		var sortIndex = this.sortOriginIndex();
		this.control.addEventListener("click", function (e) {
			var btn = e.target || e.srcElement;
			//根据类名执行相应的排序算法
			switch (btn.className) {
				case "asc":
					sortIndex.sort(function (a, b) { return a - b; });
					break;
				case "desc":
					sortIndex.sort(function (a, b) { return b - a; });
					break;
				case "random":
					sortIndex.sort(function () { return Math.random() - 0.5; });
					break;
				case "reset":
					sortIndex = JSON.parse(JSON.stringify(self.orginIndex));
					break;
			}
			//根据原始索引和新索引进行计算交换位置
			var movePosition = [];
			for (var i = 0; i < self.orginIndex.length; i++) {
				for (var j = 0; j < sortIndex.length; j++) {
					if (self.orginIndex[i] == sortIndex[j]) {
						var fromTo = {};
						fromTo.value = self.orginIndex[i];
						fromTo.from = i;
						fromTo.to = j;
						movePosition.push(fromTo);
					}
				}
			}
			self.movePosition = movePosition;
			//执行移动
			self.moveToTarget();
		}, false);
	},
	moveToTarget: function () {
		var items = this.items;
		var orginPosition = this.orginPosition;
		var movePosition = this.movePosition;
		movePosition.forEach(function (item, i, array) {
			for (var j = 0; j < items.length; j++) {
				if (items[j].dataset.value == item.value) {
					items[j].style.top = orginPosition[item.to].top - orginPosition[item.from].top + "px";
					items[j].style.left = orginPosition[item.to].left - orginPosition[item.from].left + "px";
				}
			}
		});
	}
};
