const QuestionsLists = [
    "Tree implementation : Pre-Order",
    "Tree implementation : In-Order",
    "Tree implementation : Post-Order",
];

listObject('class_topic', QuestionsLists);
class Node{
    constructor(root){
        this.root = root;
        this.left = null;// left;
        this.right = null;//right;
    }
}
class Tree1{
    constructor(){
        this.treeRoot = null;
    }
    
    createTree(arr = [5,2,9,8,7,0]){
        let n = arr.length;
        const tree=(arr, i)=>{
            if((i>=arr.length) || (arr[i] === null)|| (arr[i] === undefined)) return;
            
            let root = new Node(arr[i]);
            if(i==0) this.treeRoot = root;

            root.left = tree(arr, 2*i+1);
            root.right = tree(arr, 2*i+2);
            
            return root;
        }
        return tree(arr, 0);
    }
  
    /**
     * arr = [5,2,9,8,7,0]
     * Pre-order: t = {n:2, l:5, r:9, | n:7, l:8, r:0}
     */
    preOrder(arr = [5,2,9,8,7,0]){
        this.createTree(arr);

        let result = '';
        const preOrderTraversal=(root)=>{
            if(!root) return;
            result = root.root;
            console.log(root.root);
            preOrderTraversal(root.left);
            preOrderTraversal(root.right);
        }
        
        preOrderTraversal(this.treeRoot);
        // return result;
    }

    postOrder(arr=[1, 2, 3, 4, 5, null, 6]){
        this.createTree(arr);

        // Left -> right -> root
        const postOrderTraversal = (root) => {
            if(!root) return;

            postOrderTraversal(root.left);
            postOrderTraversal(root.right);
            console.log(root.root);
        }

        postOrderTraversal(this.treeRoot);
    }

    /**
     * Left -> Root -> right
     */
    inOrder(arr=[1, 2, 3, 4, 5, null, 6]){
        this.createTree(arr);
        const inOrderTraversal = (root) => {
            if(!root) return;

            inOrderTraversal(root.left);
            console.log(root.root);
            inOrderTraversal(root.right);
        }

        inOrderTraversal(this.treeRoot)
    }
}

const tree1 = new Tree1();

