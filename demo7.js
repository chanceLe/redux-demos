/*在demo6中，通过  conbineReducer 实现了 reducer的多文件分割。
  但state还是写在一起的，这样 state树也会很庞大，不直观，难维护
  需要拆分出来   一个state  一个reducer 写一块  

  其实上一个 demo 已经在这样做了，就是  判断 reducer中的state  如果没有 
  就设置一个初始值。
  但是，默认是不会触发reducer的，  所以在 createStore中添加一行 
  
  dispatch({type:Symbol()})  这个type不会跟 任何 action.type匹配 
  等同于全部走  reducer中的，default  即相当于设置初始值
*/

let 

