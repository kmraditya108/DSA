const QuestionsLists = [
    "Given a LL find the middle element"
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

        this.insert1ToKElement(8);
    }

    insert1ToKElement(k){
        let c = null;

        for(let i=1; i<=k; i++){
            let node = new Node(i);
            if(i===1){
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
        
        // const bf = () => {

        //     // get the length
        //     let mid = parseInt((this.size-1)/2);
        //     let curr = this.head;
        //     for(let i=0; i<mid; i++){
        //         curr = curr.next;
        //     }
        //     console.log("middle is : ", curr.element);
        // }
        // bf();


        1, 2, 3, 4, 5, 6, 7, 8
        // s->1, 2, 3, 4
        // f->1, 3, 5, 7
        // slow fast pointer
        const opt = () => {
            let slw = this.head;
            let fst = this.head;
            while(fst.next.next){
                slw = slw.next;
                fst = fst.next.next;
            }
            // console.log("middle is ", slw.element);
            
            return slw.element;
        }
        return opt();
        
    }
}

const ll2 = new LinkedListII();