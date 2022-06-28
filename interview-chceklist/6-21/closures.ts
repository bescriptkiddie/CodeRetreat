/**
 *  闭包的定义：1.闭包是指那些能够访问自由变量的函数。=> 什么是自由变量呢？
 *            2.自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。=> 全局变量？
 *            3.闭包 = 函数 + 函数能够访问的自由变量
 * */
const g = 10
const fn = () => {
  console.log(g, 'this is g') // 此时 g 是自由变量
}
fn()

/**
 * ECMAScript中，闭包指的是：
 * 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，
 *           因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
 * 从实践角度：以下函数才算是闭包：
 *           即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
 *           在代码中引用了自由变量
 **/


const scope = 'global scope'
const checkScope = () => {
  const scope = 'local scope'
  function fn() {
    return scope
  }
  return fn
}

const foo = checkScope()
foo()  // 'local scope'

// 此时回忆一下执行上下文的创建 -> 31行，执行 checkScope() -> 创建执行上下文 -> 压栈 -> 出栈
// 32行， foo()执行 -> 创建执行上下文 -> 压栈 -> 出栈 ？？ 为什么 foo() 执行的时候，还可以访问到 checkScope 的作用域的 scope
// [[Scopes]]:
// 0: Closure (checkscope) {scope: 'local scope'}
// 1: Global {window: Window, self: Window, document: document, name: '', location: Location, …}
// Closure 正是闭包  !! 也就是说，闭包就是 函数执行上下文销毁后，仍然存在的副本

let data = [];

for (let i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

/**
 * 此时都会输出 3，因为data只是保存了对应的函数，并没有讲执行上下文也一起保存起来~
 * 在运行的时候，就会访问，全局中的 i
 * */
data[0]();  //3
data[1]();  //3
data[2]();  //3


/**
 * 正确的做法是将i形成闭包，保存在函数的作用域内
 * */

let data2 = [];

for (let i = 0; i < 3; i++) {
  data2[i] = (function (i) {
    return function(){
      console.log(i);
    }
  })(i)  // 这个立即执行函数，将 i 给注入到了函数的作用域里面
}

console.dir(data2[0])
// [[Scopes]]: Scopes[3]
// 0: Closure {i: 0}
// 1: Script {data2: Array(3)}
// 2: Global {0: global, window: Window, self: Window, ...}
