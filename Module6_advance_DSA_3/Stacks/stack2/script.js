const QuestionsLists = [
    "Next Smaller Element: Given an integer array, for every index i, find the nearest smaller element towards it's left.",
    "Next Smaller Element-Variations: Given an integer array, for every index i, find the nearest smaller element's index towards it's left.",
    "Next Smaller Element-Variations: Given an integer array, for every index i, find the nearest smaller and equal element's towards it's left.",
    "Next Smaller Element-Variations: Given an integer array, for every index i, find the nearest greater element's towards it's left.",
    "Next Smaller Element-Variations: Given an integer array, for every index i, find the nearest greater and equals element's towards it's left.",
    "Next Smaller Element-Variations: Given an integer array, for every index i, find the nearest greater and equals element's towards it's Right.",
    "Largest Rectangle in Histogram: Find the largest Rectange formed by continous historgram bars.",
    ""
];

listObject('class_topic', QuestionsLists);

class Node{
    constructor(val){
        this.element= val;
        this.next=null;
    }
}

class Stack2{
    constructor(){
        this.head = null;
        this.size = 0;
        this.tail = -1;
    }

    push=(val)=>{
        let x = new Node(val);

        x.next = this.head;
        this.head = x;
        this.size++;

        return this.head;
    }

    pop=()=>{
        if(!this.size) throw new Error("Error!! Null pointer exception...");

        this.head = this.head.next;
        this.size--;
        console.log('after pop : ', this.head);
        
        return this.head;
    }

    peek=()=>{
        if(!this.size) throw new Error("Error!! Null pointer exception...");
        return this.head.element;
    }

    isEmpty=()=>{
        return this.size===0;
    }

    clear=()=>{
        this.head = null;
        this.size = 0;
        return this.head;
    }

    getHead=()=>{
        return this.head;
    }

    getSize=()=>{
        return this.size;
    } 
}

const stack2 = new Stack2();

let{push, pop, peek, isEmpty, clear, getSize, getHead} = stack2;

function nextSmallerElement(arr=[4,5,2,10,3,2]){
    const n = arr.length;

    // Using simepk
    // TC: O(n^2) | SC: O(n)
    const bf = () => {
        clear();
        let ans = [];
        ans[0] = 'none';
        for(let i=1; i<n; i++){

            let curr = arr[i];
            for(let j=i-1; j>=0; j--){
                if(curr>arr[j]){
                    ans[i] = arr[j] || 0;
                    break;
                }
            }
            if(!ans[i] && (ans[i]!==0)) ans[i]='none';
        }
        return ans;
    }

    const opt = () =>{
        clear();
        let ans = [];
        for(let i=0; i<n; i++){
            let val = arr[i];

            // If i=0, simply 'none', as before this index val, there's no other values or less values, so 'none'
            // You can simple keep it out of loop
            if(isEmpty()){
                ans[i] = 'none'
                // continue; // -----> Adding else block for readable
            }else{
                // Iterate through the stack, if you found arr[i]<h.element then push it to ans array
                // Or else if the head val is greater then simply temporary variable h move it to next pointer and then pop
                // As the bigger values will never be in use after this arr[i]
                // If after doing pop stack getting empty means there is no lesser value in stack and it became empty so just push 'none' in ans array
                let h = getHead();
                while(h){
                    if(h.element >= arr[i]){
                        h = h.next;
                        pop();

                        if(!h && h!==0) ans[i] = 'none';
                    }else{
                        ans[i] = h.element;
                        
                        break;
                    }
                }
            }

            push(val);
        }
        return {ans: ans, head: getHead()};
    }

    const opt1 = () => {
        clear();

        let ans = new Array(n);
        ans[0] = 'none';
        push(arr[0]);

        for(let i=1; i<n; i++){
            let hdEle = peek();
            while(!isEmpty() && (peek()>=arr[i])){
                pop();
                console.log("isEmpty() ---- getHead() >>> ", isEmpty(), getHead());
            }

            if(isEmpty()){
                ans[i] = 'none';
            }else{
                ans[i] = peek();
            }
            push(arr[i]);
        }

        return {ans, head: getHead()}
    }

    return {bf: bf(), opt:opt(), opt1:opt1()}
}

/**
 * Next Smaller Element-Variations: Given an integer array, for every index i, find the nearest smaller element's index towards it's left.
 */
function leftNextSmallerElementIndex(arr=[4,5,2,10,3,2]){
    console.log("given arr : ", arr);
    
    clear();
    let n = arr.length;
    let ans = [];
    // ans[0] = -1;
    for(let i=0; i<n; i++){
        while(!isEmpty() && arr[peek()]>=arr[i]){
            pop();
        }
        if(isEmpty()){
            ans[i] = -1;
        }else{
            ans[i] = peek();
        }
        push(i);
    }

    return {ans, head: getHead()};
}

/**
 * Next Smaller Element-Variations: Given an integer array, for every index i, find the nearest smaller and equal element's towards it's left.
 */
function leftNextSmallerAndEqualElements(arr=[4,5,2,10,3,2]){
    clear();
    console.log("given arr : ", arr);
    
    let n = arr.length;

    let ans = new Array(n);
    for(let i=0; i<n; i++){
        while(!isEmpty() && peek()>arr[i]){
            pop();
        }

        if(isEmpty()){
            ans[i] = 'none';
        }else{
            ans[i] = peek();
        }
        push(arr[i]);
    }

    return {ans, head: getHead()};
}

/**
 * Que : Next Smaller Element-Variations: Given an integer array, for every index i, find the nearest greater element's towards it's left.
 */
function leftNextGreaterElements(arr=[4,5,2,10,3,2]){
    clear();
    console.log("given arr : ", arr);
    
    let n = arr.length;

    let ans = new Array(n);
    for(let i=0; i<n; i++){
        while(!isEmpty() && peek()<=arr[i]){
            pop();
        }

        if(isEmpty()){
            ans[i] = 'none';
        }else{
            ans[i] = peek();
        }
        push(arr[i]);
    }

    return {ans, head: getHead()};
}

/**
 * Que: Next Smaller Element-Variations: Given an integer array, for every index i, find the nearest greater and equals element's towards it's left.
 * TC: O(N) ---> Basically O(2N) : 2N is due to while loop as it will execute maximum one time for a particule loop
 *      EG: if array is in Descending order, then each for loop iteration, one more pop() will execute
 * 
 * SC: O(N) ---> ans array
 */
function leftNextGreaterAndEqualElements(arr=[4,5,2,10,3,2]){
    clear();
    console.log("given arr : ", arr);
    
    let n = arr.length;
    let ans = new Array(n);
    for(let i=0; i<n; i++){
        while(!isEmpty() && peek()<arr[i]){
            pop();
        }

        if(isEmpty()){
            ans[i] = 'none';
        }else{
            ans[i] = peek();
        }

        push(arr[i]);
    }
    return {ans, head: getHead()};
}

/**
 * Que: Next Smaller Element-Variations: Given an integer array, for every index i, find the nearest greater element's towards it's Right.
 */
function RightNextGreaterAndEqualElements(arr=[4,5,2,10,3,2]){
    console.log("arr : ", arr);
    
    clear();
    let n = arr.length;
    let ans = new Array(n);

    for(let i=n-1; i>=0; i--){
        while(!isEmpty() && peek()<=arr[i]){
            pop();
        }

        if(isEmpty()){
            ans[i] = 'none'
        }else{
            ans[i] = peek();
        }

        push(arr[i]);
    }
    return {ans, head: getHead()};
}

/**
 * Que: Largest Rectangle in Histogram: Find the largest Rectange formed by continous historgram bars.
 */
function LargestRanctangle(arr=[2,1,4,7,5,2,1,3,4,5,6,4,3,2,3,1,5,6,4,2]){
    clear();
    let n = arr.length;
    console.log("array : ", arr);

    // Find the nearest smaller element towards the arr[i].
    const getLS = () => {
        let ls = new Array(n)
        for(let i=0; i<n; i++){
            while(!isEmpty() && arr[peek()]>=arr[i]){
                pop();
            }
            if(isEmpty()){
                ls[i] = -1;
            }else{
                ls[i] = peek();
            }
            push(i);
        }
        console.log("ls: ", ls);
        
        return ls;
    }
    

    
    const getRS = () => {
        let rs = new Array(n);
        clear();
        for(let i=n-1; i>=0; i--){
            while(!isEmpty() && arr[peek()]>=arr[i]){
                pop();
            }
            if(isEmpty()){
                rs[i] = n;// -----> Here we are keeping n(array length), as it's indicating last to the array, so we can't keep -1, it will impact the further calculation
            }else{
                rs[i] = peek();
            }
            push(i);
        }
        console.log("rs: ", rs);
        
        return rs;
    }

    const ls = getLS();
    const rs = getRS();
    clear();
    let ans = Number.MIN_SAFE_INTEGER;
    for(let i=0; i<n; i++){
        ans = Math.max(ans, arr[i]*(rs[i]-ls[i]-1));
    }

    return ans;
    
}