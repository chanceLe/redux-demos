/**
    尝试提取 actions 的共用代码
 * 
 */

 let initState = {
     count:0,
     name:'chance'
 }
 const reducer = (state,action)=>{
     switch(action.type){
         case 'INCREMENT':
            return {
                ...state,
                count:state.count + 1
            }
        case 'SET_NAME':
            return {
                ...state,
                name:action.name
            }
        default:
            return state;
     }
 }
function creatStore(reducer,initState){
    let state = initState;
    let listeners = [];
    function subscribe(listener){
        listeners.push(listener);
    }

    function dispatch(action){
        state = reducer(state,action);
        for(var i = 0;i < listeners.length; i++){
            listeners[i]()
        }
    }
    function getState(){
        return state;
    }
    return {
        subscribe,
        dispatch,
        getState
    }
}

const store = creatStore(reducer,initState);

store.subscribe(()=>{
    console.log(store.getState())
})
// 返回action的函数就叫  actionCreator
function increment(){
    return {
        type:"INCREMENT"
    }
}
function setName(name){
    return {
        type:"SET_NAME",
        name:name
    }
}


/*
注意：这里可以把actions传到任何地方去

其他地方在实现自增的时候 根本不知道dispatch， actionsCreator等细节。
*/
// const actions = {
//     increment: function(){
//         return store.dispatch(increment.apply(this,arguments))
//     },
//     setName :function(){
//         return store.dispatch(setName.apply(this,arguments))
//     }
// }

// actions.increment()
// actions.setName("kklaa");

// 上面的actions生成的时候有好多重复代码，提取一下 看demo16
const actions = bindActionCreators({increment,setName},store.dispatch);
actions.increment()
actions.setName("kklaa");
// 看一下  bindActionCreators函数实现


//核心代码在这里，通过闭包隐藏了actionCreator和 dispatch
function bindActionCreator(actionCreator,dispatch){
    return function(){
        return dispatch(actionCreator.apply(this,arguments))
    }
}
//actionCreators 必须是function或者object
function bindActionCreators(actionCreators,dispatch){
    if(typeof actionCreators === 'function'){
        return bindActionCreator(actionCreators,dispatch)
    }

    if(typeof actionCreators !== "object" || actionCreators === null){
        throw new Error();
    }

    const keys = Object.keys(actionCreators);
    const boundActionCreators = {};
    for(let i = 0;i<keys.length;i++){
        const key = keys[i]
        const actionCreator = actionCreators[key];
        if(typeof actionCreator === 'function'){
            boundActionCreators[key] = bindActionCreator(actionCreator,dispatch)
        }
    }
    return boundActionCreators;
}




