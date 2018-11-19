/**
 * 迭代器和生成器
 * @author 梁凤波
 * @timer 2018-11-05 13:21:33
 */

/******************************************** *
 * 迭代器
 * Iterator
 * 每个迭代器都有next()方法：每次调用都返回一个结果对象
 * 返回结果对象有2个属性：
 *  - value 表示下一个要返回的值
 *  - done 布尔值， 表示下一个值是否没有值返回了
 */

{
    /******************************************** *
     *         ES5创建一个迭代器
     */
    function createIterator(items) {
        var i = 0;
        return {
            next: function () {
                var done = (i >= items.length);
                var value = !done ? items[i++] : undefined;

                return {
                    done: done,
                    value: value
                }
            }
        }
    }

    var iterator = createIterator([1, 2, 3]);

    console.log(iterator.next()); //  done: false, value: 1 }
    console.log(iterator.next()); // { done: false, value: 2 }
    console.log(iterator.next()); // { done: false, value: 3 }
    console.log(iterator.next()); // { done: true, value: undefined }
}

{
    /**
     * 生成器
     * 通过function关键字后的星号(*)来表示
     * 会得到一个yield关键字
     * yield 关键字表示可以返回任何值或表达式
     * yield 关键字只能在生成器内才能使用，否则报错
     */
    function* createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }

    let iterator = createIterator();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

    /**
     * 输出
     { value: 1, done: false }
     { value: 2, done: false }
     { value: 3, done: false }
     { value: undefined, done: true }
     */
}

{
    /************************************** *
     * 可迭代对象和for-of循环
     */
    for (let num of [1, 2, 3, 4]) {
        console.log(num);
        /**
         * 1
         * 2
         * 3
         * 4
         */
    }
}

{

    /************************************** *
     * 集合迭代对象
     * entries()  返回一个迭代器，其值为多个键值对
     * values() 返回一个迭代器，其值为集合的值
     * keys() 返回一个迭代器，其值为集合中的所有键名
     */
}

{

    /************************************* *
     * entries()  返回一个迭代器，其值为多个键值对
     */
    let arr = [1, 2, 3]
    let set = new Set([4, 5, 6]);
    let map = new Map();
    map.set("name", "bob");
    map.set("likes", "coding");
    map.set("skills", "JAVA");

    for (let entry of arr.entries()) {
        console.log(entry);
        /**输出
         * [ 0, 1 ]
         * [ 1, 2 ]
         * [ 2, 3 ]
         */
    }

    for (let entry of set.entries()) {
        console.log(entry);
        /**输出
         * [ 4, 4 ]
         * [ 5, 5 ]
         * [ 6, 6 ]
         */
    }

    for (let entry of map.entries()) {
        console.log(entry);
        /**输出
         * [ 'name', 'bob' ]
         * [ 'likes', 'coding' ]
         * [ 'skills', 'JAVA' ]
         */
    }
}

{
    /**
     * values() 返回一个迭代器，其值为集合的值 兼容性不好
     */
    console.log("----------- hr -------------");
    let arr = [1, 2, 3];
    let set = new Set([4, 5, 6]);
    let map = new Map();

    map.set("name", "bob");
    map.set("likes", "coding");
    map.set("skills", "JAVA");

    // for (let value of arr.values()) {
    //     console.log(value);
    //     /**输出
    //      * 1
    //      * 2
    //      * 3
    //      */
    // }
    //
    // for (let value of set.values()) {
    //     console.log(value);
    //     /**输出
    //      * 4
    //      * 5
    //      * 6
    //      */
    // }
    //
    // for (let value of map.values()) {
    //     console.log(value);
    //     /**输出
    //      * bob
    //      * coding
    //      * JAVA
    //      */
    // }
}

{
    console.log("----------- hr -------------");
    /**
     * keys() 返回一个迭代器，其值为集合中的所有键名
     */
    let arr = [1, 2, 3];
    let set = new Set([4, 5, 6]);
    let map = new Map();

    map.set("name", "bob");
    map.set("likes", "coding");
    map.set("skills", "JAVA");

    for (let keys of arr.keys()) {
        console.log(keys);
        /**输出
         * 1
         * 2
         * 3
         */
    }

    for (let keys of set.keys()) {
        console.log(keys);
        /**输出
         * 4
         * 5
         * 6
         */
    }

    for (let keys of map.keys()) {
        console.log(keys);
        /**输出
         * name
         * likes
         * skills
         */
    }
}

{
    /**
     * 字符串迭代器
     */
    let str = "吉abc";
    for (let s of str) {
        console.log(s);
        /**
         * 输出
         * 吉
         * a
         * b
         * c
         */
    }
}

{
    /************************************
     * 总结
     * 迭代器 iterator()
     * - 每个迭代器都有next()方法：每次调用都返回一个结果对象
     * - 返回结果对象有2个属性：
     *  - value 表示下一个要返回的值
     *  - done 布尔值， 表示下一个值是否没有值返回了
     * - 可迭代对象for-of循环
     * - 集合对象迭代器
     *  - entries()  返回一个迭代器，其值为多个键值对
     *  - values() 返回一个迭代器，其值为集合的值
     *  - keys() 返回一个迭代器，其值为集合中的所有键名
     *
     * 生成器 generator
     * - 通过function关键字后的星号(*)来表示
     * - 会得到一个yield关键字
     *  - yield 关键字表示可以返回任何值或表达式
     *  - yield 关键字只能在生成器内才能使用，否则报错
     * */
}