/**************
 * ES6 函数
 * @author 梁凤波
 * @timer 2018-11-05 10:21:33
 */

{
    /**********************************************************
     *                函数可以设置默认值参数                     *
     ******************************************************** */

    /**
     * 创建动物类
     * @param name 动物名字
     * @param skills 动物技能，天生会吃，赋值默认值 吃(eating) 技能
     */
    function createAnimal(name, skills = 'eating') {
        return {
            name,
            skills
        };
    }

    console.log(createAnimal('喵毛~')); // { name: '喵毛~', skills: 'eating' }
}

{
    /**********************************************************
     *          默认参数值对arguments对象的影响                  *
     ******************************************************** */

    // 情况1 不设置默认参数，arguments对象正常
    function createAnimal1(name, skills) {
        console.log(arguments.length); // 1
        console.log(arguments[0]); // aCat
        console.log(arguments[1]); // coding
    }

    createAnimal1('aCat', 'coding');

    // 情况2 设置默认值参数且不传参数，对arguments对象时的长度受影响
    function createAnimal2(name, skills = 'eating') {
        console.log(arguments.length); // 1
        console.log(arguments[0]); // aDog
        console.log(arguments[1]); // undefined
    }

    createAnimal2('aDog');

    // 情况3 设置默认值参数且传参数，对arguments对象时的值受影响
    function createAnimal3(name, skills = 'eating') {
        console.log(arguments.length); // 2
        console.log(arguments[0]); // aPing
        console.log(arguments[1]); // code
    }

    createAnimal3('aPig', 'code');

    // 情况4，设置默认值且不传入参数，同时在函数内修改参数值，也不会对arguments对象有所改变
    function createAnimal4(name, skill = 'eating') {
        console.log(arguments.length);
        name = 'bobo';
        skills = 'coding';
        console.log(arguments.length);
    }

    createAnimal4('aAnts');

    /**
     * 小结
     *
     * 函数的默认值参数不会对arguments对象影响
     */
}

{
    /**********************************************************
     *                       不定参数                          *
     ******************************************************** */
    /**
     * 创建一个人类
     * @param args 不定参数
     */
    function createPerson2(...args) {
        let [name, likes, skills] = args;
        console.log({
            name,
            likes,
            skills
        });
        /***
         * 输出：
         * { name: 'lynn', likes: 'coding', skills: 'JAVA' }
         */
    }

    createPerson2('lynn', 'coding', 'JAVA');
}

{
    /**********************************************************
     *                       箭头函数                          *
     ******************************************************** */

    function createPerson(name, skills) {
        return {
            name,
            skills
        }
    }

    // 以上的函数用箭头函数可以写成:
    let createPerson1 = (name, skills) => {
        return {
            name,
            skills
        }
    };
    console.log(createPerson1('lynn', 'JAVA')); // { name: 'lynn', skills: 'JAVA' }

    /* ****************************************************** *
     *                 迭代器里面使用箭头函数                    *
     * ****************************************************** */
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const num = 2;
    arr.findIndex(value => value === num); // 1

    /* ****************************************************** *
     *                 创建立即执行函数表达式                    *
     * ****************************************************** */
    let person = ((name) => {
        console.log(name); // Peter
    })("Peter");

    /* ****************************************************** *
     * 1.箭头函数没有this绑定
     * 2.不能通过new关键字调用
     * 3.不能改变this的绑定
     * 4.不支持arguments对象
     * 5.不支持重复的命名参数
     * ****************************************************** */
}

{
    /**********************************************************
     *                       展开运算符                         *
     *                       Max.max()                         *
     ******************************************************** */

        // Math.max() 可以接受任意数量的参数并返回该数量其中最大的数
    let a = 2,
        b = 4;
    console.log(Math.max(a, b)); // 4

    // 数组比较
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    console.log(Math.max(...arr)); // 9

    // 指定返回最小值为0, 防止负数插入数组
    let arr2 = [-1, -2, -3, -4, -5, 0];
    console.log(Math.max(...arr2, 5)); // 5
}
{

    /* ****************************************************** *
     *                    函数name属性                         *
     *                    获取函数名字                          *
     * ****************************************************** */
    function getName() {
    }

    function getNode() {
    }

    console.log(getName.name); // getName
    console.log(getNode.name); // getNode

    /* ****************************************************** *
     *                 元属性：new.target                      *
     *          判断函数是否通过new关键字调用的问题               *
     * ****************************************************** */

    /**
     *
     * @param name
     */
    function createPerson(name) {
        if (typeof new.target !== 'undefined') {
            console.log(new.target === createPerson); // true
            this.name = name;
        } else {
            throw new Error("必须通过new关键字来调用  createPerson");
        }
    }

    new createPerson('波');
}

/**
 * 总结：
 *
 * 1.函数默认值
 *   - 默认参数和arguments对象保持与命名参数分离
 *   - 不定参数后面不能再有其他命名参数
 *   - 改变形参的值并不会影响arguments对象
 *  2.展开运算符
 *   - Math.max() 可以接受任意数量的参数并返回该数量其中最大的数
 *  3.name的属性
 *   - 获取函数的自身的函数名字
 *  4.元属性 new.target();
 *   - 通过 new.target();来检测该函数是否是通过new关键字调用的
 *  5.箭头函数
 *   - 不能通过new关键字调用
 *   - 不可以改变this的绑定
 *   - 没有原型
 *   - 不支持重复的命名参数
 *   - 不支持arguments对象
 *   - 没有this，super，arguments和new.target绑定
 */