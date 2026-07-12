const QuestionsLists = [
    "Find the smallest number that can be formed by rearrenging the digits of the given array.",
    "Find the smallest number that can be formed by rearrenging the digits of the given array and array can have negative numbers too",
    `Given an aray of size N, and array are sorted in two parts: part-a and part-b, and mid value is given as 'mid' [arr part-a: (l to mid) and part-b: (mid+1 to r)] Sort the whole array.`,
    JSON.stringify((`Divide & Concore:-><br>
        i. Given an aray of size N, and array are sorted in two parts: part-a and part-b but middle value is not given now you have to use divide and conquor. Sort the whole array<br>
        ii. Given an aray of size N, calculate the number of pair i, j such that,  i<j and array[m] > arr[j] <b>[Inversion count: i<j and arr[i] > arr[j]]</b>.`).toLocaleLowerCase())
];

listObject('class_topic', QuestionsLists);


class CountAndMergeSort{
    getSmallestNumberFromArray(arr=[6,3,4,2,7,2,1]){
        let n = arr.length;

        const bf1 = () => {
            let arr_copy = [...arr]; //JSON.parse(JSON.stringify())
            arr_copy.sort((a, b)=> a-b);

            return arr_copy;
        }
        console.log("arr: ", arr);

        // Using HashMap(Frequenecy of elements)
        const opt1 = () => {

            let max = arr[0]
            for(let a of arr){
                max = Math.max(a, max);
            }

            console.log("max: ", max);
            
            // getting digits frequency from given array.
            let freq = new Array(max+1).fill(0);
            for(let i=0; i<n; i++){
                freq[arr[i]] += 1;
            }
            console.log("freq: ", freq,  n);
            
            let ans = [];
            for(let i=0; i<(max+1); i++){
                let f = freq[i];
                while(f>0){
                    ans.push(i);
                    f--;
                }
            }

            return ans;
        }

        const opt2 = () => {
            let max = Number.MIN_SAFE_INTEGER;
            for(let i=0; i<n; i++){
                max = Math.max(max, arr[i]);
            }
            console.log("finally max : ", max);

            // create frequency using HashMap
            let map = new Map();
            for(let i=0; i<n; i++){
                if(map.has(arr[i])){
                    let fr = map.get(arr[i]);
                    map.set(arr[i], fr+1);
                    continue;
                }
                
                map.set(arr[i], 1);
            }
            let ans = [];
            for(let i=0; i<(max+1); i++){
                console.log(" \t\t map ith val : ", map.get(i));
                
                let fr = map.get(i)
                if(fr>0){
                    for(let j=0; j<fr; j++){
                        ans.push(i);
                    }
                }
            }
            return ans;
        }

        return {bf1: bf1(), opt1:opt1(), opt2:opt2()}
    }

    formSmallestNumberFromArrayWithNegativeVal(arr=[-2, 3, 8, 9, -1, -2, 3]){
        let n = arr.length;
        console.log("arr : ", arr);
        

        let max = Number.MIN_SAFE_INTEGER;
        let min = Number.MAX_SAFE_INTEGER;
        for(let i=0; i<n; i++){
            max = Math.max(max, arr[i]);
            min = Math.min(min, arr[i]);
        }

        console.log("max, min :: ", max, min);

        let map = new Map();
        for(let el of arr){
            if(map.has(el)){
                let fr = map.get(el);
                map.set(el, fr+1);
                continue;
            }
            map.set(el, 1);
        }
        console.log("map : ", map);
        

        // -------------------- Way-1 ---------------
        let ans = [];
        for(let i=min; i<=max; i++){
            let fr = map.get(i);
            console.log("map has i : ", i, fr);
            if(fr > 0){
                for(let j=1; j<=fr; j++){
                    ans.push(i);
                }
            }
        }

        //  --------------- OR ---------------------

        // -------------------- Way-2(using range) ---------------
        let a = [];
        let rng= max-min+1;
        for(let i=0; i<=rng; i++){
            let ele = i+min;
            
            let fr = map.get(ele);
            console.log("\t\t ele : ", ele, fr);
            for(let j=1; j<=fr; j++){
                a.push(ele);
            }
        }

        return {ans, a};
        
    }

    SortArrayUsingMergeSort(arr = [3, 6, 8, 10, 15, 2, 12, 16, 17], mid=4){
        let n = arr.length;
        let l = 0;
        let r = n-1;
        let m = mid;

        let id = 0;
        let p1 = 0, p2=m+1;
        let ans = new Array(n);

        while(p1<=m && p2<=r){
            if(arr[p1]<=arr[p2]){
                ans[id] = arr[p1];
                p1++;
                id++;
            }else{
                ans[id] = arr[p2];
                p2++;
                id++;
            }
        }

        while(p1<=m){
            ans[id] = arr[p1];
            p1++;
            id++;
        }
        while(p2<=r){
            ans[id] = arr[p2];
            p2++;
            id++;
        }
        return ans;
    }

    divideAndConcour(arr = [3, 6, 8, 10, 15, 2, 12, 16, 17]){
        const main = () =>{
            let n = arr.length;
            let l = 0;
            let r = n-1;
            console.log(arr, n, l, r);
            merge(arr, l, r);
            return arr;
        }

        const merge=(arr, l, r)=>{
            if((l===r) || (l>=r)){
                return;
            }

            let mid = Math.floor((l+r)/2);
            merge(arr, l, mid);
            merge(arr, mid+1, r);
            mergeSort(arr, l, mid, r);
            
        }

        // ------------------ we have penalty of way to write mergeSort()
        const mergeSort_0=(arr, l, mid, r)=>{
            let temp = [];
            let p1 = l;
            let p2 = mid+1;

            while(p1<=mid && p2<=r){
                if(arr[p1]<=arr[p2]){
                    temp.push(arr[p1]);
                    p1++;
                }else{
                    temp.push(arr[p2]);
                    p2++;
                }
            }

            while(p1<=mid){
                temp.push(arr[p1]);
                p1++;
            }
            while(p2<=r){
                temp.push(arr[p2]);
                p2++;
            }
            
            for(let i=0; i<temp.length; i++){
                arr[l+i] = temp[i];
            }
        }

        // ======================== OR ===================


        const mergeSort=(arr, l, mid, r)=>{
            let a1 = arr.slice(l, mid+1);
            let a2 = arr.slice(mid+1, r+1);

            let p1=0, p2=0, i=l;
            while(p1<a1.length && p2<a2.length){
                if(a1[p1]<=a2[p2]){
                    arr[i] = a1[p1];
                    p1++;
                }else{
                    arr[i] = a2[p2];
                    p2++;
                }
                i++;
            }

            while(p1<a1.length){
                arr[i] = a1[p1];
                p1++;
                i++;
            }
            while(p2<a2.length){
                arr[i] = a2[p2];
                p2++;
                i++;
            }
        }

        return main();
    };

    inversionCount = (arr=[10, 3, 8, 15, 6]) => {
        const main = () => {
            let n = arr.length;
            let l = 0;
            let r = n-1;
            return merge(arr, l, r);
        }

        const merge = (arr, l, r, t) => {
            let count = 0;
            if(l<r) {
                let mid = parseInt((l+r)/2);
                count += merge(arr, l, mid);
                count += merge(arr, mid+1, r);
                count += mergeSort(arr, l, mid, r);
            }
            
            return count;
        }

        // ------------------ we have penalty of way to write mergeSort()
        const mergeSort = (arr, l, m, r) => {
            let n1 = m-l+1;
            let n2 = r-m;
            let a1 = new Array(n1);
            for(let i=0; i<n1; i++){
                a1[i] = arr[l+i];
            }
            let a2 = new Array(n2);
            for(let i=0; i<n1; i++){
                a2[i] = arr[m+1+i];
            }

            let ic = 0;

            let p1 = 0;
            let p2 = 0;
            let i = l;
            while(p1<n1 && p2<n2){
                if(a1[p1]<=a2[p2]){
                    arr[i] = a1[p1];
                    p1++;
                }else{
                    arr[i] = a2[p2];
                    p2++;
                    ic+=n1-p1;
                }
                i++;
            }
            console.log("inversionCount : ", ic);
            return ic;
        }

        // ========================OR====================
        
        return main();

    }


}

const countAndMergeSort = new CountAndMergeSort();