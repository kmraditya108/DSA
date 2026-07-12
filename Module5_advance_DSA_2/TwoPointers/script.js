const QuestionsLists = [
    "Given an interger 'K' and a sorted array of distinct number of size N, find any pair(i, j) such that arr[i]+arr[j]=K.",
    "Given an interger 'K' and a sorted array of distinct number of size N, find count of pair(i, j) such that arr[i]+arr[j]=K.",
    "Given an interger 'K' and a sorted array with duplicate elements of size N, find count of pair(i, j) such that arr[i]+arr[j]=K.",
    "Given an interger 'K' and a sorted array with distinct elements of size N, find count of pair(i, j) such that arr[i]-arr[j]=K.",
    "Given array[n] and int 'K', Check if there exist a subarray with sum=K",
    `Container with most water:
    &nbsp; Given an array[n] where array element represents height of the wall, find any two wall that form a container to store the maximum amount of water.`
];

listObject('class_topic', QuestionsLists);


class TwoPointers{
    findAnyPair(arr=[-5,-2,1,2,8,10,12,15], k=11){
        console.log(arr, k);
        
        let n = arr.length;

        // using 2 nested for loops -- TC: O(n2)
        function bf1(){
            let ans = {};
            for(let i=0; i<n; i++){
                for(let j=i; j<n; j++){
                    if(arr[i]+arr[j]===k) ans[i]=j;
                }
            }
            return ans;
        }

        // using hashMap -- TC: O(n---)
                // function bf1(){

                //     // get max of the array to create frequency array
                //     let max = Number.MIN_SAFE_INTEGER;
                //     for(let v of arr){
                //         max = Math.max(max, v);
                //     }
                    
                //     let frArr = new Array(max+1);
                //     // get modulo of arr element
                //     for(let i=0; i<n; i++){
                //         let mod = arr[i]%k;
                //     }

                //     let map = new Map();
                //     // create a frequency using map
                //     for(let i=0; i<n; i++){
                //         if(map.has(arr[i])){
                //             let fr = map.get(arr[i]);
                //             map.set(arr[i], fr+1);
                //             continue;
                //         }
                //         map.set(arr[i], 1);
                //     }


                // }

        function opt(){
            let ans = -1;
            let s = 0;
            let e = n-1;
            while(s<e){
                let midVal = arr[e]+arr[s];
                if(midVal === k){
                    return {index: {s,e}, val:midVal}
                }else if(midVal > k){
                    e--;
                }else{
                    s++;
                }
            }
            return ans;
        }

        return {bf1:bf1(), opt:opt()}
    }

    findPairCount(arr=[-5,-2,1,2,8,10,12,15], k=10){
        console.log(arr);
        
        const n = arr.length;
        const opt = () => {
            let ans = {};
            let s = 0;
            let e = n-1;
            while(s<e){
                let mid = arr[s]+arr[e];

                if(mid === k){
                    ans[s] = e;
                    s++;
                    e--;
                }else if(mid>k){
                    e--;
                }else{
                    s++;
                }
            }
            return ans;
        }

        return {opt: opt()}
    }

    // findPairCountInduplicateArr(arr=[1,3,3,4,4,4,5,5,5,5,6,7,7,7], k=10){
    findPairCountInduplicateArr(arr=[1,3,3,4,4,4,6,7,7,7], k=10){
        let n = arr.length;

        let s = 0;
        let e = n-1;
        let ans = 0;
        while(s<e){
            let mid = arr[s]+arr[e];
            console.log(mid);
            
            if(mid < k){
                s++;
            }else if(mid>k){
                e--;
            }else{
                if(arr[s] === arr[e]){
                    let fr = e-s+1;
                    ans += (fr*(fr-1))/2;
                    break;
                }else{
                    let x=arr[s];
                    let cnt1=0;
                    while((s<e) && (arr[s]===x)){
                        cnt1++;
                        s++;
                    }

                    let y = arr[e];
                    let cnt2 = 0
                    while((e>=s) && (arr[e]===y)){
                        cnt2++;
                        e--;
                    }

                    ans+=(cnt1*cnt2);
                }
            }
            console.log("ans: ", ans);
            
        }
        return ans;
    }

    findCountOfPairDifference(arr=[-5,-2,1,2,8,10,12,15], k=11){
        console.log(arr, k);

        let n = arr.length;
        
        const opt = () => { 
            let ans = {};
            let s = 0;
            let e = 1;
            while(e<n){
                
                let differenceMid = arr[e]-arr[s];

                if(differenceMid > k){
                    s++;
                    if(s===e) {
                        e++;
                    }
                }else if(differenceMid < k){
                    e++;
                }else{
                    ans[s] = e;
                    s++;
                    e++;
                }
            }

            return ans;
        }

        return {opt: opt()}
    }

    subArrayWithSumK(arr=[1,3,15,10,20,3,23], k=33){
        console.log(arr, k);
        let n = arr.length;

        // Using pair difference method
        const opt = () => {

            // Getting Prefix sum below
            let pf = new Array(n);
            pf[0] = arr[0];
            for(let i=1; i<n; i++){
                pf[i] = pf[i-1]+arr[i];
            }
            console.log("pf: ", pf);
            

            let ansCnt = {}
            let s = 0;
            let e = 1;
            while(e<n){
                let mid = pf[e] - pf[s];

                let shift = (mid > k) ? ' shift-s' : (mid < k) ? 'Shift-e' : 'count Ans'
                console.log("s, e, mid, k, shift-direction: ",s, e, mid, k, shift);
                
                console.log();
                
                
                if(mid > k){
                    s++;
                    if(s===e) {
                        e++;
                    }
                }else if(mid < k){
                   e++;
                }else{
                    ansCnt[s] = e;
                    s++;
                    e++;
                }
            }
            return ansCnt;
        }

        return {opt: opt()}
    }

    conatinerWallOfMaxStorage(arr=[4,2,10,6,8,2,6,2]){
        console.log(arr);
        
        let n = arr.length;

        const opt = () => {
            let ans = Number.MIN_SAFE_INTEGER;
            let s = 0;
            let e = n-1;
            while(s<e){ 
                let width = e-s;
                let maxHeight = Math.min(arr[s], arr[e]);

                let area = width*maxHeight;

                ans = Math.max(ans, area);

                if(arr[s] === arr[e]){
                    s++;
                    e--;
                }else if(arr[s]<arr[e]){
                    s++;
                }else{
                    e--;
                }
            }
            return ans;
        }

        return {opt:opt()}
    }
}

const twoPointersObj = new TwoPointers();