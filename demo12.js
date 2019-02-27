/*在demo9中，我们把  applyMiddleware中的  [A,B,C] 转换成  A(B(C()))
  是通过下面的方式实现的

    const chain = [A,B,C]
    let dispatch = store.dispatch;
    chain.reverse().map(middleware =>{
        dispatch = middleware(dispatch)
    })

    redux提供了一个  compose方式，可以用来做这个事：

    const chain = [A,B,C]
    dispatch = compose(...chain)(store.dispatch)

    compose的实现如下：

    function compose(...funcs){
        if(funcs.length === 1){
            return funcs[0]
        }
        return funcs.reduce((a,b)=> (...args) => a(b(...args)))
    }

    这可能比较难理解，但你只要知道它是干啥的就行。
    我尝试理解了一下，
    如果只有一个中间件，就直接返回
    如果多个 就用reduce的方式 返回一个函数，这个函数 以下一个元素作为参数
    */


    let A = (next) => (fun) =>{
        console.log("A");
        next(fun);
    }
    let B = (next) => (fun) =>{
        console.log("B");
        next(fun);
    }
    let C = (next) => (fun) =>{
        console.log("C");
        next(fun);
    }
    let D = (next) => (fun) =>{
        console.log("D");
        next(fun);
    }
    function dispatch(a){
        console.log(1111,a)
    }
    function compose(...funcs){
        console.log(funcs,"funcs")
        if(funcs.length === 1){
            return funcs[0]
        }
        //(a,b)=> (...args) => a(b(...args))
        return funcs.reduce(function(a,b){
            return function sss(...args){
                console.log(args.toString(),"args")
                return a(b(...args))
            }
        })
    }

    const com = compose(A,B,C,D)(dispatch);
    /* 
        执行结果如下：
        sss中的console  执行了三遍 
        分别是  dispatch  D中子函数  C中子函数 
        再加一个E 就成了 
         dispatch  E中子函数  D中子函数 C中子函数
    */

    com("调用dispatch")

    /*
     A
     B
     C
     D
     111 调用dispatch
    */