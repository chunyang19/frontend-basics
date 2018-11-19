/**
 * Set与Map集合
 * @author 梁凤波
 * @timer 2018-11-04 20:23:26
 */
{
    /***
     * Set集合
     *
     * 1、有序列表
     * 2、不重复
     * 3、增加元素: add()
     * 4、获取长度: size
     * 5、不会对所存的值进行强类型转换
     */

    /***
     * add();
     *
     * 向Set集合中新增元素 **** /
     * ***************************** /
     */
    let set = new Set();

    for (let i = 1; i <= 10; i++) {
        // 增加元素方法
        set.add(i);
    }
    console.log(set);
    // 输出：Set { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }
    console.log(set.size); // 10

    // 不会对所存的值进行强类型转换
    // +0 和 -0 例外，两值是相等的
    let set2 = new Set();
    set2.add(+0);
    set2.add(-0);
    console.log(set2); // Set { 0 }
    console.log(set2.size); // 1

    let set3 = new Set();
    set3.add(1);
    set3.add("1");
    console.log(set3); // Set { 1, '1' }
    console.log(set3.size); // 2

    /***
     * has();
     *
     * 检测Set集合中是否存在某个值 **** /
     * ***************************** /
     */
    let set4 = new Set();
    for (let i = 1; i <= 10; i++) {
        // 增加元素方法
        set4.add(i);
    }
    console.log(set.has(3)); // true
    console.log(set.has('bo')); // false

    /***
     * delete();
     *
     * 移除Set集合的某个元素 **** /
     * ***************************** /
     */
    set4.delete(4);
    console.log(set4); // Set { 1, 2, 3, 5, 6, 7, 8, 9, 10 }

    let set5 = new Set(["bob", "lynn", "peter"]);
    set5.forEach((value, key, ownerSet) => {
        console.log(`${key} - ${value}`);
        console.log(ownerSet === set5);
    });
    /**
     * 输出：
     bob - bob
     true
     lynn - lynn
     true
     peter - peter
     true
     * 与数组的forEach遍历相比，key返回的是数组的索引(index)，
     * 实际上Set的forEach是返回的是他的key值
     **/
}

{
    /************************* 将Set()集合转为数组 ***************************/
    let set = new Set([1, 2, 3, 3, 3, 3, 3, 3, 4, 5, 6, 7, 8, 9, 0]),
        array = [...set];
    console.log(array); // 输出：[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]

    /**
     * Set集合添加元素时候，会过滤重复元素
     */
}

{
    /**
     ******************* Weak Set集合 ******************
     * 支持三个方法
     * add(); 增加元素
     * has(); 是否存在元素
     * delete(); 删除元素
     */
    let set = new Set(),
        key = {};
    set.add(key);
    console.log(set); // Set { {} }
    console.log(set.size); // 1
    console.log(set.has(key)); // 1

    key = null;
    console.log(set); // Set { {} }
    console.log(set.size); // 1
    console.log(set.has(key)); // false

    let myWeakSet = new WeakSet(),
        key2 = {};
    myWeakSet.add(key2);
    console.log(myWeakSet.has(key2)); // true

    key2 = null;
    console.log(myWeakSet.has(key2)); // false

    /**
     *
     * @type {{name: string}}
     */
    let key3 = {name: 'name'};
    let myWeakSet2 = new WeakSet();
    myWeakSet2.add(key3); // WeakSet {}
    console.log(myWeakSet2.has(key3)); // true

    /**
     * Set()集合 与 WeakSet()集合的区别
     * 在WeakSet()中， 向add()方法传入非对象参数就会导致程序报错，而has() delete()方法传入非对象就会返回false
     * WeakSet集合不可用迭代，不能使用for-of
     * WeakSet集合不暴露任何迭代器，如keys() values()方法，所以无法通过程序来检测其中的内容
     * WeakSet集合不支持forEach方法
     * WeakSet集合不支持size属性
     */
}

{
    /********************  Map集合    *********************
     *                                                   *
     *         Map类型是一种储存着许多键值对的有序列表        *
     *****************************************************/
    let map = new Map();


    /**
     * set() 设置方法，第一个参数，传入键名字，第二个参数传入键值
     * get() 获取键值方法
     */
    map.set("name", 'bob');
    console.log(map); // Map { 'name' => 'bob' }
    console.log(map.get("name")); // bob

    /**
     * Map集合支持方法
     *
     * has(key) 检测指定的键名在Map集合中是否存在
     * delete(key) 从Map集合中移除指定键名及其对应的值
     * clear() 移除Map集合中的所有键值对
     */
    map.set("likes", "code");
    map.set("skills", "javascript");
    console.log(map);
    // 输出：Map { 'name' => 'bob', 'likes' => 'code', 'skills' => 'javascript' }

    // has
    console.log(map.has("skills")); // true

    // delete()
    map.delete("skills");
    console.log(map);
    // 输出：Map { 'name' => 'bob', 'likes' => 'code' }

    // clear()
    map.clear();
    console.log(map); // Map {}

    /**
     * Map集合支持属性
     *
     * size 获取长度
     */
    console.log(map.size); // 0
}

{
    /********** Map初始化方法 **********
     *
     **********************************/
    let map = new Map([['name', 'lynn'], ['likes', 'code']]);

    console.log(map); // Map { 'name' => 'lynn', 'likes' => 'code' }

    // 迭代方法
    map.forEach(item => console.log(item));
    /**
     * 输出
     *  lynn
     *  code
     */

    map.forEach((item, key) => console.log(`${key} - ${item}`));
    /**
     * 输出
     * name - lynn
     * likes - code
     *
     * 返回的是键名和键值
     */
}

{
    /********************************************************
     *     Weak Map                                    *
     *     Weak Map是弱引用Set集合                            *
     *     和Weak Set一样                               *
     *     Weak Map最大的用途就是保存web页面中的DOM元素         *
     **************************************/
    let myWeakMap = new WeakMap(),
        element = document.querySelector('.element');

    myWeakMap.set(element, 'Original');

    console.log(myWeakMap.has(element)); // true
    console.log(myWeakMap.get(element)); // "Original"

    myWeakMap.delete(element);
    console.log(myWeakMap.has(element)); // false
    console.log(myWeakMap.get(element)); // undefined

    /**
     * WeaK Map集合是一类特色的Map集合，只支持对象类型的键名，与Weak Set相似，
     * 集合中存放的键是对象的弱引用，当该对象的其他强引用都被清除时，
     * 集合中弱引用键机器对应的值也会自动被垃圾回收
     *
     * 适用场景：为实际应用使用与生命周期管理分离的对象添加额外信息
     */
}

{
    /************************************************************************ *
     * 总结
     *
     * Set()
     * Set类型是一种有序列表
     * let set = new Set();
     * 有序列表
     * 添加不会重复元素
     * 不会对所存的值进行强类型转换
     * add()
     * has()
     * delete()
     * size
     * forEach
     *
     * WeakSet();
     *
     * let set = new WeakSet();
     * add()
     * size
     * has()
     *
     * 在WeakSet()中， 向add()方法传入非对象参数就会导致程序报错，而has() delete()方法传入非对象就会返回false
     * WeakSet集合不可用迭代，不能使用for-of
     * WeakSet集合不暴露任何迭代器，如keys() values()方法，所以无法通过程序来检测其中的内容
     * WeakSet集合不支持forEach方法
     * WeakSet集合不支持size属性
     *
     *
     * Map()
     *
     * let map = new Map();
     *
     * Map类型是一种储存着许多键值对的有序列表
     * set() 设置方法，第一个参数，传入键名字，第二个参数传入键值
     * get() 获取键值方法
     * has(key) 检测指定的键名在Map集合中是否存在
     * delete(key) 从Map集合中移除指定键名及其对应的值
     * clear() 移除Map集合中的所有键值对
     * size 获取长度
     * forEach
     * Map初始化方法 let map = new Map([['name', 'lynn'], ['likes', 'code']]);
     *
     * WeakMap()
     *
     * WeaK Map集合是一类特色的Map集合，只支持对象类型的键名，与Weak Set相似，
     * 集合中存放的键是对象的弱引用，当该对象的其他强引用都被清除时，
     * 集合中弱引用键机器对应的值也会自动被垃圾回收
     *
     * 适用场景：为实际应用使用与生命周期管理分离的对象添加额外信息
     *
     **********************************************************************
     * ****************************************************************** */
}