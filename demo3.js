
//现在加上一个  发布-订阅模式的状态管理器的实践

let  state = {
    count : 0,
    name:""
}
console.log(Object.keys(state))
//定义函数  根据state生成订阅者列表
function createListeners(state){
    let listeners  = {};
    for(let key in state){
        listeners[key] = [];
    }
    return listeners;
}
 //定义订阅者列表
let listeners = createListeners(state);
console.log("生成的订阅者列表",listeners);

// 添加订阅
function subscribe(key,listener){
 
    if(!Object.keys(state).includes(key)){
        console.log("没有要订阅的这个状态")
        return;
    }
    listeners[key].push(listener);
}
function changeState(data){
    // 更改状态
    for(let key in data){
        if(Object.keys(state).includes(key)){
            state[key] = data[key];

             // 发布--通知订阅者
             thislisteners =listeners[key]; 
            for(let i = 0;i<thislisteners.length;i++){
                thislisteners[i](data[key]);
            }
        }else{
            throw new Error("状态管理中没有这个数据项")
        }
    }
}

subscribe("count",(data)=>{
    console.log("订阅count：",data)
});
subscribe("name",(data)=>{
    console.log("订阅name：",data)
});
// 没有在state中声明的状态,不能订阅和修改
subscribe("age",(data)=>{
    console.log("订阅age: ",data)
});

// 试图修改没有在state中定义的状态，会报错
changeState({
    count:5,
    name:"chance",
});

setTimeout(()=>{
   changeState({
        name:"sylas",
   })
},2000);

//这样就实现了多个状态的管理和监听，当然这只是一个简单的 为了了解原理而写的

//虽然这里实现了简单的多状态管理，但是结构不够清晰，并且没有处理多级数据的监听
//继续看 demo4.js