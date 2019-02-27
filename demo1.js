
// 定义状态
let  state = {
    count : 0
}

//访问状态
console.log(" 访问状态:",state.count)

// 
console.log("修改状态为1")
state.count = 1;
console.log(" 访问修改后状态:",state.count)

console.log("------以上就是一个简单的状态--------")

// 但是上边的状态修改后，使用count的地方不能接收到通知，所以加上发布-订阅模式。

//看 index2.js
