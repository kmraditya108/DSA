const QuestionsLists = [
    "Given 2 LinkedList which interect at some points, find the interaction point. (Without using extra space)",
    "Given a LinkedList, Deep copy the LinkedList which has random pointer. (Without using extra space)",
];

listObject('class_topic', QuestionsLists);

class Node{
    constructor(val){
        this.element = val;
        this.next = null;
        this.random = null;
    }
}

class NodeWithRandom{
    constructor(val){
        this.element = val;
        this.next = null;
        this.random = null;
    }
}

class LinkedListIII{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    creatLLOutOfArray(arr = [1,2,3,4,5,6]){
        let n = arr.length;
        this.head = new Node(arr[0]);

        let curr = this.head;
        for(let i=1; i<n; i++){
            curr.next = new Node(arr[i]);
            curr = curr.next;
            this.size++;
        }
        return this.head;
    }

    // interact 2 LinkedList
    creatingInteraction(h1, val){
        let c1 = h1;
        while(c1){
            c1 = c1.next;
            if(c1.element === val) break;
        }
        console.log("c1 : ", c1);
        return c1;
    }

    findInteractionPoint(){
        let h1 = this.creatLLOutOfArray([5,3,6,7,2,0,8]);
        let h2 = this.creatLLOutOfArray([8,4]);
        h2.next = this.creatingInteraction(h1,7); // Here interaction done;
        console.log(h1, h2);

        let p1 = h1;
        let p2 = h2;
        while(p1 && p2){
            p1 = p1.next;
            p2 = p2.next;

            if(!p1) p1 = h2;
            if(!p2) p2 = h1;

            if(p1.element === p2.element) return {ans: `We have pointer ${p1.element}`, p1};
        }
        return -1;
    }

    createLinkedListWithRandomPointer(arr = [10, 20, 30, 40]){
        if (!arr.length) {
            this.head = null;
            this.size = 0;
            return this.head;
        }

        const nodes = arr.map(val => new Node(val));

        for (let i = 0; i < nodes.length; i++) {
            if (i < nodes.length - 1) nodes[i].next = nodes[i + 1];
            const randomIndex = (i + 2) % nodes.length;
            nodes[i].random = nodes[randomIndex];
        }

        this.head = nodes[0];
        this.size = nodes.length;
        return this.head;
    }

    printLinkedListWithRandomPointer(head = this.head) {
        const result = [];
        let curr = head;

        while (curr) {
            result.push({
                value: curr.element,
                next: curr.next ? curr.next.element : null,
                random: curr.random ? curr.random.element : null
            });
            curr = curr.next;
        }

        console.log(result);
        return result;
    }

    // Deep copy the LinkedList which has random pointer
    deepCopyWithRandomPointer(){
        let ll = this.createLinkedListWithRandomPointer([10, 20, 30, 40]);

        /**
         * The main motive is to do a deep copy from a given LinkedList with Random pointer.
         * To do so, 1st create new node(next=null and random=null) from the given linkedlist next pointers.
         * Side by side save the given LinkedList node pointers(next and random) in the HashMap.
         * 
         * Once done the above, loop again from begining and now get the random from the hashmap and assign it to 
         * newly created LinkedList's random pointer;
         * 
         * That's all
         */
        const bf_hasing = () => {
            let map = new Map();
            let h1 = ll;
            let h2 = new NodeWithRandom(-1);
            let tail = h2;
            while(h1){
                tail.next = new NodeWithRandom(h1.element);
                tail = tail.next;
                map.set(h1.element, h1);
                h1 = h1.next;
            }
            h2 = h2.next;
            let newLL = h2;
            // console.log("h2: ", h2, h1);
            
            h1 = ll;
            while(h1){
                let h1_random = map.get(h1.element);
                newLL.random = h1_random.random;
                newLL = newLL.next;
                h1 = h1.next;
            }

            console.log("h1 : ", ll);
            console.log("final bf h2 :: ", h2);
        }

        /**
         * This is similar as above, 
         * Just I have replace HashMap and directly get data from given
         * LinkedList in 2nd loop to set Random values
         */
        const optimal1 = () => {
            let old = ll;
            let h2 = new NodeWithRandom(-1);
            let newLL = h2;
            while(old){
                let ele = old.element;
                newLL.next = new NodeWithRandom(ele);
                newLL = newLL.next;

                old = old.next;
            }

            old = ll;
            h2 = h2.next;
            newLL = h2
            while(old){
                let randomVal = old.random;
                newLL.random = randomVal;

                newLL = newLL.next;
                old = old.next;
            }
            console.log("Final Optimal-1 h2 : ", h2);
        }

        /**
         * In this we are just coping the prev/current values and adding it as the extra pointer as the next address
         * later we are destructuring old LinkedLint and newly created LinkedList(added in as next pointer) 
         * 
         * TC: O(n) = O(n);
         * SC: O(1) = O(1)
         */
        const optimal2 = () => {
            let old = ll;
            let h1 = old;
            
            //Allocating Next pointer here
            while(h1){
                let x= new NodeWithRandom(h1.element);
                x.next = h1.next;
                h1.next = x;
                h1 = x.next;
            }

            h1 = old;
            //Allocating Random pointer here
            while(h1){
                h1.next.random = h1.random;
                h1 = h1.next.next;
            }

            h1 = old;
            let h2 = new NodeWithRandom(-1);
            let newLL = h2;
            // newLL = h1.next;
            //Now depart new and old LinkedList
            while(h1){
                newLL.next = h1.next;
                newLL = newLL.next;

                h1.next = newLL.next;
                h1 = h1.next;
            }
            h2 = h2.next;


            console.log("final optimal2 h1: ", old);
            console.log("final optimal2 new: ", h2);
            
        }

        return {bf_hasing : bf_hasing(), optimal1:optimal1(), optimal2:optimal2()};
    }
}

const llIII = new LinkedListIII();
// const randomHead = llIII.createLinkedListWithRandomPointer([10, 20, 30, 40]);
// llIII.printLinkedListWithRandomPointer(randomHead);


