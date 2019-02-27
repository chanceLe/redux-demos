/**
 * bindActionCreators 
 *  这个东西我们很少用到，一般只有在  react-redux的 connect实现中用到。
 * 
 * 他通过闭包，把dispatch和actionCreator隐藏起来，让其他地方感知不到 redux的存在。
 * 
 * 下面咱们可以用普通方式来隐藏 dispatch 和actionCreator试试
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
const actions = {
    increment: function(){
        return store.dispatch(increment.apply(this,arguments))
    },
    setName :function(){
        return store.dispatch(setName.apply(this,arguments))
    }
}

actions.increment()
actions.setName("kklaa");

// 上面的actions生成的时候有好多重复代码，提取一下 看demo16






