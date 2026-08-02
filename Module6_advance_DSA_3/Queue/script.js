const QuestionsLists = [
    "Queue implementation using LinkedList.",
    "Queue implementation using Stack.",
    "Nth perfect number: Return the Nth number formed by using 1 and 2."
];

listObject('class_topic', QuestionsLists);


class Node {
    constructor(val) {
        this.element = val;
        this.next = null;
    }
}

/**
 * Que: Queue implementation using LinkedList.
 */
class QueueUsingLL {
    constructor(capacity = 10) {
        this.capacity = capacity;
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Enqueue: Insert/Add element from rear/back side
     */
    enqueue = (val) => {
        let x = new Node(val)
        if (this.size === this.capacity) throw new Error("Alert!! Queue has already has reached to it's max limit");

        if (this.size === 0) {
            this.head = x;
            this.tail = x;
        } else {
            this.tail.next = x;
            this.tail = x;
        }
        this.size += 1;
        return this.head;
    }

    /**
     * size: Get siz eof Queue data
     */
    getSize = () => {
        let c = this.head;
        let i = 1;
        while (c.next) {
            c = c.next;
            i++;
        }
        return i;
    }

    /**
     * De-queue: Remove element from Queue from rear/tail side
     */
    dequeue = () => {
        if (this.size === 0) throw new Error("Error!! Queue doesn't has any remaining data for dequeue opration.");

        this.head = this.head.next;
        this.size -= 1;
        if (this.head === null) this.tail = null;

        return this.head;
    }

    /**
     * Peek: To select the head/1st inserted data in the Queue.
     */
    peek = () => {
        if (this.size === 0) throw new Error('Error!! No available data for peek opration.');

        return this.head.element;
    }

    /**
     * isEmpty: Check if the queue has no data
     */
    isEmpty = () => {
        return this.size === 0;
    }

    /**
     * isFull: Check if Queue has reached to it's max capacity.
     */
    isFull = () => {
        return this.size === this.capacity;
    }

    clear = () => {
        this.head = null;
        this.tail = null;
        this.size = 0;
        return this.tail;
    }
}

const queueUsingLL = new QueueUsingLL();

/**
 * Que: Queue implementation using Stack.
 * To implement this, we have to have 2 stack s1, s2.
 * Enqueue : All enqueue operations are done in s1 stack
 * Dequeue : All dequeue operation will be happening from s2 stack.
 * isEmpty : We have to check both the stacks.
 * Size : To get size we have to iterate through both stacks and count the data length.
 * 
 * Enqueue in s1, 
 * For dequeu() calls, 
 *  1. Check s2, if data availabe remove the top most data
 *  2. if data not available, get all the data from s1 and fill it to s2 and then remove data in LIFO order
 */
class Stack {
    constructor(capacity = 5) {
        this.head = null;
        this.size = 0;
        this.capacity = capacity
    }

    push(val) {
        let x = new Node(val);
        if (!this.head) {
            this.head = x;
        } else {
            x.next = this.head;
            this.head = x;
        }
        this.size += 1;
        return this.head;
    }
    pop() {
        if (!this.size) throw new Error('Error! Stack is empty.')
        this.head = this.head.next;
        this.size -= 1;
        return this.head;
    }
    peek() {
        if (!this.size) throw new Error('Error! Stack is empty.');
        return this.head.element;
    }
    isEmpty() {
        return this.size === 0;
    }
}
class QueueUsingStack {
    constructor() {
        this.s1 = new Stack(7);
        this.s2 = new Stack(7);
    }

    enqueue(val) {
        this.s1.push(val);
        return this.s1.head;
    }

    dequeue() {
        // if(this.s2.size===0) throw new Error('Error!! Queue already empty.');
        let dequedVal = undefined;

        // 1st check, if s2 is empty then 1st pull data from s1 and then deueue
        if (this.s2.size === 0) {
            if (this.s1.size === 0) throw new Error('Error!! Queue already empty.');

            let curr = this.s1.head;
            while (curr) {
                let val = this.s1.peek();
                this.s2.push(val);
                curr = this.s1.pop();
            }
            dequedVal = this.s2.peek();
            this.s2.pop();
        } else {
            dequedVal = this.s2.peek();
            this.s2.pop();
        }
        return { s1: this.s1, s2: this.s2, dequedVal }
    }

    front() {
        if (this.s2.isEmpty()) {
            if (this.s1.isEmpty()) throw new Error("Error!! Queue is already empty");

            while (!this.s1.isEmpty()) {
                let top = this.s1.peek();
                this.s2.push(top);
                this.s1.pop();
            }
            return this.s2.peek();
        } else {
            return this.s2.peek();
        }
    }

    getSize() {
        return (parseInt(this.s2.size) + parseInt(this.s1.size))
    }

    isEmpty() {
        return (parseInt(this.s2.size) + parseInt(this.s1.size)) === 0
    }
}

const stck = new Stack();
const queueUsingStck = new QueueUsingStack();


// const{enqueue, dequeue, clear, isEmpty, peek, isFull, head} = queueUsingLL;
/**
 * Que: "Nth perfect number: Return the Nth number formed by using 1 and 2.
 * Question explaination: how to find and generate the Nth perfect number formed using only the digits 1 and 2.
 *      1. Problem Understanding: 
 *          - The sequence of numbers formed using only 1 and 2 sorted in ascending order is:
 *              1 -- 2 -- 11 -- 12 -- 21 -- 22 -- 111 -- 112 -- 121 -- 122
 * Ans: if N = 5 then 5th perfect number=21
 */
function findNthPerfectNumber(n = 5) {
    const { enqueue, dequeue, clear, isEmpty, peek, isFull, head } = new QueueUsingLL(parseInt(n + 2));
    const a = 1;
    const b = 2;
    enqueue(a);
    enqueue(b);
    // console.log("queueUsingLL : ", queueUsingLL, queueUsingLL.head, peek());

    for (let i = 1; i < n; i++) {
        let val = peek();
        enqueue(val * 10 + a);
        enqueue(val * 10 + b);
        dequeue();
    }
    return peek();

}