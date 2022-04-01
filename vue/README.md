### vue题
***

### 双向绑定的原理
一个js对象，通过`defineProperty`或者`proxy`完成监听，在这个对象发生变化的时候，去更新模板里引用到这个变量的值
一个dom元素（input，select，radio等），值改变会触发浏览器原生事件，通过这个事件，去更新js里的值

### 虚拟DOM
用一个js对象来描述Dom树，由于只记录了一些重要的信息，且不用操作dom，可以在花费很小的情况下得知整个dom的信息，
```js
// 一个ul列表
var ulDOM = {
  tag: 'ul',
  children: [
    { tag: 'li', children: [ { vnode: { text: '1' }}]  },
    { tag: 'li', children: [ { vnode: { text: '2' }}]  },
  ]
}
```
同时结合diff算法，可以较小消耗的情况下得知要更新哪些节点，最小程度的去操作dom完成更新

### diff算法

### 组件通信
* 父组件通过props往子组件传递数据，需要注意的是数据异步更改了，还要watch或者update，子组件才能拿到最新的值，最常见的就是很多页面，子组件的初始值，父组件也要通过接口获取
* 子组件通过自定义事件$emit向父组件传递数据（触发函数，传递参数）
```js
<father>
    <son v-on:dosomething></son>
</father>
```
子组件在父组件注册的时候，子组件上面的自定义函数会被保存到事件中心
子组件触发事件的时候
```js
this.$emit("dosomething", "xxx")
```
去调用事件中心里的`dosomething`函数，完成父子组件的通信
* 通过`eventBus`，这个是万能的，任意对象都可以通过这种方式传递数据
* vuex，任意一方完成对数据的修改，另一方监听该值的变化，即可收到更改信息

### data为什么必须是函数
一个vue组件，首先有一个组件构造器，注册组件是建立组件构造器的引用，创建组件才是实例化，所以一个组件只有一个构造器，但是有N多个实例
```js
// 组件构造器
function MyComponent() {}
MyComponent.prototype.data = {
    a: 1
}
// 实例化组件
var comA = new MyComponent()
var comB = new MyComponent()
comA.data = {
    a: 2
}
comB.data = {
    a: 3
}
// 组件实例的data会互相污染
```
如果把组件构造器的data改成函数
```js
MyComponent.prototype.data = function() {
    return {
        a: 1
    }
    // 相当于
    // var o = new Object()
    // return o
}
// 这样每个组件实例的data是一个新创建的对象，引用不一样，就不会互相污染
```

### computed和watch的区别
watch是对data属性的监听，值发生改变后会立即执行回调函数
而computed是一个新的响应式变量，依赖于某些属性，但是它不用监听依赖属性的变化，而是在计算属性被用到（触发getter）的时候，重新计算一遍，如果依赖的属性没有发生变化，都不用算，直接用缓存的值

### key的作用，为什么不推荐用index做key
对于一个列表
```js
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
var ulDOM = {
    tag: 'ul',
    children: [
        { tag: 'li', key: 0, children: [ { vnode: { text: '1' }}]  },
        { tag: 'li', key: 1, children: [ { vnode: { text: '2' }}]  },
        { tag: 'li', key: 2, children: [ { vnode: { text: '3' }}]  },
    ]
}
```
如果这个时候数据发生了变化，数据变成了`[3, 2, 1]`，那么相应的dom和vdom要变成
```js
<ul>
    <li>3</li>
    <li>2</li>
    <li>1</li>
</ul>
var ulDOM = {
    tag: 'ul',
    children: [
        { tag: 'li', key: 0, children: [ { vnode: { text: '3' }}]  },
        { tag: 'li', key: 1, children: [ { vnode: { text: '2' }}]  },
        { tag: 'li', key: 2, children: [ { vnode: { text: '1' }}]  },
    ]
}
```
vue源码中判断两个vdom是否相同
```js
function sameVnode (a, b) {
    return (
        a.key === b.key && (
            (
                a.tag === b.tag &&
                a.isComment === b.isComment &&
                isDef(a.data) === isDef(b.data) &&
                sameInputType(a, b)
            )
        )
    )
}
```
由于我们只是做了排序，其实3个节点完全没有变的，应该进行节点复用，而由于使用了index做key，列表的key还是`[0, 1, 2]`，但是值却变成了`[3, 2, 1]`
当比较到第一个节点的时候，key都是0，其余值几乎都一样，但是props（text）改了，这个时候要去触发响应式更新那一整套机制，消耗很大

因此这种用index做key很可能会影响vue对diff的优化，影响其对重复节点的复用。

**即使是要求唯一key，也不要用`Math.random`，因为这会导致两次渲染的6个key完全不一样，匹配的时候一个能复用的节点都找不到，直接销毁3个旧的，创建3个新的，消耗巨大**

### vue3使用proxy的优点
* proxy是对整个对象的代理，defineProperty只能代理某个属性，要进行深度递归，非常影响性能
* 对象和数组新增属性，proxy可以监听，defineProperty不能，所以要用$set
* proxy返回一个新对象，可以只操作新的对象，defineProperty只能直接遍历对象
* proxy拦截方法更多
* 但是defineProperty兼容性更高