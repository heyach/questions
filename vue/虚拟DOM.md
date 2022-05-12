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