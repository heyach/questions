### DOM事件
一个DOM元素可以响应用户的交互动作（点击，双击，输入等），事件的触发有冒泡和捕获两种时序
* 事件冒泡 指节点触发事件的时序是从当前节点到父节点，自下而上的触发
* 事件捕获 指节点触发事件的时序是从父节点到当前节点，自上而下的触发

```html
<body onclick="console.log('click body')">
    <div onclick="console.log('click father')">
        <div onclick="console.log('click son')">
            son
        </div>
    </div>
</body>
```
当我们点击最内层的元素son时，不同的事件方式触发的时序
* 冒泡 click son -> click father -> click body
* 捕获 click body -> click father -> click son

由这两种机制，在不同的场景下对是元素的事件绑定也有不同的处理方式
常见的就是元素自身来响应事件
```html
<button onclick="console.log('click')"></button>
```
另一种方式就是由父级元素来响应事件，即将事件委托给父元素，原理是因为事件的冒泡会将事件逐级传递给父元素。
如果要给页面上所有的li元素绑定点击事件，那么需要遍历到所有的li节点，这样会有过多的事件处理程序，影响性能，而将li的事件委托给父元素ul，这样就会减少事件绑定处理程序
```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <!-- ... -->
</ul>
```

用ul来处理li的点击事件
```js
$("ul").on("click", "li", function(e) {
    //
})
```

事件委托的优缺点
优点
* 减少事件注册，节省内存，可以在父元素上代理子元素的事件click
* 简化dom更新时相应事件的更新，比如新添加的子元素上不用注册事件
* 删除某个子元素的时候，不用移除解绑上面的注册事件

缺点
* 事件委托基于冒泡，对于不冒泡的事件不支持
* 层级过多的时候，冒泡过程可能被某层阻断
* 没有限制委托父元素的层级，如果直接在document或者body上代理，会频繁调用处理函数，建议就近委托
* 可能会出现事件误判，比如document代理了button的click，其他人添加click时可能会引起多个click事件