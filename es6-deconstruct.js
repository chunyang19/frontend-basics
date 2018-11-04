/**
 * ES6的扩展对象的功能性
 * @author 梁凤波
 * @source https://github.com/liangfengbo/initialjs
 * @time 2018-11-04 16:08:53
 */
{
    /*****************************************************************
     *                       -- 对象结构  --                          *
     * ***************************************************************/
    /**
     * 常常我们在一个对象取属性值，一般是先取对象.属性，比如
     */
    let network1 = {
        name: "liangfengbo.com",
        year: '2018-11-04'
    }
    let name1 = network1.name;
    let year1 = network1.year;
    console.log(name1); // boblog.com
    console.log(year1); // 2018-11-04

    /**
     * ES6新增了一种优雅简单的对象结构方法
     *
     * 特别注意是的，结构赋值时候一定要初始化程序，也就是说必须要声明了就要赋值
     * @type {{name: string, year: string}}
     */
    let network2 = {
        name: "boblog.com",
        year: '2018-11-04'
    }
    let {name2, year2} = network2;
    console.log(name2); // boblog.com
    console.log(year2); // 2018-11-04
}

{
    /*****************************************************************
     *                       -- 嵌套对象结构  --                       *
     * ***************************************************************/
    let node = {
        type: 'Identifier',
        name: 'foo',
        loc: {
            star: {
                line: 1,
                column: 1
            },
            end: {
                line: 100,
                column: 100
            }
        }
    };

    /**
     * 使用了{}来结构赋值，其含义是先找到loc属性，然后再深入一层查找到star的位置，然后属性名字为star
     */
    let {name, loc, loc: {star}} = node;

    console.log(name); // foo
    console.log(loc.star); // { line: 1, column: 1 }
    console.log(loc.end); // { line: 100, column: 100 }

    console.log(star.line); // 1
    console.log(star.column); // 1

    /**
     * 也可以重新赋值命名
     */
    let {loc: {star: localStart}} = node;
    console.log(localStart.line); // 1
    console.log(localStart.column); // 1

    let {loc: {end: localEnd}} = node;
    console.log(localEnd.line); // 100
    console.log(localEnd.column); // 100
}

{
    /*****************************************************************
     *                       -- 数组解构赋值  --                       *
     * ***************************************************************/

    /************************* 通过位置取值 ****************************/
    const arr = ['red', 'green', 'blue'];

    let [firstColor, secondColor] = arr;
    console.log(firstColor); // red
    console.log(secondColor); // green

    let [, , threeColor] = arr;
    console.log(threeColor); // blue
}

{
    /*****************************************************************
     *                       -- 数组解构赋值  --                       *
     * ***************************************************************/

    /************************* 不定元素取值 ****************************/
    const arr = ['red', 'green', 'blue'];

    let [firstColor, ...moreColor] = arr;
    console.log(firstColor); // red
    console.log(moreColor); // [ 'green', 'blue' ]

    let [...allColor] = arr;
    console.log(allColor); // ['red', 'green', 'blue']
}

{
    /*****************************************************************
     *                       -- 数组解构赋值  --                       *
     * ***************************************************************/

    /************************* 交换数组位置 ****************************/
    let a = 1,
        b = 2;
    [a, b] = [b, a];

    console.log(`a = ${a}`); // a = 2
    console.log(`b = ${b}`); // b = 1
}

{
    /*****************************************************************
     *                       -- 数组解构赋值  --                       *
     * ***************************************************************/

    /************************* 嵌套数组和默认值 ****************************/
    let [first, second] = [1];
    console.log(first); // 1
    console.log(second); // undefined

    // 可以赋值默认值
    let [first1, second1 = '默认的'] = [1];
    console.log(first1); // 1
    console.log(second1); // 默认的

    let [first2, [second2]] = [1, [2, 3, 4]];
    console.log(first2); // 1
    console.log(second2); // 2
}

{
    /*****************************************************************
     *                       -- 数组解构赋值  --                       *
     * ***************************************************************/

    /************************* 函数参数默认值 ****************************/
    /**
     * 创建一个人 可以设置默认值
     * @param name
     * @param sex 性别 men 男 women 女，设置默认值为men 男
     * @param skills 技能，设置默认值为eat 吃
     */
    function createPerson(name, sex = 'men', skills = 'eat') {
        return {
            name,
            sex,
            skills
        }
    }

    console.log(createPerson('Bob')); // { name: 'Bob', sex: 'men', skills: 'eat' }

    /**
     * 创建一个动物类
     * 可以设置不定参数 只需要设置...params
     * @param params
     */
    function crateAnimal(...params) {
        let [name, age, species] = params;
        return {
            name,
            age,
            species
        }
    }

    // 创建一个名字为喵喵，1岁且种类为英国短毛的喵星人
    console.log(crateAnimal('喵喵', 1, '英国短毛'));
    // 输出： { name: '喵喵', age: 1, species: '英国短毛' }

    console.log(crateAnimal('阿狗', 2, '圣伯纳犬'));
    // 输出：{ name: '阿狗', age: 2, species: '圣伯纳犬' }
}

{
    /**************      总结    **************/
    /**************   对象解构赋值    **************/
    /**
     * 1. 简写解构赋值
     * 2. 嵌套解构赋值
     */

    /**************   数组解构赋值    **************/
    /**
     * 1. 通过数组位置解构赋值
     * 2. 不定元素解构赋值
     * 3. 轻松交换数组位置
     * 4. 解构赋值可以设置默认值
     * 5. 嵌套解构赋值
     * 6. 处理函数的参数
     */
}