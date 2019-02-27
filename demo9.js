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

//中间件使用方式的优化

//定义中间件
const loggerMiddleware = (store) => (next) => (action) => {
    console.log("prev state",store.getState());
    next(action)
    console.log("next state",store.getState());
}
const timeMiddleware = (store) => (next) => (action) => {
    console.log("time",new Date().getTime());
    next(action);
}

const exceptionMiddleware = (store) => (next) => (action) => {
    try{
        next(action);
    }catch(err){
        console.error('error',err)
    }
}

//期望的用法是这样的:
//接收旧的 createStore 返回新的 createStore
//const newCreateStore = applyMiddleware(exceptionMiddleware, timeMiddleware,  loggerMiddleware)(createStore);

//返回一个dispatch被重写过的store
//const store2 = newCreateStore(reducer,initState);

//下面实现 applyMiddleware

const applyMiddleware = function(...middlewares){

    console.log(middlewares,"middles")
    return function rewriteCreateStoreFunc(oldCreateStore){
        return function newCreateStore(reducer,initState){
            // 1.生成一个store
            const store =  oldCreateStore(reducer,initState);
            // 给每个中间件传入 store 相当于 cosnt logger = loggerMiddleware(store)
            const chain = middlewares.map(middleware => middleware(store));

            let dispatch = store.dispatch;
            console.log(chain,"chain")
            //实现  exception(time(logger(dispatch)));
            chain.reverse().map(middleware=>{
                dispatch = middleware(dispatch);
            })

            //重写 dispatch
            store.dispatch = dispatch;
            return store;
        }
    }
}

//现在咱们作用域内有两个 createStore了，一个 没有中间件 一个有中间件。
//为了让用户用起来统一一些，可以很简单的使他们的使用方式一致，
//修改createStore方法：

const createStore2 = (reducer, initState ,rewriteCreateStoreFunc) =>{
    if(rewriteCreateStoreFunc){
        const newCreateStore = rewriteCreateStoreFunc(createStore);
        return newCreateStore(reducer,initState);
    }

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

// 最终的使用方式是这样的

var rewriteCreateStoreFunc = applyMiddleware(exceptionMiddleware,timeMiddleware,loggerMiddleware);
const store3 = createStore2(reducer,initState,rewriteCreateStoreFunc);

store3.dispatch({
    type:"INCREMENT"
})

