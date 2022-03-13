### html题
***

### 语义化的理解
用带有语义表达的标签实现页面的结构，段落用`p`，标题用`h`，顶部`header`，底部`footer`等
* 页面结构清晰，便于团队开发和维护
* 易于阅读，有利于seo
* 增强可识别性

### DOM树渲染的流程
* 解析HTML，构建DOM树
* 解析CSS，生成CSS规则树
* 合并DOM树和CSS规则，生成render树
* 布局render树（Layout/reflow），负责各元素尺寸、位置的计算
* 绘制render树（paint），绘制页面像素信息
* 浏览器会将各层的信息发送给GPU，显示在屏幕上

### 回流/重绘
回流，元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树
重绘，元素发生的改变只影响了节点的一些样式（如颜色）

### 常见的行内元素和块级元素
块级元素，会独占一行，其宽度自动填满其父元素宽度
```js
div
p
form
ul
li
table
```

行内元素，不会独占一行，相邻的行内元素会排列在一行，直至换行，其宽度随元素的内容而变化，设置width和height无效
```js
a
span
font
img
input
label
strong
```
可以通过`display: inline`和`display: block`改变元素的行块类别

