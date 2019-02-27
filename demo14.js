/*
reducer拆分之后，跟组件是一一对应的。我们希望在做按需加载的时候，reducer
也可以跟着组件在必要的时候再加载，然后用新的reducer替换老的reducer


那这样我们只要在  createStore中添加一个replaceReducer函数 并返回就可以了 
*/

function replaceReducer(newReducer){
    reducer = newReducer;
    dispatch({type:Symbol()})
}

