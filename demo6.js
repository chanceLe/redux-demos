/*
    我们知道reducer是一个计划函数，接收老的state  按计划返回新的state

    那项目中有大量的state  每个state都需要计划函数  如果全部写在一个reducer函数里
    会导致这个 reducer极其庞大复杂。

    所以，基本会按组件的维度来拆分 reducer函数  ，然后通过一个函数把他们合并起来。

    看下面的例子 ，管理两个state  ，一个  counter  一个 info。
*/

let initState = {
    counter:{
        count:1
    },
    info:{
        name:"chance",
        description:"webweb"
    }
}

// 下面是他们各自的  reducer
// 注意 counterReducer 接收的state是state.counter

function counterReducer(state,action){
    if(!state){
        state = {
            count: 1 
        }
    }
    switch(action.type){
        case 'INCREMENT':
            return {
                ...state,
                count : state.count + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state;
    }
}

// infoReducer 接收的state是 state.info
function infoReducer(state,action){
    if(!state){
        state = {
           name:"chance",
           description:"webwebweb"
        }
    }
    switch(action.type){
        case "SET_NAME":
            return {
                ...state,
                name:  action.name
            }
        case 'SET_DESC':
            return {
                ...state,
                description: action.description
            }
        default:  //一定要有default  不然会覆盖成undefined
            return state
    }
}

//如果把两个合并成一个，大概是这样的：

const reducer = combineReducer({
    counter:counterReducer,
    info: infoReducer
})

//尝试实现一下  combineReducer
function combineReducer(reducers){
    const  reducerKeys = Object.keys(reducers);
    // 返回合并后的新的reducer函数
    return function combination(state = {},action){
        // 生成新的state 
        const nextState = {};

        //遍历执行所有的 reducer 整合成一个新的state
        for(let i = 0;i<reducerKeys.length;i++){     //这里的循环 实际上是  提交 dispatch的时候每个 reducer都会跑一遍  去匹配  action.type
            const key = reducerKeys[i];
            const reducer = reducers[key];
            // 之前key的state
            const previosStateForKey = state[key];  //这里的state是总的state
            // 执行 分  reducer 获得新的state
            const nextStateForKey = reducer(previosStateForKey,action);
            nextState[key] = nextStateForKey;

        }
        return nextState;
    }
}

//定义一下  store 跟上一个demo 是一样的 

function createStore(reducer,init){
    let state = init || {};
    let listeners = [];
    function subscribe(listener){
        listeners.push(listener)
    }
    function dispatch(action){
        state = reducer(state,action);
        for(let i = 0;i<listeners.length;i++){
            let listener = listeners[i];
            listener();
        }
    }
    function getState(){
        return state
    }

    if(!init){
        dispatch({type: Symbol()})
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}
//调用一下  试试看 
let store = createStore(reducer);

store.subscribe(()=>{
    let state = store.getState();
    console.log(state.counter.count , state.info.name  , state.info.description ) 
});


console.log(store.getState())  //这里可以看到初始化的结果
store.dispatch({
    type:"INCREMENT"
})

store.dispatch({
    type:"SET_NAME",
    name:"chance222222"
})

store.dispatch({
    type:"DECREMENT",
})






