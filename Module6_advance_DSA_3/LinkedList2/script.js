const QuestionsLists = [
    "Given a LL find the middle element",
    "Given 2 sorted LinkedList(Or create it from an Array), merge both LinkedList and rearrange in sorted manner."
];

listObject('class_topic', QuestionsLists);

class Node{
    constructor(val){
        this.element = val;
        this.next = null;
    }
}
class LinkedListII{
    constructor(){
        this.head = null;
        this.size = 0

        this.llFromArray();
    }

    llFromArray(arr=[1,2,3,4,5]){
        let c = null;
        let n = arr.length;

        for(let i=0; i<n; i++){
            let node = new Node(arr[i]);
            if(i===0){
                this.head = node;
                c = this.head;
            }else{
                c.next = node;
                c = c.next;
            }
            this.size++;
        }

        return this.head;
    }

    isEmpty(){
        return this.size === 0;
    }

    /**
     * Given a LL find the middle element
     */
    findMiddleElement(){
        if(!this.size) throw new Error("Error!! Empty LinkedList..");

        console.log("LL is ", this.head);
        
        const bf = () => {

            // get the length
            let mid = parseInt((this.size-1)/2);
            let curr = this.head;
            for(let i=0; i<mid; i++){
                curr = curr.next;
            }
            console.log("middle is : ", curr.element);
        }
        bf();


        // 1, 2, 3, 4, 5, 6, 7, 8
        // s->1, 2, 3, 4
        // f->1, 3, 5, 7
        // slow fast pointer
        const opt = () => {
            let slw = this.head;
            let fst = this.head;
            while(fst.next && fst.next.next){
                slw = slw.next;
                fst = fst.next.next;
            }
            // console.log("middle is ", slw.element);
            let returnVal = slw.element
            if (this.size%2 ===0) {
                returnVal = slw.element+slw.element;  
            }
            
            const ans =  !fst.next ? returnVal : false;
            console.log("final o/p : ", ans);
            
        }
        opt();
    }

    /**
     * Given a LinkedList(Or create it from an Array), sort it.
     *  - Merge sort : Most suitable for LinkedList
     */
    sortLL(){

        // Here the origin 2 linkedlist got distroyed
        // S.C: O(1)
        const sortLL1 = () => {
            let p1 = this.llFromArray([3,4,8,12,20])
            let p2 = this.llFromArray([1,2,5,6])

            let ll3 = new Node(-1);
            let tail = ll3;
            
            // use merge sort;
            while(p1 && p2){
                if(p1.element<=p2.element){
                    tail.next = p1;// new Node(p1.element);
                    p1 = p1.next;
                }else{
                    tail.next = p2;// new Node(p2.element);
                    p2 = p2.next;
                }
                tail = tail.next;
            }

            if(!p1){
                tail.next = p2;
            }else{
                tail.next = p1;
            }
            // Removing dummy data(-1)
            ll3 = ll3.next;
            return ll3;
        }


        // We have kept the origin 2 linkedlist
        // S.C: O(ll1+ll2)
        const sortLL2 = () => {
            const ll1 = this.llFromArray([3,4,8,12,20])
            const ll2 = this.llFromArray([1,2,5,6])

            let p1 = ll1;
            let p2 = ll2;

            let ll3 = new Node(-1);
            let tail = ll3;
            
            // use merge sort;
            while(p1 && p2){
                if(p1.element<=p2.element){
                    tail.next = new Node(p1.element);
                    p1 = p1.next;
                }else{
                    tail.next = new Node(p2.element);
                    p2 = p2.next;
                }
                tail = tail.next;
            }

            if(!p1){
                tail.next = p2;
            }else{
                tail.next = p1;
            }
            
            // Removing dummy data(-1)
            ll3 = ll3.next;
            return ll3;
        }

        return{sort1: sortLL1(), sort2: sortLL2()};
    }



}

const ll2 = new LinkedListII();