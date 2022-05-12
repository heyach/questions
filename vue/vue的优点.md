### vue的优点
1. 低耦合
View上的数据是可以独立修改的，而Model可以绑定到不同的View上，当View内容改变时，Model可以不变
```html
<div>{{ msg }}</div>
```
```js
data:{
    msg: "hello"
}
```
可以用dom操作修改div里的内容，也可以直接修改data里的msg，通过ViewModel来同步修改

2. 可重用性
可以把一段数据逻辑放在一个ViewModel里，多个view可以重用该逻辑
```html
<div>
    <input type="text" v-model="search">
    <button @click="search">搜索</button>
</div>
```
```js
data:{
    search: ""
},
methods:{
    search: function(){
        console.log(this.search)
    }
}
```
任何View里引入该组件后，即可使用该搜索逻辑

3. 独立开发
开发人员专注业务逻辑和数据的开发，组件的处理，设计人员专注于页面设计

4. 可测试
因为数据双向绑定后页面View里的数据既是ViewModel里的数据，可以针对ViewModel来测试