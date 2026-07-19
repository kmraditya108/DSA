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
        const bf_hasing = () => {
            
        }

        const optimal = () => {
            
        }
    }
}

const llIII = new LinkedListIII();
// const randomHead = llIII.createLinkedListWithRandomPointer([10, 20, 30, 40]);
// llIII.printLinkedListWithRandomPointer(randomHead);


