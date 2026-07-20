const QuestionsLists = [
    "Implement stack using array"
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

class Node{
    constructor(val){
        this.element = val;
        this.previous = null;
    }
}
class StackFromArray{
    constructor(){
        this.head = null;
        this.stackArr = [];
        this.size = this.stackArr.length;
    }

    push(val){
        let x = new Node(val);
        // if(!this.size) this.head = x;
        this.stackArr[this.size] = val;
        this.size++;

        return this.stackArr;
    }

    // Remove the recent added data/value/node
    pop(){
        if(!this.size) throw new Error("Null pointer exception!! \n Stack is already empty..");
        this.stackArr.length = (this.size-1)
        this.size--;
    }

    peek(){}
}

const stack_from_arr = new StackFromArray();


