下载解压，运行index.html即可

html:容器:
``` html
<div class="control">
	<button class="asc">升序</button>
	<button class="desc">降序</button>
	<button class="random">随机</button>
	<button class="reset">还原</button>
</div>
<div id="container">
		<div class="item" data-value="55">55</div>
</div>
```
css样式:
``` css
#container{
	position: relative;
	height: 500px;
	width: 600px;
	border: 1px solid red;
}
.item{
	position: relative;
	display: inline-block;
	top: 0;
	left: 0;
	height: 50px;
	width: 50px;
	border: 1px solid red;
	background: gray;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	margin: 7px;
	transition:all 500ms ease-in-out;
}
```
定义：
``` javascript
var sortElementS = new sortElementS({
	container:"#container",
	itemClass:".item",
	control:".control"
});
```
