{
    /**
     * 值类型
     */
    let a = 100,
        b = a;
    a = 200;
    console.log(b); // 100

    /**
     * 引用类型:
     *  - 对象，
     *  - 数组，
     *  - 函数
     */
    let c = {value: 100},
        d = c;
    d.value = 200;
    console.log(c.value); // 200
}


{
    /**
     * typeof 运算法
     *
     * 检测值类型比较准确，引用类型会有偏差
     */
    console.log(typeof  undefined); // undefined
    console.log(typeof  "abc"); // string
    console.log(typeof  123); // number
    console.log(typeof  true); // boolean
    console.log(typeof  false); // boolean
    console.log(typeof  {}); // object
    console.log(typeof  []); // object
    console.log(typeof  null); // object
    console.log(typeof  console.log); // function
    console.log(typeof  Symbol); // function
    console.log(typeof  Symbol()); // symbol
}

{
    /**
     * 变量计算 - 强制类型转换
     *
     * 类型转换的情况：
     *  - 1、字符串拼接
     *  - 2、== 运算法
     *  - 3、if语句
     *  - 4、逻辑运算符
     */

    // ==
    console.log(100 == '100'); // true
    console.log(0 == ''); // true
    console.log(undefined == null); // true

    // ===
    console.log(100 === '100'); // false
    console.log(0 === ''); // false
    console.log(undefined === null); // false

    // if语句
    let isTrue = true;
    if (isTrue) {
    }

    let b = 100;
    if (b) {
    }

    let c = '';
    if (c) {
    }

    // 逻辑运算符 && || !
    console.log(10 & 0); // 0
    console.log('' || 'abc'); // 'abc'

    let d = 100;
    console.log(!!d); // true
}

{
    // 问题：何时使用 === 何时使用 ==？
    let obj = {a: 100};

    if (obj.a == null) {
        // 这里相当于 obj.a === null || obj.a === undefined 简写形式
        // obj.a ===null || obj.a === undefined 相当于 false || true  得到当然是true
        // 这是 jQuery 源码中的推荐写法
        // 除了这个其他都推荐写 === 符号
    }
}

{
    /**
     * 问题：JS中有哪些内置函数 -- 数据封装类对象
     * - Object
     * - Array
     * - Boolean
     * - Number
     * - String
     * - Function
     * - Date
     * - RegExp
     * - Error
     */
}

{
    /**
     * 如何理解JSON
     *
     * JSON 是JS的对象
     */
    // 把对象转换为字符串
    console.log(JSON.stringify({a: 10, b: 20}));
    // 把字符串转换为对象
    console.log(JSON.parse('{"a": 100, "b": 20}'));
}
