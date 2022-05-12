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