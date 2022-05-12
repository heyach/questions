### get/post的区别
都是http传输数据的一种规则
* GET参数通过URL传递，POST放在Request body中
* 对参数的数据类型，GET只接受ASCII字符，而POST没有限制
* GET请求在URL中传送的参数是有长度限制的，而POST没有
* GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留
但是，
也完全可以再GET请求里添加request body，在POST请求里带上url参数，因此它们最重要的区别不在于此
GET请求会把header和data一起发给服务端，然后得到相应
POST请求会先进行一次询问，只发送header，等到响应后再发送data
而且有语义化的作用，因此还是不能随便乱用，对于幂等的操作，规范是用GET（获取信息），不幂等的操作使用POST（修改信息）