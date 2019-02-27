/*
* 纯函数：
    相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。

    通俗来讲，就两个要素：
    1.相同的输入一定会有相同的输出
    2.不会有‘触发事件’，更改输入参数，依赖外部参数，打印log等副作用。

    看下面例子：
*/


// 不是纯函数，因为相同的输入，输出结果不一致
function a(count){
    return count + Math.random();
}

//不是纯函数，因为外部的arr被修改了
function b(arr){
    return arr.push(1)
}
let arr = [1,2,3]
b(arr);
console.log(arr);



//不是纯函数，因为依赖外部变量
let x = 1;
function c(count){
    return count + x;
}

/**
 * 我们的reducer计划函数就必须是一个纯函数
 * 
 * 只要传入参数相同，返回计算得到的下一个state就一定相同。
 * 没有特殊情况，没有副作用，没有API请求，没有变量修改，单纯执行计算。
 */