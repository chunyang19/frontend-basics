/**
 * ES6-改进的数组功能
 * @author 梁凤波
 * @source https://github.com/liangfengbo/initialjs
 * @time 2018-11-02 13:06:37
 */
{
    /****************** Array.of() ****************/
    /****************** 创建数组 *******************/
    /**
     * Array.of()
     *
     * 和new Array()构造方法功能一样：创建数组
     * 与new Array()不同的是：
     * Array.of()传入的任何类型的值就是该数组的值，
     * 而new Array()传入单个数值的话，有可能会变成该数组的长度
     *
     * 作用：创建数组，但可以统一创建数组时能确保行为一致
     */

    let arr1 = new Array(10);
    let arr2 = Array.of(10);

    console.log(arr1); // [ <10 empty items> ] (注: 10个元素)
    console.log(arr1.length); // 10

    console.log(arr2); // [ 10 ]
    console.log(arr2.length); // 1
}

{
    /**
     * Array.from(arrayLike[, mapFn[, thisArg]])
     *
     * arrayLike 想要转换成数组的伪数组对象或可迭代对象。
     * mapFn (可选参数) 如果指定了该参数，新数组中的每个元素会执行该回调函数。
     * thisArg (可选参数) 可选参数，执行回调函数 mapFn 时 this 对象。
     * 方法从一个类似数组或可迭代对象中创建一个新的数组实例
     *
     * 返回一个新的数组实例
     */

    /** 转换String为数组 **/
    let str = "Hello";
    let arr1 = Array.from(str);
    console.log(arr1); // [ 'H', 'e', 'l', 'l', 'o' ]

    // arguments
    /******************** 实例1 ****************************/
    function makeArray(arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    }

    function getUserInfo1(name, age, job) {
        let args = makeArray(arguments);
        console.log(args)
    }

    /******************** 实例2 ****************************/
    function getUserInfo2(name, age, job) {
        let args = Array.from(arguments);
        console.log(args)
    }

    getUserInfo1("bob", 16, 'frontend'); // [ 'bob', 16, 'frontend' ]
    getUserInfo2("lynn", 16, 'doctor'); //  'lynn', 16, 'doctor' ]

    // Array.from接收第二个参数，可以迭代每项元素做一些操作
    let arr2 = [1, 2, 3];
    console.log(Array.from(arr2, x => x + 1)); // [ 2, 3, 4 ]
}

{
    /************** find() 与 findIndex() **********************/
    /************** 查找数组的值 与 查找数组值的索引 **************/
    /************** 如果查询满足条件，立即返回true，停止继续搜索 **************/
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    /**
     * find() 返回查到的值
     * findIndex 返回查到值的索引
     */

    // 查找数值0
    console.log(arr.find(item => item === 0)); // 0
    // 查找大于3的数值
    console.log(arr.find(item => item > 3)); // 4

    // 查找数值0的索引
    console.log(arr.findIndex(item => item === 0)); // 9
    // 查找数值大于5的数值索引
    console.log(arr.findIndex(item => item > 5)); // 4

}

{
    /*************** find实现 ***************/

    /**
     * find查询元素原理实现
     * @param arr 数组
     * @param item 查询的元素
     * @returns 查找到的元素
     */
    function find(arr, item) {
        let result;

        // 检查传入的arr是否是一个数组
        if (!(arr instanceof Array)) {
            throw new Error("arr is not array.");
        }

        // 检查数组长度是否等于0，如果是就直接返回undefined
        if (arr.length === 0) {
            return result;
        }

        // 检查是否传入的有值
        if (!item || typeof item === "undefined") {
            return undefined;
        }

        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                result = arr[i];
                break;
            }
        }

        return result;
    }

    let arr1 = [1, 2, 3, 4, 5, 6];
    console.log(find(arr1, 3)); // 3
    console.log(find(arr1, 100)); // undefined
    // console.log(find({}, 100)); // error
}

{
    /**
     * findIndex 查询元素索引原理实现
     * @param arr 数组
     * @param item 查询的元素
     * @return 返回查询到元素在arr数组的的索引
     */
    function findIndex(arr, item) {
        let index = -1;

        // 检查传入的arr是否是一个数组
        if (!(arr instanceof Array)) {
            throw new Error("arr is not array.");
        }

        // 检查数组长度是否等于0，如果是就直接返回-1
        if (arr.length === 0) {
            return index;
        }

        // 检查是否传入的有值
        if (!item || typeof item === "undefined") {
            return index;
        }

        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                index = i;
                break;
            }
        }

        return index;
    }

    let arr1 = [1, 23, 23, 55, 231, 333];
    console.log(findIndex(arr1, 23)); // 1
    console.log(findIndex([1, 2, 3, 4, 5], 23)); // -1
    // console.log(findIndex({}, 23)); // error
    console.log(findIndex([12, 3, 4, 212, 22])); // -1
}

{
    /**************** fill() 给数字填充元素的方法 ****************/
    let arr1 = [2, 3, 4, 5, 6];

    // 比如，我想arr1的元素全部重新填充为"js"
    arr1.fill("js");
    console.log(arr1); // [ 'js', 'js', 'js', 'js', 'js' ]

    /**
     * fill()方法有2个参数
     * 第一个参数是填充元素
     * 第二个参数从索引index开始填充，到结尾
     */

    /** 从数组索引为3开始填充 **/
    let arr2 = [2, 3, 4, 5, 6];
    console.log(arr2.fill("js", 3)); // [ 2, 3, 4, 'js', 'js' ]
}

{
    /**
     * 总结：
     * 1、Array.of(); 创建数组，与new Array() 创建数组不同的是，Array.of能确保传入的参数都为数组的元素
     * 2、Array.from() 把其他对象转换成数组
     * 3、Array.fill() 填充数组
     * 4、Array.find() 数组中查询元素，查询到则返回改元素，反之返回undefined
     * 5、Array.findIndex 查询元素索引，查询到则返回元素在该数组的索引，反正返回-1
     * 6、find和findIndex的实现方式
     */
}


