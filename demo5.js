//实现对状态的约束 和按计划修改  ：
//1. 首先定义一个修改规则，告诉 store  我这个状态是怎么变化的 
//2. 修改 store.changeState方法，告诉它修改 state要 按计划规则修改

//来  设置一个 plan函数，接收现在的state，和一个action，返回经过改变后的新的state。

//注意：action = {type:'',other:''}  action必须有一个type属性
function plan(state,action){
    switch(action.type){
        case 'INCREMENT':
            return {
                ...state,
                count:state.count + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                count:state.count - 1
            }
        //没有这个的话，如果action没有type类型  那么plan返回是  null
        //这时候还会发布更新，但订阅者接收到的就是  null 所以访问不到原来的属性了
        default:  
             return state;
    }
}

function createStore(plan,init){
    let state = init;
    let listeners = [];
    function subscribe(listener){
        listeners.push(listener)
    }

    function changeState(action){
        state = plan(state,action);
        for(let i = 0;i<listeners.length;i++){
            let listener = listeners[i];
            listener();
        }
    }
    function getState(){
        return state
    }

    return {
        getState,
        changeState,
        subscribe
    }
}


// 下面调用一下  这个有计划的状态管理

let  init = {
    count :0
};

let  store = createStore(plan,init);

store.subscribe(()=>{
    let state = store.getState();
    console.log(state.count)
});

store.changeState({
    type:"DECREMENT"
})

store.changeState({
    type:"INCREMENT"
});


// 计划外的修改是无效的 
store.changeState({
    count:"abc"
});

//到这里，其实已经完成一个有计划的状态管理器。
//然后给  plan  和 changeState改个名字  
//  plan 改成  reducer   
//  changeState  改成  dispatch   就跟redux的叫法 一样了。



