const QuestionsLists = [
    "Given 2 LinkedList which interect at some points, find the interaction point. (Without using extra space)",
    "Given a LinkedList, Deep copy the LinkedList which has random pointer. (Without using extra space)",
    "LRU Cache: Design a LRU(Least Recently Used cache)"
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
// ==========================================Doubly Linked list=============================================
class DoublyLinkedListNode{
    constructor(val){
        this.element = val;
        this.next = null;
        this.previous = null;
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    createADoublyLinkedListFromArray(arr=[10, 20, 30, 40]){
        this.head = new DoublyLinkedListNode(arr[0]);
        this.tail = this.head;
        
        let c = this.head;
        // c.previous = null;
        this.size += 1;

        for(let i=1; i<arr.length; i++){
            let x = new DoublyLinkedListNode(arr[i]);
            this.tail = x;
            x.previous = c;

            c.next = x;
            c = c.next;
            this.size++;
        }
        // console.log("Doubly linkedList : ", this.head);
        return this.head;
    }

    printDoubleLinkedList(head){
        let c = head;
        let llNode = c.element;
        while(c.next){
            // console.log(' --> ', c.element);
            llNode += ' ---> '+c.next.element;
            c = c.next;
        }
        console.log(llNode);
    }

    LRUDesign(){
        let map = new Map();

        const LRU_init = () => {
            if(this.size>0) return;

            this.head = new DoublyLinkedListNode(-1)
            this.tail = new DoublyLinkedListNode(-1);

            this.head.next = this.tail;
            this.tail.previous = this.head;
            console.log("lruInit : ", this.head);
            
            return this.head;
        }

        // Move pointer
        const moveCacheNode = (getCacheNode) => {
            let x = getCacheNode;
            
            // adjust previous neighbour's, next and previous pointers
            x.next.previous = x.previous;
            x.previous.next = x.next;

            // now place/move x to right near tail
            x.next = this.tail;
            x.previous = this.tail.previous;

            // Now break the link of previous tail and it's left neighbour
            // And adjust 'x'
            this.tail.previous = x;
            x.previous.next = x;

            this.printDoubleLinkedList(this.head);
        }

        // Add new
        const addNewCacheNode = (cache_node) => {
            // Insert new at last(tail)
            cache_node.next = this.tail;
            cache_node.previous = this.tail.previous;

            this.tail.previous = cache_node;
            cache_node.previous.next = cache_node;
        }

        // insert
        const insert = (val) => {
            
            // if size = 0, call LRU_init fun()
            LRU_init();

            // if size > 0
            // 1st check in hashMap 
            //      --> if exist: then Move cache node to right near tail
            //      --> If not : then 
            //          --> Check size:
            //              --> if size >= 5 : 
            //                  --> remove the 1st cache node and insert new
            //              --> else part:[if size < 5] : just insert

            if(map.has(val)){
                const getCacheNode = map.get(val);
                
                // Move this cache node to right side near tail;
                moveCacheNode(getCacheNode);
            }else{ //----------------------------> If new cache node arrived
                let n = new DoublyLinkedListNode(val);

                if(this.size>=5){ //-----------------------> if size >= 5: 
                    let x = this.head.next.next;

                    // Delete oldest chache node(1st positioned node)
                    // now shift head to the next position
                    // x.next = x.next.next;
                    // x.previous = this.head;
                    // this.head = x;

                    this.head.next = x;
                    x.previous = this.head;

                    map.delete(x);

                    // Now after deleting oldest cache node
                    // Insert new at last(tail)
                    addNewCacheNode(n);

                    this.printDoubleLinkedList(this.head);
                }else{ //----------------------------------> if size < 5: Just insert at end
                    console.log("if size < 5: Just insert at end");
                    
                    addNewCacheNode(n);
                   
                    this.size++;

                    this.printDoubleLinkedList(this.head);
                }
                map.set(val, n)
            }

            return this.head;
        }

        // delete

        // move

        return {insert, LRU_init}
    }
}
const doublyLL = new DoublyLinkedList();

/**
 * An LRU (Least Recently Used) cache is a storage mechanism that holds a 
 * limited amount of data. When the cache reaches full capacity, it automatically 
 * discards the item that hasn't been accessed for the 
 * longest time to make room for new data.
 * 
 * To design it: we can use (HashMap/HashSet)+DoublyLinkedList
 */
// class LRU extends DoublyLinkedList{
//     constructor(size=5){
//         super();
//         this.size = size;
//     }

//     // 
//     initFn(){
//         this.head = new DoublyLinkedListNode(-1);
//         this.tail = new DoublyLinkedListNode(-1);
//         this.head.next = this.tail;
//         this.tail.previous = this.head;

//         console.log("LRU DoublyLinkedList : ", this.head);
//         return this.head;
//     }

//     /**
//      * insert val/node just before tail.
//      * You can assume that we are entering node/val to the tail only
//      */
//     insertToCache(val){
//         let h = this.initFn();
//         let cache = new DoublyLinkedListNode(val);

//         // check the size;

//         // insert into LinkedList
//         let temp = this.tail.previous;
//         cache.next = this.tail;
//         cache.previous = temp;
//         this.tail.previous = cache;
//         // this.head.next = cache;
//         return {head:this.head, tail: this.tail};
        
//     }
// }
// const lru = new LRU();

