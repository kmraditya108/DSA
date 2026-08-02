class DNode{
    constructor(v){
        this.next = null;
        this.prev = null;
        this.element = v;
    }
}
class Deque{
    constructor(){
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    pushFront(v){
        let x = new DNode(v);

        if(!this.size){
            this.front = this.rear = x;
        }else{
            x.next = this.front;
            this.front.prev = x;
            this.front = x;
        }
        this.size+=1;
        return this.front;
    }

    pushRear(v){
        let x = new DNode(v);

        if(!this.size){
            this.front = this.rear = x;
        }else{
            x.prev = this.rear;
            this.rear.next = x;
            this.rear = x;
        }
        this.size += 1;
        return this.rear;
    }

    peekFront(){
        if(!this.size) throw new Error("Error!! Empty queue.");
        
        return this.front.element;
    }

    peekRear(){
        if(!this.size) throw new Error("Error!! Empty queue.");
        
        return this.rear.element;
    }

    popFront(){
        if(!this.size) throw new Error("Error!! Empty queue.");

        let temp = this.front;
        this.front = temp.next;

        if(!this.front){
            this.rear = null;
        }else{
            this.front.prev = null;
        }
        this.size-=1
        // return temp.element;
    }

    popRear(){
        if(!this.size) throw new Error("Error!! Empty queue.");
        
        let temp = this.rear;
        this.rear = temp.prev;
        
        if(!this.rear){
            this.front = null;
        }else{
            this.rear.next = null;
        }
        this.size-=1
        // this.rear = temp.
        // return temp.element;
    }

    isEmpty() {
        return this.size === 0;
    }

    /**
     * Que: Sliding window maximum: Given an integer array, find the max element in every window of size k.
     */
    slidingWindow = (arr=[1,8,5,6,7,4,2,0,3], k=4) => {
        let n = arr.length;

        for(let i=0; i<k; i++){
            if(!this.isEmpty() && arr[i]>this.peekRear()){
                this.popRear();
            }
            this.pushRear(arr[i]);
        }
        console.log("peekfront: ", this.peekFront());

        let s = 1;
        let e = k;
        while(e<n){
            let incoming = arr[e];
            let outgoing = arr[s-1];
            if(outgoing === this.peekFront()){
                this.popFront();
            }

            let peek_rear = this.peekRear();
            while(!this.isEmpty() && incoming>peek_rear){
                console.log("   before popRear : ", this.rear);
                this.popRear();
                console.log("   after popRear : ", this.rear);
                peek_rear = this.peekRear();
            }
            this.pushRear(incoming);
            console.log("peekfront: ", this.peekFront());
            
            s++;
            e++;
        }
    }
}

const dequeObj = new Deque()