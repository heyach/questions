### js题
***

### 闭包
闭包就是能够读取其他函数内部变量的函数
```js
function a() {
    var b = 1
    function c() {
        console.log(a)
    }
}
```
闭包的好处是可以访问一些函数的内部变量，而且可以使这些变量始终保存在内存中，坏处显然，容易造成内存泄露

### 深拷贝
深拷贝的原因就是因为引用类型数据污染的问题
```js
var obj = {
    a: 1
}
var obj2 = {
    b: obj
}
// 这个时候修改obj的值，也会影响到obj2，因为obj2.b里存放的变量地址跟obj是一样的
obj.a = 2
obj2
// {
//     "b": {
//         "a": 2
//     }
// }
```
因此需要实现一种只拷贝值的方法
```js
// 递归判断对象的每个属性，如果是引用类型，继续深拷贝，如果是值类型，直接赋值
function deepCopy(obj) {
    var o = Array.isArray(obj) ? [] : {};
    //进行深拷贝的不能为空，并且是对象
    if (obj && typeof obj === "object") {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    o[key] = deepCopy(obj[key]);
                } else {
                    o[key] = obj[key];
                }
            }
        }
    }
    return o;
}
```

### 继承
核心点就是要共享属性和方法

### 防抖/节流

### 实现call/apply/bind

### 事件循环

