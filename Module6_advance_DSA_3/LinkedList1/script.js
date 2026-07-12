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
        // this.insertKSeqelntialElementFrom0ToLL();
    }

    // just for my helper function
    insertKSeqentialElementFrom0ToLL(k=10){
        // if size  > 0 or not undefined or not null
        // i.e; this.head has some value
        if(this.size){
            let curr = this.head;
            while(curr.next){
                curr = curr.next;
            }

            for(let i=1; i<=k; i++){
                let n = new listNode(i);
                curr.next = n;
                curr = curr.next;
                this.size++;
            }
        }else{
            let n = new listNode(1);
            this.head= n;
            this.size++;

            let curr = this.head;
            for(let i=2; i<=k; i++){
                let n = new listNode(i);
                curr.next = n;
                curr = curr.next;
                this.size++;
            }
        }
        return this.head;
    }

    isEmpty(){
        return this.size === 0;
    }

    countSizeOfLL(){
        if(!this.size) return 0;

        let curr = this.head;
        let cnt = 1;
        while(curr.next){
            cnt++;
            curr = curr.next;
        }
        return cnt;
    }

    accessKthPosition(k){
        if(!this.size)  throw new Error("Error! LinkedList is empty..")

        let curr = this.head;
        let idx = 0;
        if(curr.element === k) return 0;
        
        while(curr.next){
            curr = curr.next;
            idx++;
            if(curr.element === k) {
                return idx;
            }
        }
        return -1;
    }

    

}

const ll1 = new LinkeList1();