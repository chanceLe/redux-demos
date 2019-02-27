// demo6  demo7  展示了 状态管理器的模块化 （多文件协作）
// redux中还有一个比较难理解的 中间件。中间件是对dispatch的扩展，或者说重写 
//  来增强 dispatch的功能

/*
  比如现在有一个需求，在每次修改state的时候，记录下来修改前的state,为什么修改了，修改后的state。
  那就可以通过重写  store.dispatch来实现，直接看代码
*/

let initState = {
    count:0
}
const reducer = function(state,action){
    switch(action.type){
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return state;
    }
}

function createStore(reducer,initState){
    let state = initState;
    let listeners = [];

    function subscribe(listener){
        listeners.push(listener)
    }

    function dispatch(action){
        state = reducer(state,action);
        for(let i = 0;i<listeners.length;i++){
            listeners[i]();
        }
    }

    function getState(){
        return state;
    }
    dispatch({type:Symbol()});

    return {
        getState,
        dispatch,
        subscribe
    }

}

//上边是简单实现 store
let store = createStore(reducer,initState);

// 重写 store.dispatch
const next = store.dispatch;
store.dispatch = (action)=>{
    console.log("this state",store.getState());
    console.log('action',action)
    next(action)
    console.log('next state',store.getState())
};
// 调用一下 
store.dispatch({
    type:"INCREMENT"
})


// 比如又有一个需求，记录每次数据出错的原因，两个放在一起  看起来是这样的
let store1 = createStore(reducer,initState);
const next  = store1.dispatch;
store1.dispatch = (action)=>{
    try {
        console.log("this state",store.getState());
        console.log('action',action)
        next(action)
        console.log('next state',store.getState())
    }catch(err){
        console.error('错误报告',err)
    }
}

// 如果需求再多，这种合并的写法就出现弊端（强耦合 难维护）
// 那现在把记录日志的中间件提取出来，就变成下边这样了
let store2 = createStore(reducer,initState);
const next = store2.dispatch;

const loggerMiddleware = (action) => {
    console.log("this state",store.getState());
    console.log('action',action)
    next(action)
    console.log('next state',store.getState())
}

const exceptioMiddleware = (action) =>{
        try{
            loggerMiddleware(action);
        }catch(err){
            console.error('error',err)
        }
}
store2.dispatch = exceptioMiddleware;

// 上面代码虽然分离了功能  但是 exceptionMiddleware中 还是写死了 loggerMiddleware
// 需要把它变成活的   随便传哪个都行的 ：
const exceptionMiddleware = (next) => (action) =>{
    try{
        next(action);
    }catch(err){
        console.error('error',err)
    }
}
// 同样的 
const loggerMiddleware = (next) => (action)=>{
    console.log("this state",store.getState());
    console.log('action',action)
    next(action)
    console.log('next state',store.getState())
}
store.dispatch = exceptionMiddleware(loggerMiddleware(next));

//到这里 你可能要把中间件放到单独的文件中去了，问题是   中间件可能包含外部变量 store，
//  那把store也作为一个参数传进去好了 
//  这时候代码变成下边这样了 

const loggerMiddleware = (store) => (next) => (action) =>{
    console.log("this state",store.getState());
    console.log('action',action)
    next(action)
    console.log('next state',store.getState())
}
const exceptioMiddleware = (store) => (next) => (action)=>{
    try{
        next(action);
    }catch(err){
        console.error('error',err)
    }
}

//引入之后 ，需要用store初始化
const logger = loggerMiddleware(store2);
const excption = exceptioMiddleware(store2);
store2.dispatch = excption(logger(next));

//这样就实现了正确的中间件模式，但是这个使用方式不太友好
// 其实只需要知道几个中间件，剩下的细节都可以封装起来，demo9通过扩展createStore来实现。


