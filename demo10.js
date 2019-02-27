// 现在给  createStore 增加一个退订功能

let initState = {
    count:0
}

const reducer = (state,action)=>{
    switch(action.type){
        case 'INCREMENT':
            return {
                ...state,
                count:state.count + 1
            }
        default:
            return state;
    }
}
function createStore(reducer,initState){
    let state = initState;
    let listeners = [];
    function subscribe(listener){
        listeners.push(listener);
        return function unsubscribe(){
            var index = listeners.indexOf(listener);
            listeners.splice(index,1);
        }
    }
    function getState(){
        return state
    }

    function dispatch(action){
        state = reducer(state,action);
        for(let i = 0;i<listeners.length;i++){
            listeners[i]();
        }
    }

    return {
        subscribe,
        getState,
        dispatch
    }
}

const store = createStore(reducer,initState);
const unsub1 = store.subscribe(()=>{
    console.log("listen1 ",store.getState());
})
const unsub = store.subscribe(()=>{
    console.log("listen2 ",store.getState());
})

store.dispatch({
    type:'INCREMENT'
})

setTimeout(() => {
    unsub();
    store.dispatch({
        type:'INCREMENT'
    })
}, 2000);



