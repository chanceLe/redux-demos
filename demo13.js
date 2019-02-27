/*
有时候创建store的时候不传  initState,这怎么用？

const store = createStore(reducer,{},rewriteCreateStoreFunc);

redux允许 不写空对象参数

const store = createStore(reducer,rewriteCreateStoreFunc);

那么就是在  createStore里边判断第二个参数的类型 ，如果是对象 就认为是  initState，
如果是函数  就认为是 rewriteCreateStoreFunc

*/

function createStore(reducer,initState,rewriteCreateStoreFunc){
    if(typeof initState  === 'function'){
        rewriteCreateStoreFunc = initState;
        initState = undefined;
    }
}