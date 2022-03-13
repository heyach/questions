### http题
***

### 在浏览器中从输入URL到页面显示
1. url解析，dns解析得到ip地址，ip解析得到mac地址
2. 通信建立，三次握手，数据传输，服务端收到请求
3. 数据处理，浏览器接收到服务端的响应信息
4. 开始渲染

### cookie/sessionStroage/localStorage
共同点：都是保存在浏览器端，且同源的
区别
请求携带
cookie数据始终在同源的http请求中携带（即使不需要），而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存
存储大小
cookie数据不能超过4k，每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识，sessionStorage和localStorage能达到5M
数据有效期不同
sessionStorage仅在当前浏览器窗口关闭前有效，localStorage不主动删除始终有效，cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
作用域不同
sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面，localStorage和cookie在所有同源窗口中都是共享的

### 常见的返回码及含义
2XX 请求正常
3XX 重定向
4XX 客户端错误
5xx 服务端错误

200 请求成功处理
301 永久重定向
400 请求语法错误
401 请求要认证
403 请求被服务器拒绝
404 not found，找不到指定资源
500 服务器发生错误
502 网关错误
503 服务器无法处理，一般是挂了


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
