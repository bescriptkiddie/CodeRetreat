/**
 * 关于javaScript的继承
 * */

// 继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，
// 相反，JavaScript 只是在两个对象之间创建一个关联，
// 这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。

/** 原型链的继承*/
function Parent() {
  console.log('经历了一次')
  this.name = 'parent';
  this.hobbies = ['read', 'swim']
}

Parent.prototype.getName = function () {
  console.log(this.name, 'in getName');
}

function Child() {
  this.name = 'child'
}


Child.prototype = new Parent();

Child.prototype.setName = function (name) {
  console.log(name, 'in setName');
  this.name = name
}
const child1 = new Child();
console.log(child1.name)
console.log(child1.getName()) // child in getName

// TODO 1.引用类型的属性被所有实例共享：
const child2 = new Child()
child2.setName('pika')
// name 是基本数据类型
console.log(child1.name, 'child1~~')
console.log(child2.name, 'child2~~')
// hobbies 是数组，是引用类型
console.log(child1.hobbies, 'hobbies')
child1.hobbies.push('run')
console.log(child2.hobbies, 'hobbies')

// TODO 2.借用构造函数(经典继承)
function Child2() {
  Parent.call(this) // this 指向
}

// 在 new 的时候，用的是 Parent 的this，所以在改的不是同一个引用地址
// 缺点： 方法在构造函数中定义，每次创建实例都会遍历一遍方法
const child3 = new Child2()
child3.hobbies.push('child3')
const child4 = new Child2()
console.log(['child3', child3, 'child4', child4]) // 'child3',  Child2 { name: 'parent', hobbies: [ 'read', 'swim', 'child3' ] }, 'child4', Child2 { name: 'parent', hobbies: [ 'read', 'swim' ] }
// TODO 3.组合继承
function Child3(name, age) {
  // call 相当于用了parent的this，下面复写就可以覆盖parent的this
  Parent.call(this)
  this.name = name
  this.age = age
  console.log(this,'C3 的 this')
}

// 通过原型链的方法，将构造继承的缺点避免
Child3.prototype = new Parent()  // --> 将Child3 的原型方法用 Parent() 代替，此时 Child3.prototype.constructor = Parent()
Child3.prototype.constructor = Child3 // --> 将 Child3的构造函数 = Child3()
//  ！！！重要提醒，其实这里修改也是没有关系的，只是尽量让对象的constructor指向其构造函数，这是JS的一个历史遗留
//  constructor 作用之一 : 通过实例的构造函数给"闭包"中的函数增加属性方法

const child5 = new Child3('c5', 18)
child5.hobbies.push('drive')
console.log(['child5', child5])

const child6 = new Child3('c6', 30)
console.log(['child6', child6])
// TODO 4. 寄生组合式继承 (组合继承的优化)
// 将组合继承的主要确定是 在new Parent() 的时候会执行一次 parent

Child3.prototype = Parent.prototype  // 这样不就可以避免多执行一次了吗
// 再通过 Object.create 防止篡改
Child3.prototype = Object.create(Parent.prototype);
// 最后把原型链指回去
Child3.prototype.constructor = Child3


