class AnyArray {
    /**
     * 构造函数
     * @param arr
     */
    constructor(arr) {
        // 创建一个数组
        this.arr = arr instanceof Array ? arr : Array.from(arguments);
    }

    getArray() {
        return this.arr;
    }

    // 检测传入的数组是否达标
    checkArray() {
        if (!(this.arr instanceof Array)) {
            throw new Error('arr is not array');
        }

        return this.getArray().length > 0;
    }

    // 获取数组长度
    getLength() {
        return this.arr.length;
    }

    /**
     * 在数组中index的位置插入元素e
     * @param index
     * @param e
     */
    insert(index, e) {
        if (index < 0 || index > this.getLength()) {
            throw  new Error("insert failed. Index is illegal.")
        }
        for (let i = this.getLength() - 1; i >= index; i--) {
            this.arr[i + 1] = this.arr[i];
        }

        this.arr[index] = e;
    }

    /**
     * 在元素首位增加元素e
     * @param e
     */
    firstInsert(e) {
        this.insert(0, e);
    }

    /**
     * 在数组末尾插入元素e
     */
    endInsert(e) {
        this.insert(this.getLength(), e);
    }

    /**
     * 获取数组中索引index位置的元素
     * @param index
     */
    get(index) {
        if (index < 0 || index > this.getLength()) {
            throw  new Error("get failed. Index is illegal.")
        }

        return this.arr[index];
    }

    /**
     *
     * 设置数组中索引index位置设置元素
     * @param index
     */
    set(index, e) {
        if (index < 0 || index > this.getLength()) {
            throw  new Error("set failed. Index is illegal.")
        }
        this.arr[index] = e;
    }

    /**
     * 在数组中查找数组元素e
     * @param e 查找元素e
     * @return 如果查询到则返回该元素，反之返回undefined
     */
    find(e) {
        let result;

        if (!this.checkArray()) {
            return result;
        }

        for (let i = 0, len = this.getLength(); i < len; i++) {
            if (e === this.getArray()[i]) {
                result = this.getArray()[i];
                break;
            }
        }

        return result;
    }

    /**
     * 在arr数组中查找元素e
     * @param e 查找元素
     * @return  该元素在数组中的索引位置
     */
    findIndex(e) {
        let index = -1;

        if (!this.checkArray()) {
            return index;
        }

        for (let i = 0, len = this.getLength(); i < len; i++) {
            if (e === this.arr[i]) {
                index = i;
                break;
            }
        }

        return index;
    }

    /**
     * 查询元素e是否包含在数组内
     * @param e 查询的元素e
     * @return bool 布尔值 如果查询到则返回true，反之false
     */
    contains(e) {
        let bool = false;

        if (!this.checkArray()) {
            return bool;
        }

        for (let i = 0, len = this.getLength(); i < len; i++) {
            if (e === this.arr[i]) {
                bool = true;
                break;
            }
        }

        return bool;
    }


    /**
     * 在数组中移除index索引的元素
     * @param index
     * 返回该删除的元素
     */
    remove(index) {
        if (index < 0 || index > this.getLength()) {
            throw  new Error("Remove failed. Index is illegal.")
        }
        let ret = this.arr[index];
        for (let i = index + 1; i < this.getLength(); i++) {
            this.arr[i - 1] = this.arr[i];
        }
        this.arr.length = this.getLength() - 1;
        return ret;
    }

    /**
     * 移除数组中最后一个元素
     */
    removeLast() {
        return this.remove(this.getLength() - 1);
    }

    /**
     * 移除数组中第一个元素
     */
    removeFirst() {
        return this.remove(0);
    }

    /**
     * 移除元素e
     * @param e
     */
    removeElement(e) {
        let index = this.find(e);
        if (index !== -1) {
            this.remove(index);
        }
    }

    /**
     * 交换元素位置
     * @param i 索引i
     * @param j 索引j
     */
    swap(i, j) {
        if (i < 0 || i >= this.getLength() || j < 0 || j >= this.getLength()) {
            throw new Error("Index is illegal.");
        }
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]]
    }


    /**
     * 迭代器
     * @param items
     * @return {*}
     */
    static myIterator(items) {
        let i = 0;
        return {
            next() {
                let done = (i >= items.length);
                let value = !done ? items[i++] : undefined;
                return {
                    done,
                    value
                }
            }
        }
    }

    /**
     * forBob循环
     */
    forBob() {
        let result = "";
        let iterator = AnyArray.myIterator(this.arr);
        for (let i = 0; i < this.getLength(); i++) {
            result += iterator.next().value;
            if (i !== this.getLength() - 1) {
                result += ', ';
            }
        }
        return result;
    }
}



