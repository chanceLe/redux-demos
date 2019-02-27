/*
 在demo9中,中间件拿到了整个store，它甚至可以修改subscribe方法，按照最小开放策略
 只需要把 getState给中间件就可以了，因为中间件只被允许使用 getState方法。

 修改applyMiddleware中  传给中间件的store
*/

//const chain = middlewares.map(middleware => middleware(store));
//改成

// const simpleStore = { getState : store.getState }
//const chain = middlewares.map(middleware=>middleware(simpleStore))

//这样就达到  只给中间件 使用 getState的目的了。