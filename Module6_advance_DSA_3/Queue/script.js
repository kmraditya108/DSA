const QuestionsLists = [
    "Queue implementation using LinkedList."
];

listObject('class_topic', QuestionsLists);


class Node{
    constructor(val){
        this.element = val;
        this.next = null;
    }
}

class QueueUsingLL{
    constructor(capacity=5){
        this.capacity = capacity;
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Enqueue: Insert/Add element from rear/back side
     */
    enqueue(val){
        let x = new Node(val)
        if(this.size === this.capacity) throw new Error("Alert!! Queue has already has reached to it's max limit");

        if(this.size===0){
            this.head = x;
            this.tail = x;
        }else{
            this.tail.next = x;
            this.tail = x;
        }
        this.size+=1;
        return this.head;
    }

    /**
     * size: Get siz eof Queue data
     */
    getSize(){
        let c = this.head;
        let i = 1;
        while(c.next){
            c = c.next;
            i++;
        }
        return i;
    }

    /**
     * De-queue: Remove element from Queue from rear/tail side
     */
    dequeue(){
        if(this.size===0) throw new Error("Error!! Queue doesn't has any remaining data for dequeue opration.");
        
        this.head = this.head.next;
        this.size -= 1;
        if(this.head===null) this.tail=null;
        
        return this.head;
    }

    /**
     * Peek: To select the head/1st inserted data in the Queue.
     */
    peek(){
        if(this.size===0) throw new Error('Error!! No available data for peek opration.');

        return this.head;
    }

    /**
     * isEmpty: Check if the queue has no data
     */
    isEmpty(){
        return this.size===0;
    }

    /**
     * isFull: Check if Queue has reached to it's max capacity.
     */
    isFull(){
        return this.size === this.capacity;
    }

    clear(){
        this.head = null;
        this.tail = null;
        this.size = 0;
        return this.tail;
    }
}

const queueUsingLL = new QueueUsingLL();