/**
 * Promise
 * @author 梁凤波
 * @source https://github.com/liangfengbo/initialjs
 * @time 2018-11-14 09:41:14
 */

{
    /**
     * Promise概念：
     * 生命周期:
     * - 1. 进行中(pending)
     * - 2. 未处理 (unsettled)
     * - 3. 已处理 (settled)
     * - 4. 操作结束后有2个状态
     *  - 1. Fulfilled promise异步操作成功完成
     *  - 2. Rejected promise异步成功未成功
     *
     * 属性方法:
     * - 内部属性[PromiseState] 表示promise的3个状态
     *  - 1. 进行中(pending)
     *  - 2. Fulfilled promise异步操作成功完成
     *  - 3. Rejected promise异步成功未成功
     *
     *  then()方法: 接收2个参数
     *   - 第一个是状态变为fulfilled时的调用函数
     *   - 第二个是状态变为rejected时的调用函数
     *  catch 方法
     *   - 相当于只给其传入拒绝程序的then()方法
     */
    const fs = require("fs");

    /**
     * 读取文件
     * @param filename
     * @return success return readFile content.
     * @return error return fail info.
     * @return {Promise<any>}
     */
    function readFile(filename) {
        return new Promise((resolve, reject) => {
            // 触发异步操作
            fs.readFile(filename, {encoding: "utf8"}, (err, contents) => {

                // 检查是否有错误
                if (err) {
                    reject(err);
                    return false;
                }

                // 成功读取文件
                resolve(contents);
            })
        })
    }

    let promise = readFile("test.txt");

    /**
     * test.txt 内容写入了一个测试语句：
     *  This is a test.
     */
    promise.then(resolve => {
        // 成功
        console.log(resolve); // This is a test.
    }).catch(err => {

        // 错误
        console.log(err); // error info
    })
}


{
    /**
     * JS运行机制
     *
     * Event loop
     *
     * JS是单线程的，在执行任务时，这个任务可以叫队列任务，
     * 任务队列存在两种类型，一种为microtask queue，另一种为macrotask queue。
     *  - promise［ECMAScript标准］产生的任务队列为microtask queue。
     *
     * 两者的区别:
     *  - microtask queue：唯一，整个事件循环当中，仅存在一个；执行为同步，同一个事件循环中的microtask会按队列顺序，串行执行完毕；
     *  - macrotask queue：不唯一，存在一定的优先级（用户I/O部分优先级更高）；异步执行，同一事件循环中，只执行一个。
     */

    // first code
    console.log('a');

    setTimeout(() => {
        console.log('b');
    }, 1000);

    console.log('c');

    // 输出顺序： a, c, b
    console.log('--------------');
    // second code.. 把定时器改为0
    console.log('d');

    setTimeout(() => {
        console.log('e');
    }, 0);

    console.log('f');
    // 输出顺序： d, f, e
}

{
    /**
     * 串联promise
     *
     */

    let p1 = new Promise((resolve, reject) => {
        resolve(1024)
    })

    p1.then((res) => {
        console.log(res);
    }).then(() => {
        console.log('2048');
    }).catch(err => {
        console.log("err");
        console.log(err);
    })

    p1.then((res) => {
        console.log(res);
    }).then(() => {
        // throw new Error('2121');
    }).catch(err => {
        // 捕获错误
        console.log("err");
        console.log(err);
    })
}

{
    /***
     * 响应多个promise
     *
     */

    let p1 = new Promise((resolve, reject) => {
        resolve({name: "p1"});
    })

    let p2 = new Promise((resolve, reject) => {
        resolve({name: "p2"});
    })

    let p3 = new Promise((resolve, reject) => {
        resolve({name: "p3"});
    });

    let p4 = new Promise((resolve, reject) => {
        resolve({name: "p4"});
    })

    let p5 = new Promise((resolve, reject) => {
        resolve({name: "p5"});
    })

    let promiseAll = Promise.all([p1, p2, p3, p4, p5]);

    /**
     * Promise.all方法
     * 接收一个参数并返回一个promise，该参数是一个含有多个受监视promise的可迭代对象
     *
     * 示例：
     */
    promiseAll.then(res => {
        console.log(res);
        /**
         [ { name: 'p1' },
         { name: 'p2' },
         { name: 'p3' },
         { name: 'p4' },
         { name: 'p5' }
         ]
         */


    }).catch(err => {
        console.log(err);
    })

    /**
     * Promise.race() 方法
     *
     * 和 Promise.all方法一样，区别就是race方法只有一个promise被解决就被完成，无需等待所有的promise完成
     */
    console.log("-------------- promise race -----------------");
    let promiseRace = Promise.race([p1, p2, p3, p4, p5]);
    promiseRace.then(res => {
        console.log(res); // { name: 'p1' }

    }).catch(err => {
        console.log(err);
    })

}

{
    /**
     * promise继承
     *
     * Promise与其他内建类型一样，可以作为作为派生其他类
     */
    class MyPromise extends Promise {
        success(resolve, reject) {
            return this.then(resolve, reject);
        }

        failure(reject) {
            return this.catch(reject);
        }
    }

    let myPromise = new MyPromise((resolve, reject) => {
        resolve('success.');
    });

    myPromise.success(value => {
        console.log("value:" + value);
    })

    myPromise.failure(err => {
        console.log("err" + err);
    })
}