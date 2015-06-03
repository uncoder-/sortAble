/*
 *
 */
function sortAble(obj) {
	this.container = obj.container;
	this.itemClass = obj.itemClass;
	this.controlEl = obj.control;
	this.init();
}
sortAble.prototype = {
	init: function () {
		//初始化
		this.parent = document.querySelector(this.container);
		this.items = document.querySelectorAll(this.itemClass);
		this.control = document.querySelector(this.controlEl);
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
			position.height = items[i].offsetHeight;
			position.width = items[i].offsetWidth;
			orginPosition.push(position);
			orginIndex.push(items[i].dataset.value);
		};
		//console.log(orginPosition);
	},
	sortEvent: function () {
		var self = this;
		this.control.addEventListener("click", function (e) {
			var btn = e.target || e.srcElement;
			//新建一个索引，然后复制原始索引
			var newIndex = new Array();
			for (var i = 0; i < self.orginIndex.length; i++) {
				newIndex[i] = (self.orginIndex[i]);
			};
			//根据类名执行相应的排序算法
			switch (btn.className) {
				case "asc":
					newIndex.sort(function (a, b) { return a - b; });
					break;
				case "desc":
					newIndex.sort(function (a, b) { return b - a; });
					break;
				case "random":
					newIndex.sort(function () { return Math.random() - 0.5 });
					break;
				case "reset":
					break;
				default:
					break;
			}
			//根据原始索引和新索引进行计算交换位置
			var movePosition = self.movePosition;
			for (var i = 0; i < self.orginIndex.length; i++) {
				var fromTo = {};
				for (var j = 0; j < newIndex.length; j++) {
					if (self.orginIndex[i] == newIndex[j]) {
						fromTo.item = self.orginIndex[i];
						fromTo.from = i;
						fromTo.to = j;
						movePosition.push(fromTo);
					}
				}
			};
			//执行移动
			self.moveToTarget();
		}, false);
	},
	moveToTarget: function () {
		var items = this.items;
		var orginPosition = this.orginPosition;
		var movePosition = this.movePosition;
		for (var i = 0; i < movePosition.length; i++) {
			//console.log("值为：" + movePosition[i].item, "，原位置：" + movePosition[i].from, "，目标位置：" + movePosition[i].to);
			for (var j = 0; j < items.length; j++) {
				if (movePosition[i].from < movePosition[i].to) {
					//向右运动
					if (items[j].dataset.value == movePosition[i].item) {
						items[j].style.top = orginPosition[movePosition[i].to].top - orginPosition[movePosition[i].from].top + "px";
						items[j].style.left = orginPosition[movePosition[i].to].left - orginPosition[movePosition[i].from].left + "px";
					}
				} else {
					//向左运动
					if (items[j].dataset.value == movePosition[i].item) {
						items[j].style.top = orginPosition[movePosition[i].to].top - orginPosition[movePosition[i].from].top + "px";
						items[j].style.left = orginPosition[movePosition[i].to].left - orginPosition[movePosition[i].from].left + "px";
					}
				}
			}
		};
	}
}