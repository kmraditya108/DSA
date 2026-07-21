
class StackFromArray1{
    constructor(capacity){
        this.stackArr = new Array(capacity);
        this.size = 0;
        this.tail = -1;
    }

    push(val){
        this.tail++;
        this.stackArr[this.tail] = val;
        this.size++;
        
        return this.stackArr;
    }

    // Remove the recent added data/value/node
    pop(){
        if(!this.size) throw new Error("Null pointer exception!! \n Stack is already empty..");
        this.stackArr.length = this.tail;
        this.tail--;
        this.size--;

        return this.stackArr;
    }

    peek(){
        if(!this.size) throw new Error("Null pointer exception!!\nNo stacks available.")
        
        return this.stackArr[this.tail];
    }

    isEmpty(){
        return this.size===0;
    }

    clear(){
        this.stackArr.length = 0;
        this.tail = -1;
        this.size = 0;
        return this.stackArr;
    }
}

const stack_arr = new StackFromArray1();

function fillArrayStack1(arr=[10, 12,14,15,20,34]){
    for(let i of arr)
        stack_arr.push(i);

    return stack_arr;
}