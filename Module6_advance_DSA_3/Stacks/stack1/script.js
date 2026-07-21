const QuestionsLists = [
    "Implement stack using array",
    "Implement stack using LinkedList",
    "Valid Parentheses : Check if a given sequence of Parentheses is valid or not. |--- OR---| Given a string containing (), {}, [], determine if the input string is valid.",

];

listObject('class_topic', QuestionsLists);

/**
 * Stacks basic function:
 * a) Push: add data
 * b) pop: remove data
 * c) peek: get the 1st(head) data
 * d) size: get size of stack
 * e) isEmpty: check stack is empty or not[return boolean]
 */


class StackFromArray {
    constructor() {
        this.stackArr = [];
        this.size = 0;
    }

    push(val) {
        this.stackArr[this.size] = val;
        this.size++;

        return this.stackArr;
    }

    // Remove the recent added data/value/node
    pop() {
        if (!this.size) throw new Error("Null pointer exception!! \n Stack is already empty..");
        this.stackArr.length = (this.size - 1)
        this.size--;
    }

    peek() {
        if (!this.size) throw new Error("Null pointer exception!!\nNo stacks available.")

        return this.stackArr[this.size - 1];
    }

    isEmpty() {
        return this.size === 0;
    }

    clear() {
        this.stackArr.length = 0;
        this.size = 0;

        return this.stackArr;
    }
}

const stack_from_arr = new StackFromArray();


function fillArrayStack(arr = [10, 12, 14, 15, 20, 34]) {
    for (let i of arr)
        stack_from_arr.push(i);

    return stack_from_arr;
}
// =========================================Stack implementation using LinkedList================================

class Node {
    constructor(val) {
        this.element = val;
        this.next = null;
    }
}

class StackFromLinkedList {
    constructor(stack_length) {
        this.head = null;
        this.size = 0;
        this.capacity = stack_length;

        // this.push = this.push.bind(this);
        // this.pop = this.pop.bind(this);
        // this.peek = this.peek.bind(this);
        // this.isEmpty = this.isEmpty.bind(this);
        // this.clear = this.clear.bind(this);
    }

    push = (val) => {
        if (this.size >= this.capacity) throw new Error("Error Stack OutOfBound!!\nStack already reach to it's maximum length...");

        let x = new Node(val);
        x.next = this.head;
        this.head = x;

        this.size += 1;

        return this.head;
    }

    peek = () => {
        if (!this.size) throw new Error('Null pointer exception!!\nStack is already empty..');

        return this.head.element;
    }

    pop = () => {
        if (!this.size) throw new Error('Null pointer exception!!\nStack is already empty..');

        this.head = this.head.next;
        this.size--;

        return this.head;
    }

    isEmpty = () => {
        return this.size === 0;
    }

    clear = () => {
        this.head = null;
        this.size = 0;
        return this.head;
    }

    // to get dynamic head in destructuring call in another function call
    getHead = () => this.head;

    // to get dynamic size in destructuring call in another function call
    getSize = () => this.size;
}

const LinkedListStack = new StackFromLinkedList(10);

function fillLinkedListStack(arr = [10, 12, 14, 15, 20]) {
    for (let i of arr)
        LinkedListStack.push(i);

    return LinkedListStack;
}

// ==================================== Other Stack related question =====================================


function isValidParenthesis(str = '({})[]') {

    const { push, peek, pop, isEmpty, getSize, getHead } = LinkedListStack;// new StackFromLinkedList(10); // -----------> Destructuring method of ES6

    // if string is valid parenthesis, then it should be in pair means multiple of 2, hence if it's not % of 2 then false;
    if (str.length % 2 !== 0) return false;

    const approach1 = () => {
        for (let v of str) {
            if ((v === '(') || (v === '{') || (v === '[')) {
                push(v);
                console.log("head : ", getHead());
                console.log("head-1 : ", LinkedListStack.head);

            } else {
                const parenthesis = peek();
                if ((parenthesis === '(') && (v !== ')')) return false;
                if ((parenthesis === '{') && (v !== '}')) return false;
                if ((parenthesis === '[') && (v !== ']')) return false;

                pop();
            }
        }
        return { size: getSize(), head: getHead(), isValidParenthesis: true };
    }

    const approach2 = () => {
        const pair_mapping = {
            ')': '(',
            '}': '{',
            ']': '['
        }

        for (let v of str) {
            if (v in pair_mapping) {
                const hVal = peek();

                if (isEmpty() || hVal !== pair_mapping[v]) return false;
                pop();
            } else {
                push(v);
            }
        }

        return { size: getSize(), head: getHead() };
    }

    return { approach1: approach1(), approach2: approach2() };
}
