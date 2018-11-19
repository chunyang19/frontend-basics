/**
 *
 */
{
    class Person {
        // 等价于Person 构造函数
        constructor(name) {
            this.name = name;
        }

        // 等价于Person.prototype.getName
        sayName() {
            console.log(this.name);
        }

        // 访问器属性
        get getName() {
            return this.name;
        }

        set setName(name) {
            this.name = name;
        }
    }

    let person = new Person("梁凤波");
    person.sayName(); // 梁凤波

    let descriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'getName');
    console.log("get" in descriptor); // true
    console.log("set" in descriptor); // true
}

{
    /***
     * 生成器方法
     *
     */

    class MyClass {
        * createIterator() {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
        }
    }

    let instance = new MyClass();
    instance.createIterator();
}


{
    /**
     * 静态成员
     *
     * static 关键字不能定义构造方法，可以定义类中的所有方法和属性
     * static 静态属性或静态方法都不可以在实例中访问静态成员，必须要在类中访问静态成员
     */
    class PersonClass {
        static getName() {
            console.log("name");
        }

        getMyName() {
            PersonClass.getName();
        }
    }

    let personClass = new PersonClass();
    // personClass.getName(); // 报错
    personClass.getMyName();
}

{
    /***************************** *
     * 继承
     */
    class Rectangle {
        constructor(length, width) {
            this.length = length;
            this.width = width;
        }

        getArea() {
            return this.length * this.width;
        }
    }

    /**
     * extends关键字 继承Rectangle类
     */
    class Square extends Rectangle {
        constructor(length, width) {
            // 相当于Rectangle.call(this, length, width);
            super(length, width)
        }
    }

    const square = new Square(10, 5);
    console.log(square.getArea()); // 50
}

{
    /********************************************
     * 总结
     *
     * 简写class
     * 构造函数constructor()
     * 访问器属性 set get
     * 原型生成器前面加*号 * createIterator()
     * 静态成员static
     *  - static关键字不能定义构造方法，可以定义类中的所有方法和属性
     *  - static 静态属性或静态方法都不可以在实例中访问静态成员，必须要在类中访问静态成员
     * 继承
     *  - 关键字extends
     *  - super()
     *   - 关键字super调用父类构造方法
     *   - 只可以在派生类的构造函数中使用super()，否则报错
     *   - 在构造函数中访问this之前一定要调用super()，否则报错
     *   - 如果不想调用super，唯一方法就是让类的构造函数返回一个对象
     * 类方法屏蔽
     *  - 如果想覆盖父类的方法，只需要写同名方法
     *  - 静态成员继承
     *  - 继承父类后，它的静态方法也会继承
     *  - 行为很像，但原型链不一样
     * 构造函数中也可以使用new.target
     */
}
