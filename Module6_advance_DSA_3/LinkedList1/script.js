const QuestionsLists = [
    "create linkedList class",
    "insert 'K' sequential element in LL",
    "Check if the LL is empty or not?",
    "Given an Linked List, access the Kth element.",
    "Insert element at the last of the Linked List",
    "Given a Linked List, Count the Linked list size.",
    "Given a Linked List, insert node on Kth position",
    "Given a Linked List, insert node at the begining and assign it as head."
];

listObject('class_topic', QuestionsLists);

class listNode{
    constructor(val){
        this.element = val;
        this.next = null;
    }
}

class LinkeList1{
    constructor(){
        this.head = null;
        this.size = 0;

        this.head = new listNode(1);

        let curr = this.head;
        for(let i=2; i<10; i++){
            let n = new listNode(i);
            curr.next = n;
        }
        console.log("curr : ", curr);
        
        
    }

    // just for my helper function
    insertKSeqentialElementFrom0ToLL(k=10){
        for(let i=1; i<=k; i++){
            ll1.insertNode(i)
        }
    }

    isEmpty(){
        return this.size===0;
    }

    accessKthElement(k){
        let val = this.head;

        if(k<=0) throw new Error("K should be greater than and equal to 1...");
        if(!val) throw new Error("Empty LinkedList...");
        if(this.size < k) throw new Error("Linked list boundary error...");

        let ans = val;
        let cnt= 1;
        while(val && cnt<=k){
            ans = val;
            val = val.next;
            cnt++;
        }

        return ans;
    }

    insertNode(k){
        let node = new listNode(k);

        if(!this.head){
            this.head = node;
            this.size++;
        }else{
            let val = this.head;
            while(val.next){
                val = val.next;
            }
            // console.log("val: ", val);
            
            val.next = node;
            this.size++;
        }
        return this.head;
    }

    countLLSize(){
        let val = this.head;

        if(!val) throw new Error("Empty Linked list...");

        
        let cnt = 0;
        while (val) {
            cnt++;
            val = val.next;
        }

        return cnt;
        
    }

    insertAtPositionK(val, k){
        let ele = this.accessKthElement(k-1);
        let node = new listNode(val)
        if(ele){
            
            let temp = ele.next;
            ele.next = node;
            node.next = temp;
            // console.log("new ele", this.head);
            // console.log("temp", temp);

            return this.head;
        }

        return false;
    }

    insertNodeAtKthPosition(val, k){
        let ll = this.head;
        if(!ll) throw new Error("Error! Linked list is empty.....");

        let node = new listNode(val);
        let x = this.head;

        let i = 1;
        while(i<=k){
            x = x.next;
            i++;
        }

        console.log("x: ",x);
        console.log("node : ",node);
        
        

        /**
         * val = 10,
         * k = 2,
         * LL = 1-->2-->3
         * x = 1;
         * i=1
         * 
         * in loop:
         * - i<k | x={2, next:3},i=2
         * - 
         */
        // node.next = x.next

        // let temp = x;
        // x.next = node;
        // node.next = temp.next;


    }

}

const ll1 = new LinkeList1();