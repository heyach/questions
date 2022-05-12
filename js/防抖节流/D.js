// 一种频繁操作
function ajax(d) {
    console.log(`handle with param ${d} ${+new Date()}`)
}
document.getElementById("input1").addEventListener("keyup", function(e) {
    ajax(e.target.value)
})

function debounce(fn, delay) {
    return function(args) {
        let that = this
        clearTimeout(fn.id)
        fn.id = setTimeout(function() {
            fn.call(that, args)
        }, delay);
    }
}
var newfn = debounce(ajax, 500)
document.getElementById("input2").addEventListener("keyup", function(e) {
    newfn(e.target.value)
})

function throttle(fn, delay) {
    var last, deferTime
    return function(args) {
        var that = this
        var now = +new Date()
        // 接着如果上个时间间隔里已经执行了fn，last存在，且时间间隔还未结束，设置一个定时器间隔执行，且重置last时间
        if(last && now < last + delay) {
            clearTimeout(deferTime)
            deferTime = setTimeout(function() {
                last = now
                fn.call(that, args)
            }, delay)
        } else {
            // 一进来的时候last为空，直接执行fn，然后把执行时间记录为last
            last = now
            fn.call(that, args)
        }
    }
}
var newfn2 = throttle(ajax, 1000)
document.getElementById("input3").addEventListener("keyup", function(e) {
    newfn2(e.target.value)
})