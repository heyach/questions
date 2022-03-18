### css题
***

### 盒模型
一个dom元素的尺寸属性，包括margin，border，padding，content(width，height)
标准盒模型
content的height不包括padding和border
IE怪异盒模型
content的height包括了padding和border
通过box-sizing来切换
标准盒模型`box-sizing: content-box`
IE盒模型`box-sizing: border-box`

### BFC

### em详解
rem和em都是css的相对单位
em作为font-size单位代表的是父元素的字体大小，作为其他属性单位，代表自身字体大小
```js
<div class="p1">
	<div class="s1">1</div>
  	<div class="s2">1</div>
</div>

<div class="p2">
    <div class="s5">1</div>
    <div class="s6">1</div>
</div>
```
```css
.p1 {font-size: 16px; line-height: 32px;}
.s1 {font-size: 2em;}
.s2 {font-size: 2em; line-height: 2em;}

.p2 {font-size: 16px; line-height: 2;}
.s5 {font-size: 2em;}
.s6 {font-size: 2em; line-height: 2em;}
```
s1的em作为字体单位，代表父元素的字体大小，所以1em = 16px，s1的字体大小是32px，line-height继承父元素，所以也是32px
同理，s2的em也代表父元素的字体大小，s2的font-size是32px，**但是作为其他属性的单位，em代表的是自身的字体大小，也就是1em = 32px，所以s2的line-height是64px**

p2字体大小是16px，**line-height的2代表的是自身font-size大小的2倍**，所以p2的line-height是32px
s5的em代表父元素的字体大小，所以s5的font-size是32px，**但是line-height继承的是父元素的2，那么s5的line-height应该是自身font-size的2倍，s5的line-height是64px**

所以，一个元素如果使用了em单位，不仅要考虑font-size的继承，还要考虑其他属性（有些属性不写默认继承父元素如line-height），继承的属性值还要再基于font-size重新计算一遍

### rem原理
rem作用于非根元素，代表根元素字体大小，作用于根元素，代表其初始字体大小
所以很多代码里要设置初始rem，即
```css
html {
    font-size: 62.5%;
}
```
而这个62.5怎么来的呢，是因为浏览器默认的字体大小是16px（即不设置的情况），而16又不利于直观计算，因此把html的初始字体大小设为16px的62.5%，即10px，根据rem的规则，1rem = 10px

**rem布局的原理是基于宽度的等比缩放**
把屏幕等宽分为100份，而设计稿的宽度是640px，那么一份的宽度是100 / 640 * 100 = 15.625
通过把html的font-size设为屏幕宽度的1%，那么屏幕的1%就是15.625rem了，这样即使屏幕宽度变成480,320，元素的宽度百分比还是一样，再设计一个15.625转换的函数，就可以做适配了

