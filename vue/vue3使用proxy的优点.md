### vue3使用proxy的优点
* proxy是对整个对象的代理，defineProperty只能代理某个属性，要进行深度递归，非常影响性能
* 对象和数组新增属性，proxy可以监听，defineProperty不能，所以要用$set
* proxy返回一个新对象，可以只操作新的对象，defineProperty只能直接遍历对象
* proxy拦截方法更多
* 但是defineProperty兼容性更高