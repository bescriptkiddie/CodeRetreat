// console.log('5月12,原型链')

/**
 * prototype 是函数才会有的属性
 * 并且只有 void 的函数才可以当构造器
 */
function Person () {

}
Person.prototype.name = 'pika'
const p1 = new Person()
p1.name = 'coder'
console.log(p1.name)  // 'pika'
console.log(p1.__proto__ === Person.prototype)  // true
console.log(Person === Person.prototype.constructor) // true
// 获取对象的原型
console.log(Object.getPrototypeOf(p1) === Person.prototype, 'getPrototypeOf') // true
console.log(p1.name) // coder
// delete p1.name
console.log(p1.name) // pika => p1的name属性被删除了,就会往上找, 找person的原型, person.__proto_

/**
 * 关于javaScript的继承
 * */
// 继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，
// 相反，JavaScript 只是在两个对象之间创建一个关联，
// 这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。
