const QuestionsLists = [
    "create linkedList class",
    "insert 'K' sequential element in LL",
    "Check if the LL is empty or not?",
    "Given an Linked List, access the Kth element.",
    "Insert element at the last of the Linked List",
    "Given a Linked List, Count the Linked list size.",
    "Given a Linked List, insert node on Kth position",
    "Given a Linked List, insert node at the begining and assign it as head.",
    "Reverse a Linked List",
    "Given an array create a LinkedList out of array and then check if it's pelindrom or not"
];

listObject('class_topic', QuestionsLists);

class Node{
    constructor(val){
        this.element = val;
        this.next = null;
    }
}

class LinkeList1{
    constructor(){
        this.head = null;
        this.size = 0;
        this.insertKSeqentialElementFrom0ToLL();
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
                let n = new Node(i);
                curr.next = n;
                curr = curr.next;
                this.size++;
            }
        }else{
            let n = new Node(1);
            this.head= n;
            this.size++;

            let curr = this.head;
            for(let i=2; i<=k; i++){
                let n = new Node(i);
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

    accessElementPosition(k){
        if(!this.size)  throw new Error("Error! Empty LinkedList..")

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

    accessKthPositionedEle(k){
        console.log(k);
        
        if(!this.size && k>0) throw new Error("Error!! Empty LinkedList..");
        if((!this.size || this.size===1) && k==0) return this.head;

        let curr = this.head;
        let i = 0;
        while((curr.next) && i<=k){
            // if(i===k) return curr;
            curr = curr.next;
            i++;
        }

        return i<k ? null : curr;

        
    }

    // =================================Insertion to LinkedList - (Start)==================================
    /**
     *  - We have multiple method in insertion of LinkedList
     */
    insertAtTail(k){
        let n = new Node(k);

        if(!this.size){
            this.head = n;
            
        }else{
            let curr = this.head;
            while(curr.next){
                curr = curr.next;
            }
            curr.next = n;
        }

        this.size+=1;
        return ll1;
    }

    insertAtHeadPosition(k){
        // if(!this.size) throw new Error("Error! Empty Linked list...");
        let n = new Node(k);
        n.next = this.head;
        this.head = n;
        this.size+=1;
        return ll1;
    }

    insertAtPositionK(k, val){
        if(this.isEmpty()) throw new Error("Error!! Empty LinkedList..");
        if(k>=this.size) throw new Error("Error! OutOfBoundary.");
        

        let n= new Node(val);
        let i=0;
        let curr = this.head;
        // while((curr.next) && (i<k)){
        //     curr = curr.next;
        //     i++;
        // }

        for(let i=0; i<(k-1); i++){
            curr = curr.next;
        }

        let temp = curr.next;
        curr.next = n;
        n.next = temp;
        //-----------OR---------
        // n.next = curr.next;
        // curr.next = n;

        return this.head;
    }
    // =================================Insertion to LinkedList - (End)==================================

    
    // =================================Deletion to LinkedList - (Start)==================================
    deleteZeroth(){
        this.head = this.head.next;
        this.size--;
        return this.head;
    }

    deleteKthPosition(k){
        // in zero based indexing, we have to delete the (k-1)th positioned node;
        let cur = this.head;
        for(let i=0; i<(k-1); i++){
            cur = cur.next;
        }
        cur.next = cur.next.next;
        this.size--;
        return this.head;
    }
    // =================================Deletion to LinkedList - (End)==================================


    /**
     * Reverse a Linked List
     */
    reverseLL(){
        let ll2 = JSON.parse(JSON.stringify(ll1))
        let ll3 = JSON.parse(JSON.stringify(ll1))
        const approach1 = () => {
            let curr = this.head.next;
            let tail = null;
            let i = 0
            while(curr){
                this.head.next = tail;
                tail = this.head;
                this.head = curr;
                curr = curr.next;
                
                i++;
                
            }

            this.head.next = tail;
            return this.head;
        }
        console.log("approach1() : ", approach1());
        

        this.head = null;
        this.size = 0;
        this.insertKSeqentialElementFrom0ToLL();

        const approach2 = () => {
            let curr = this.head;
            let prev = null;
            while(curr){
                
                
                let temp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = temp;
            }
            this.head = prev;
            return this.head;
        }
        console.log("approach2() : ", approach2());
    }

    /**
     * Check pelindrom or not
     */
    isPelindrom(val){
        let arr = val.toString().split('');
        let n = arr.length;

        this.head = null;
        this.size = 0;

        // create a lonked list out of the given val
        this.head = new Node(arr[0]);
        let c = this.head;
        for(let i=1; i<n; i++){
            let n = new Node(arr[i]);
            c.next = n;
            c = c.next;
        }
        console.log("new this.head: ",this.head);

        // find the length of linkedList
        let len = 0;
        let curr = this.head;
        while(curr){
            curr = curr.next;
            len++;
        }
        console.log("length count : ", len);
        

        // get the middle of the linkedlist
        let mid = parseInt((len-1)/2);
        console.log("middle of the linkedList : ", mid);
        
        let head2 = null;
        let cr = this.head;
        for(let i=0; i<mid; i++){
            cr = cr.next;
        }
        head2 = cr.next;
        cr.next = null;

        console.log(this.head, " :: this.head -- head2 : ", head2);

        // Now reverse the head2 LinkedList
        let currNode = head2;
        let prevNode = null;
        while(currNode){
            let temp = currNode.next;
            currNode.next = prevNode;
            prevNode = currNode;
            currNode = temp;
        }

        head2 = prevNode;
        console.log("after reverse : ", head2);
        

        // now compare both linkedlist
        // As the (length of this.head linkedList) is greater than (length of head2 linkedList)
        // So in traversal head2 linkedList will become null earlier, if it's break and head2 linkedList is 
        // yet not null then return false - This is not pelindrom
        let ele1 = this.head;
        let ele2 = head2;
        while(ele2 && (ele1.element == ele2.element)){
            console.log(ele1.element, " : ele1.element == 1st == ele2.element : ", ele2.element);
            
            ele1 = ele1.next;
            ele2 = ele2.next;

            // console.log(ele2, ele1.element, " : ele1.element == 2nd == ele2.element : ", ele2.element);

        }

        if(!ele2) return `${val} is pelindrom`;
        return `${val} is not a pelindrom`;
    }
}

const ll1 = new LinkeList1();