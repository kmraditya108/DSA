const QuestionsLists = [
    "Tree implementation : Pre-Order",
    "Tree implementation : In-Order",
    "Tree implementation : Post-Order",
];

listObject('class_topic', QuestionsLists);
class Node{
    constructor(root, left, right){
        this.root = root;
        this.left = null;// left;
        this.right = null;//right;
    }
}
class Tree1{
    insert(){
        let arr = [5,2,9,8,7,0]
        let n = arr.length;
        

        for(let v of arr){
            let x = new Node(v);
            
        }
    }
    preOrder(arr = [5,2,9,8,7,0]){
        let n = arr.length;

        const recursiveCall = () => {

        }
    }
}

const tree1 = new Tree1();

