const QuestionsLists = [
    "Given a LinkedList find the middle element",
    "Given 2 sorted LinkedList(Or create it from an Array), merge both LinkedList and rearrange in sorted manner.",
    "Sort a given LinkedList.",
    "Given a LinkedList of distinct element, check whether it contains cycle or not.",
    "Given a LinkedList of istinct element, and in the given LinkedList a cycle occur, Find the start point of the cycle"
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

    sortLL1(arr=[3,7,0,5,2,9]){
        let lnkdLst = this.llFromArray(arr);
        // console.log("lnkdLst : ", lnkdLst);

        let curr = lnkdLst;
        let len = 0
        while(curr){
            curr = curr.next;
            len++;
        }

        const getMiddleUsingSlowFastPointer=(ll)=>{
            if(!ll) return ll;
            let slow = ll;
            let fast = ll;

            while(fast.next && fast.next.next){
                slow = slow.next
                fast = fast.next.next;
            }
            return slow;//.element
        }
        // console.log("Find middle using function : ", getMiddleUsingSlowFastPointer(lnkdLst));

        const mergeTwoLL = (linkedList1, linkedList2) => {
            let l1 = linkedList1;
            let l2 = linkedList2;

            let l3 = new Node(-1);
            let tail = l3

            while(l1 && l2){
                if(l1.element <= l2.element){
                    tail.next = l1;
                    l1 = l1.next;
                    // console.log("l3 if : ", tail);
                }else{
                    tail.next = l2;
                    l2 = l2.next;
                    // console.log("l3 else : ", tail);
                }
                tail = tail.next;
            }
            // console.log("tail early : ", tail);
            
            if(!l1){
                tail.next = l2;
            }else{
                tail.next = l1;
            }
            console.log("l3 inside : ", tail);
            l3 = l3.next;
            
            return l3;
        }
        
        const mergeLLUsingRecurrsion = (ll) => {
            if(!ll || !ll.next) return ll;

            let mid = getMiddleUsingSlowFastPointer(ll);
            let leftHalf = ll;
            let rightHalf = mid.next;
            mid.next = null;
            
            let sortedLeft = mergeLLUsingRecurrsion(leftHalf);
            let sortedRight = mergeLLUsingRecurrsion(rightHalf);

            return mergeTwoLL(sortedLeft, sortedRight);
        }

        return mergeLLUsingRecurrsion(lnkdLst);
    }


    // I have created a dummy LinkedList that contains cycle
    createCycledLL() {
        const approach1 = () =>{
            // const node1 = new Node(10);
            // const node2 = new Node(20);
            // const node3 = new Node(30);
            // const node4 = new Node(40);
            // const node5 = new Node(50);
            // const node6 = new Node(60);
            // const node7 = new Node(70);
            // const node8 = new Node(80);
            // const node9 = new Node(90);
            // const node10 = new Node(100);
            // const node11 = new Node(110);
            // const node12 = new Node(120);

            // node1.next = node2
            // node2.next = node3
            // node3.next = node4
            // node4.next = node5
            // node5.next = node6
            // node6.next = node7
            // node7.next = node8
            // node8.next = node9
            // node9.next = node10
            // node10.next = node11
            // node11.next = node12
            // node12.next = node7;
            // console.log("node1 : ", node1);
            // return node1;
        }

        const approach2 = () => {
            let n1 = new Node(10);
            let dummy = n1;
            let cycle = null;
            for(let i=2; i<=10; i++){
                dummy.next = new Node(i*10);
                dummy = dummy.next;
                if(i==6) cycle = dummy;
            }

            dummy.next = cycle;
            // console.log("n1 : ", n1);
            return n1;
        }
        return approach2();
    }

    /**
     * Check if given LinkedList(distinct element) has cycle
     */
    isCycleExist(){
        const head = this.createCycledLL();
        console.log("head : ", head);

        let slow = head;
        let fast = head;

        while(fast.next && fast.next.next){
            slow = slow.next;
            fast = fast.next.next;

            if(slow.element === fast.element) return {isCycle:true, element: slow};
        }

        return false;
        
    }

    /**
     * Que: Find start point of the cycle
     * 
     * Note: It's major to know the dist. between the fast and slow meets 1st time to the actual 
     *      cycle start point  = the distance between LinkedList start point to cycle start point
     * 
     * Eg: if cycle start at point 'x' and lets suppose fast and slow meets at 'y', 1st time and 
     *      let suppose:
     *          the distance b/w LL start to cycle  = D
     *          The distance b/w D to 'y' = P
     *          And total cycle distance = C
     *      
     *      As, [2*Slow pointer = fast pointer]
     *      Hance, 2(D+P) = D+P+n.C -------------> here n is the total round done by Fast pointer
     *      After solving this: 
     *          D = n.C - P [here (n.C - P) is nothing but the distance b/w 'P' to cycle start point]
     * 
     *      Hance D is the same distance as after point 'P' to cycle start.
     *      So, if the both pointers runs on the same speed one from LinkedList start and other one from 1st meeting point
     *          at the place where they meet is the cycle start point.
     */
    findStartPointOfCycle(){
        let head = this.createCycledLL();
        let slow = head.next;
        let fast = head.next.next;
        // As the LinkedList has the cycle for sure, Hance I am just itirating till (fast.element === slow.element)
        while(fast.element !== slow.element){
            slow = slow.next;
            fast = fast.next.next;
        }
        console.log(slow, " : slow - fast : ", fast);
        

        fast = head;
        while(fast.element !== slow.element){
            slow= slow.next;
            fast = fast.next;
        }

        return slow;
    }

}

const ll2 = new LinkedListII();