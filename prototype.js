/**
 * 原型和原型链
 *
 * - 构造函数
 * - 构造函数-拓展
 * - 原型规则和示例
 * - 原型链
 * - instanceof
 *
 * @author 梁凤波
 * @time 2018-11-15 08:51:49
 */

{
    /**
     * 构造函数
     *
     * var a = {} 是var a = new Object()的语法糖
     * var a = [] 是var a = new Array()的语法糖
     * function Foo(){} 是 var Foo = new Function()
     * 使用instanceof判断一个函数是否是一个变量的构造函数
     */
    function Foo(name, likes) {
        this.name = name;
        this.likes = likes;
    }

    // 创建多个对象
    let f = new Foo("Lynn", 'doctor');
    let f2 = new Foo("Bob", 'coding');
}

{
    /**
     * 如何准确判断一个变量是数组类型
     * - 使用instanceof用于判断引用类型属于哪个构造函数的方法
     */
    let arr = [];
    console.log(arr instanceof Array); // true
    console.log(arr.constructor === Array); // true

    /**
     * 判断原理：
     *  - f.__proto__一层一层往上，能否对应Foo.prototype
     *  - 再试着判断f instanceof Object
     */
}

{
    /**
     * 原型的五条规则
     *  - 1.所有的引用类型（数组，对象，函数）都具有对象特性，既可以自由拓展属性（除了null）
     *  - 2.所有的引用类型（数组，对象，函数）都具有一个__proto__（隐式原型）属性，属性值是一个普通的对象
     *  - 3.所有的函数都具有一个prototype（显式原型）属性，属性值也是一个普通的对象
     *  - 4.所有的引用类型（数组，对象，函数），__proto__属性值向它的构造函数"prototype"属性值
     *  - 5.当试图得到一个对象某个属性时，如果这个对象本身没有这个属性，那么会它的__proto__（即它的构造函数的prototype）中去寻找
     */

        // 第一条规则
    var obj = {};
    obj.a = 100;
    var arr = [];
    arr.a = 100;

    // 第二条规则
    console.log(f.prototype); // f {}
    console.log(obj.__proto__); // {}
    console.log(arr.__proto__); // []
    console.log(f.__proto__); // [Function]

    // 第三条规则
    function f() {
    }

    f.a = 100;

    // 第四条规则
    console.log(obj.__proto__ === Object.prototype); // true

    // 第五条规则
    function createPerson2(name, age) {
        this.name = name;
        this.age = age;
    }

    createPerson2.prototype.consoleName = function () {
        console.log(this.name);
    };


    let person = new createPerson2('bob', 12);
    person.printName = function () {
        // 这里本身没有name属性，会去找他的构造函数的prototype的属性
        console.log(this.name);
    };

    person.consoleName(); // bob
    person.printName(); // bob
    person.toString(); // 在person.__proto__.__proto__原型链上找toString方法
}

{
    /**
     * 循环对象自身的属性
     */
    let obj = {
        name: 'bob',
        likes: 'coding'
    };
    for (let item in obj) {
        // 高级浏览器已经在for in 中屏蔽来自原型的属性
        // 但是这里还是建议大家加上这个判断，保证程序的健壮性
        if (obj.hasOwnProperty(item)) {
            console.log(item);
        }
    }
}

{
    /**
     * 写一个原型链继承的例子
     *
     */
    function Element(id) {
        this.element = document.getElementById(id);
    }

    Element.prototype.html = function (val) {
        let element = this.element;
        if (val) {
            element.innerHTML = val;
            return this;
        } else {
            return element.innerHTML;
        }
    };

    Element.prototype.on = function (type, fn) {
        let element = this.element;

        element.addEventListener(type, fn);

    };

    let div1 = new Element('div1');
    console.log(div1.html());
    div1.html(`<p>hello world</p>`).on('click', function () {
        console.log('clicked..');
    }).html(`<p>javascript</p>`)

}


{
    /**
     * 描述new一个对象的过程
     * 1.创建一个新对象
     * 2.this指向这个对象
     * 3.执行代码，即对this赋值
     * 4.返回this
     */

}