
//现在加上一个  发布-订阅模式的状态管理器的实践

let  state = {
    count : 0
}
let listenners = [];    //定义订阅者列表
// 添加订阅
function subscribe(listener){
    listenners.push(listener);
}
function changeCount(count){
    // 更改状态
    state.count = count;
      // 发布--通知订阅者
      for(let i = 0;i<listenners.length;i++){
        listenners[i](count);
    }
}

subscribe((count)=>{
    console.log("数据变化后自动更新...",count);
})

changeCount(1);

setTimeout(()=>{
    changeCount(2);
},2000);

//控制台查看效果，可以发现数据变化 ，驱动视图更新

// 这里只是控制了count  一个状态 ,多个怎么实现？继续demo3.js