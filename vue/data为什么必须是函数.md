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