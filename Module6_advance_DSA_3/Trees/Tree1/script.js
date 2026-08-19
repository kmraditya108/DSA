const QuestionsLists = [
    "Create Binary Tree from Array",
    "Tree implementation : Pre-Order",
    "Tree implementation : In-Order",
    "Tree implementation : Post-Order",
    "inOrder traversal without recursion",
    "Given PostOrder and In-Order traversal, Create B-Tree using these traversal."
];

listObject('class_topic', QuestionsLists);
class Node {
    constructor(root) {
        this.root = root;
        this.left = null;// left;
        this.right = null;//right;
    }
}
class Tree1 {
    constructor() {
        this.treeRoot = null;
    }

    createTree(arr = [5, 2, 9, 8, 7, 0]) {
        let n = arr.length;
        const tree = (arr, i) => {
            if ((i >= arr.length) || (arr[i] === null) || (arr[i] === undefined)) return;

            let root = new Node(arr[i]);
            if (i == 0) this.treeRoot = root;

            root.left = tree(arr, 2 * i + 1);
            root.right = tree(arr, 2 * i + 2);

            return root;
        }
        return tree(arr, 0);
    }

    /**
     * arr = [5,2,9,8,7,0]
     * Pre-order: t = {n:2, l:5, r:9, | n:7, l:8, r:0}
     */
    preOrder(arr = [5, 2, 9, 8, 7, 0]) {
        this.createTree(arr);

        let result = '';
        const preOrderTraversal = (root) => {
            if (!root) return;
            result = root.root;
            console.log(root.root);
            preOrderTraversal(root.left);
            preOrderTraversal(root.right);
        }

        preOrderTraversal(this.treeRoot);
        // return result;
    }

    postOrder(arr = [1, 2, 3, 4, 5, null, 6]) {
        this.createTree(arr);

        // Left -> right -> root
        const postOrderTraversal = (root) => {
            if (!root) return;

            postOrderTraversal(root.left);
            postOrderTraversal(root.right);
            console.log(root.root);
        }

        postOrderTraversal(this.treeRoot);
    }

    /**
     * Left -> Root -> right
     */
    inOrder(arr = [1, 2, 3, 4, 5, null, 6]) {
        this.createTree(arr);
        const inOrderTraversal = (root) => {
            if (!root) return;

            inOrderTraversal(root.left);
            console.log(root.root);
            inOrderTraversal(root.right);
        }

        inOrderTraversal(this.treeRoot)
    }

    /**
     * Only Stack can remove recursion
     * So use custom Stack here.
     */
    inOrderTraversalWithoutRecursion(arr = [1, 2, 3, 4, 5, null, 6]) {
        this.createTree(arr);

        let stack = [];
        let curr = this.treeRoot;
        while (true) {
            if (!curr && !stack.length) break;

            if (curr) {
                stack.push(curr);
                curr = curr.left;
            } else {
                curr = stack[stack.length - 1]
                console.log("val:", curr.root);
                stack.pop();
                curr = curr.right;
            }
        }
        return tree(arr, 0);
    }

    createBinaryTreeFromTravershals(postTraversal = [6, 9, 7, 0, 8, 4, 3, 5], inTraversal = [6, 5, 3, 9, 4, 7, 8, 0]) {
        this.treeRoot = null;
        let n1 = postTraversal.length - 1;
        let n2 = inTraversal.length - 1;

        const treeFormation = (postorder, inorder, ps, pe, is, ie) => {

            if (ps>pe) return null

            let rootVal = postorder[pe];
            let root = new Node(rootVal);
            // check in inorder, length of left and right sub-array length
            let idx = inorder.indexOf(rootVal);
            const left_subtree_len = idx - is;

            root.left = treeFormation(postorder, inorder, ps, ps+left_subtree_len - 1, is, idx - 1)
            root.right = treeFormation(postorder, inorder, ps+left_subtree_len, pe - 1, idx + 1, ie);

            return root;
        }

        return treeFormation(postTraversal, inTraversal, 0, n1, 0, n2);
    }
}

const tree1 = new Tree1();