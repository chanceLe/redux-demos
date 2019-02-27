const createStore = function(initState){
    let state = initState;
    let listeners = [];

    // 订阅
    function subscribe(listener){
        listeners.push(listener);
    }

    function changeState(newState){
        state = newState;
        //通知
        for(let i = 0;i<listeners.length;i++){
            const listener = listeners[i];
            listener();
        }
    }
    function getState(){
        return state;
    }
    return {
        subscribe,
        changeState,
        getState
    }
}

//使用上边定义的状态管理器来管理多个状态

let initialState = {
    counter:{
        count:0
    },
    info:{
        name:"",
        description:""
    }
}

let store = createStore(initialState);

store.subscribe(()=>{
    let state = store.getState();
    console.log(`${state.info.name}:${state.info.description}`)
});

store.subscribe(()=>{
    let state = store.getState();
    console.log(state.counter.count)
});


setTimeout(() => {
    store.changeState({
        ...store.getState(),
        info:{
            name:"chance",
            description:"web developer"
        }
    });
}, 1500);

setTimeout(() => {
    store.changeState({
        ...store.getState(),
        counter:{
            count:12
        }
    });  
}, 2500);


// demo4和 demo3相比
/*
 1.  4少了很多循环和嵌套  用es6扩展运算符，更新了整个state
 2.  封装良好,省去了很多类型验证和条件判断，只对state进行操作
 3.  4是对顶层state进行监听和设置，所以订阅者不是单独订阅 使用的某个属性 而是直接订阅state
  
 看到这里基本就能发现,生产环境上的状态管理架构 基本跟上边这个例子相同。
 
 当然这里还有缺陷，没有类型验证 ，可以随便更改状态的格式，没有约束,
 
 实际上，我们需要约束状态，并且按计划修改状态，继续往下demo5.js
*/


