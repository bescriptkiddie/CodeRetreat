// console.log('6月21,原型链')

/**
 * prototype 是函数才会有的属性
 * 并且只有 void 的函数才可以当构造器
 */
function Person () {

}
Person.prototype.name = 'pika'
const p1 = new Person()
p1.name = 'coder'
console.log(p1.name)  // 'coder'
console.log(p1.__proto__ === Person.prototype)  // true
console.log(Person === Person.prototype.constructor) // true
// 获取对象的原型
console.log(Object.getPrototypeOf(p1) === Person.prototype, 'getPrototypeOf') // true
console.log(p1.name) // coder
// delete p1.name
console.log(p1.name) // pika => p1的name属性被删除了,就会往上找, 找person的原型, person.__proto_

