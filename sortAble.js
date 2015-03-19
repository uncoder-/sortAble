/*
 *
 */
function sortAble(obj){
	this.container = obj.container;
	this.itemClass = obj.itemClass;
	this.control = obj.control;
	this.init();
}
sortAble.prototype={
	init:function(){
		//初始化
		this.parent = document.querySelector(this.container);
		this.items = document.querySelectorAll(this.itemClass);

		this.orginPosition = [];
		this.orginIndex = [];
		this.movePosition = [];

		this.getOriginPosition();
		this.sortEvent();
		
	},
	/**
	 * [getOriginPosition 获取原始的数据]
	 */
	getOriginPosition:function(){
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
	sortEvent:function(){
		var self = this;
		self.control = document.querySelector(".control");
		self.control.addEventListener("click",function(e){
			var btn = e.target||e.srcElement;
			switch (btn.className){
				case "asc":
					self.sortByAsc();
					break;
				case "desc":
					self.sortByDesc();
					break;
				case "random":
					self.sortByRandom();
					break;
				case "reset":
					self.sortByReset();
					break;
				default:
					break;
			}
		},false);
	},
	sortByAsc:function(){
		var newIndex = new Array();
		for (var i = 0; i < this.orginIndex.length; i++) {
			newIndex[i] = (this.orginIndex[i]);
		};
		//这里排序的内容暂时只考虑数字
		newIndex.sort(function(a,b){return a-b;});
		//存储
		var movePosition=this.movePosition;
		for (var i = 0; i < this.orginIndex.length; i++) {
			var fromTo = {};
			for(var j = 0;j < newIndex.length;j++){
				if(this.orginIndex[i]==newIndex[j]){
					fromTo.item=this.orginIndex[i]; 
					fromTo.from=i;
					fromTo.to=j;
					movePosition.push(fromTo);
				}
			}
		};
		//执行移动
		this.moveToTarget();
	},
	sortByDesc:function(){
		var newIndex = new Array();
		for (var i = 0; i < this.orginIndex.length; i++) {
			newIndex[i] = (this.orginIndex[i]);
		};
		//这里排序的内容暂时只考虑数字
		newIndex.sort(function(a,b){return b-a;});
		//存储
		var movePosition=this.movePosition;
		for (var i = 0; i < this.orginIndex.length; i++) {
			var fromTo = {};
			for(var j = 0;j < newIndex.length;j++){
				if(this.orginIndex[i]==newIndex[j]){
					fromTo.item = this.orginIndex[i]; 
					fromTo.from = i;
					fromTo.to   = j;
					movePosition.push(fromTo);
				}
			}
		};
		//移动
		this.moveToTarget();
	},
	sortByRandom:function(){
		var newIndex = new Array();
		for (var i = 0; i < this.orginIndex.length; i++) {
			newIndex[i] = (this.orginIndex[i]);
		};
		//洗牌算法，Fisher-Yates乱序算法
		newIndex.sort(function(){return Math.random()-0.5});
		//存储
		var movePosition=this.movePosition;
		for (var i = 0; i < this.orginIndex.length; i++) {
			var fromTo = {};
			for(var j = 0;j < newIndex.length;j++){
				if(this.orginIndex[i]==newIndex[j]){
					fromTo.item=this.orginIndex[i]; 
					fromTo.from=i;
					fromTo.to=j;
					movePosition.push(fromTo);
				}
			}
		};
		//移动
		this.moveToTarget();
	},
	sortByReset:function(){
		var newIndex = new Array();
		for (var i = 0; i < this.orginIndex.length; i++) {
			newIndex[i] = (this.orginIndex[i]);
		};
		//存储
		var movePosition=this.movePosition;
		for (var i = 0; i < this.orginIndex.length; i++) {
			var fromTo = {};
			for(var j = 0;j < newIndex.length;j++){
				if(this.orginIndex[i]==newIndex[j]){
					fromTo.item=this.orginIndex[i]; 
					fromTo.from=i;
					fromTo.to=j;
					movePosition.push(fromTo);
				}
			}
		};
		//移动
		this.moveToTarget();
	},
	moveToTarget:function(){
		var items = this.items;
		var orginPosition = this.orginPosition;
		var movePosition = this.movePosition;
		for (var i = 0; i < movePosition.length; i++) {
			console.log("值为："+movePosition[i].item,"，原位置："+movePosition[i].from,"，目标位置："+movePosition[i].to);
			if(movePosition[i].from < movePosition[i].to){
				//说明向右边运动
				for (var j = 0; j < items.length; j++) {
					if(items[j].dataset.value == movePosition[i].item){
						items[j].style.top = orginPosition[movePosition[i].to].top-orginPosition[movePosition[i].from].top+"px";
						items[j].style.left = orginPosition[movePosition[i].to].left-orginPosition[movePosition[i].from].left+"px"
						
						items[j].addEventListener("transitionend", function(e){
							e.target.style.transition="";
						}, false);
					}
				}
			}else{
				//说明向左运动
				for (var j = 0; j < items.length; j++) {
					if(items[j].dataset.value == movePosition[i].item){
						items[j].style.top = orginPosition[movePosition[i].to].top-orginPosition[movePosition[i].from].top+"px";
						items[j].style.left = orginPosition[movePosition[i].to].left-orginPosition[movePosition[i].from].left+"px"
						items[j].addEventListener("transitionend", function(e){
							e.target.style.transition="";
						}, false);
					}
				}
			}
		};
	}
}