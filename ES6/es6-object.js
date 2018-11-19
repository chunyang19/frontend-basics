/**
 * ES6的扩展对象的功能性
 * @author 梁凤波
 * @source https://github.com/liangfengbo/initialjs
 * @time 2018-11-02 11:50:06
 */
{
    /********** 对象属性简写 **********/

    // ES5上创建一个对象
    // name和age分别重复了2遍，一个是属性，另外一个是属性值
    function createPerson(name, age) {
        return {
            name: name,
            age: age
        }
    }

    // ES6创建一个对象, 可以简写属性，
    // 当对象字面量里只有一个属性名字时候，
    // JS引擎会找可访问作用域查找其相同名变量，赋值对象字面值里面的同名属性
    function createPersonES6(name, age) {
        return {
            name,
            age
        }
    }
}

{
    /****************** 可计算属性名 ******************/

    let key = "name";
    let key2 = "s";
    let person = {
        name: "Bob",
        likes: 'code',
    }

    /************** 直接使用字符串字面量作为属性名称 **************/
    console.log(person[key]); // Bob

    /************** 还能拼接使用 ********************************/
    console.log(person['like' + key2]); // code
}

{
    /************************ Object.is() ***********************/
    /**
     * 新增方法
     * Object.is()
     *
     * 优点：弥补全等运算符的精度问题
     * 缺点：+0 和 -0 识别为不相等，NaN和NaN相比较会等价
     * 作用：该方法接收2个参数，比较该2个参数的类型是否相同且具有相同的值
     */

    console.log(+0 === -0); // true
    console.log(+0 == -0); // true
    console.log(Object.is(+0, -0)); // false

    console.log(5 == "5"); // true
    console.log(5 === "5"); // false
    console.log(Object.is(5, "5")); // false

    console.log(NaN == NaN); // false
    console.log(NaN === NaN); // false
    console.log(Object.is(NaN, NaN)); // true
}


{
    /****************** Object.assign() *****************/

    /**
     * 新增方法
     * Object.assign()
     *
     * 用处：Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
     */

    /***********************************/
    /*************   示例1  *************/
    function EventTarget() {
    };

    EventTarget.prototype = {
        constructor: EventTarget,
        emit: function () {
            console.log("hello world!");
        },
        on: function () {
        }
    }

    let myObject = {};
    Object.assign(myObject, EventTarget.prototype);
    console.log(myObject);
    myObject.emit("doSomething.."); // hello world!
    /**
     * EventTarget {
          constructor: [Function: EventTarget],
          emit: [Function: emit],
          on: [Function: on]
      }
     */

    /***********************************/
    /*************   示例2 *************/
    let myAnimal = {};
    let animal = {
        name: 'bob',
        likes: ['code', 'reading'],
        reading(books) {
            console.log(books);
        }
    }
    Object.assign(myAnimal, animal);
    console.log(myAnimal);
    /**
     * { name: 'bob',
        likes: [ 'code', 'reading' ],
        reading: [Function: reading]
       }
     */
    myAnimal.reading("《深入理解ES6》"); // 《深入理解ES6》

    /********************************************************
     缺点：Object.assign()方法不能将提供者的访问器属性赋值到接收对象中
     *********************************************************/

    let receiver = {},
        supplier = {
            get name() {
                return "file.js"
            }
        }
    Object.assign(receiver, supplier);

    // Object.getOwnPropertyDescriptor() 返回指定对象上一个自有属性对应的属性描述符
    let descriptor1 = Object.getOwnPropertyDescriptor(supplier, "name");
    console.log(descriptor1.get()); // file.js
    console.log(supplier.name); // file.js

    /**
     * supplier有一个访问属性器，但receiver不能使用的，receiver接收的这个字符串会转成receiver.name
     */
    let descriptor2 = Object.getOwnPropertyDescriptor(receiver, "name");
    console.log(descriptor2.value); // file.js
    console.log(descriptor2.get); // undefined
    console.log(receiver.name); // file.js
}

{
    /**************** Object.setPrototypeOf() ****************/
    /******************* 可以改变对象的原型 ********************/
    let person = {
        getGreeting() {
            return "hello person!"
        }
    }

    let animal = {
        getGreeting() {
            return "hello animal!"
        }
    }

    // 将原型设置为person
    let somethings = Object.create(person);
    console.log(somethings.getGreeting()); // hello world
    console.log(Object.getPrototypeOf(somethings) === person); // true

    // 改变somethings对象原型
    Object.setPrototypeOf(somethings, animal);
    console.log(somethings.getGreeting()); // hello animal!
    console.log(Object.getPrototypeOf(somethings) === person); // false
    console.log(Object.getPrototypeOf(somethings) === animal); // true
}

{
    /***************** 简化原型访问的Super引用 ****************************/
    /***************** Super引用相当于指向对象原型的指针 *******************/
    /***************** 相等于Object.getPrototypeOf(this)的值 *************/

    let person = {
        getGreeting() {
            return "hello person!"
        }
    }

    let animal = {
        getGreeting() {
            return "hello animal!"
        }
    }

    let someThings = {
        getGreeting() {
            return Object.getPrototypeOf(this).getGreeting.call(this) + "boblog.com"
        }
    }

    // 将原型设置为person
    Object.setPrototypeOf(someThings, person);
    console.log(someThings.getGreeting()); // hello person!boblog.com
    console.log(Object.getPrototypeOf(someThings) === person); // true

    // 将原型设置为animal
    Object.setPrototypeOf(someThings, animal);
    console.log(someThings.getGreeting()); // hello animal!boblog.com
    console.log(Object.getPrototypeOf(someThings) === animal); // true

    // 可以引入super引用简化return Object.getPrototypeOf(this).getGreeting.call(this) + "boblog.com"
    // Super引用相当于指向对象原型的指针，相等于Object.getPrototypeOf(this)的值
    let someThings2 = {
        getGreeting() {
            return super.getGreeting() + "super."
        }
    }
    // 将原型设置为person
    Object.setPrototypeOf(someThings2, person);
    console.log(someThings2.getGreeting()); // hello person!super.
    console.log(Object.getPrototypeOf(someThings2) === person); // true

    // 将原型设置为animal
    Object.setPrototypeOf(someThings2, animal);
    console.log(someThings2.getGreeting()); // hello animal!super.
    console.log(Object.getPrototypeOf(someThings2) === animal); // true
}

{
    /***************************************** 对象总结 *****************************************/
    /**
     * 1.属性简写
     * 2.function简写
     * 3.Object.is() 方法判断两个值是否是相同的值。
     * 4.Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
     * 5.Object.setPrototypeOf() 设置一个指定的对象的原型
     * 6.使用关键字super关键字调用对象原型上的方法，此时的this绑定会被自动设置为当前作用域的this值
     */
    /******************************************* end *******************************************/
}