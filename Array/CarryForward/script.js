class CF{
    /*Count pairs AG:
    Que: Give a string 'str' of lowercase, return count of (i, j) 
        such that : [i<j] and [str[i]='a' | str[j]='g]
    */
    pairCount(str="abegag"){
        const n = str.length;
        console.log("str : ", str);

        // TC = O(n^2)
        const bf = ()=>{
            let count = 0;
            for(let i=0; i<n; i++){
                if(str.charAt(i)==='a'){
                    for(let j=i+1; j<n; j++){
                        if(str.charAt(j)==='g') count += 1;
                    }
                }
            }
            return count;
        }

        const opt = () => {
            let aCount = 0;
            let count = 0;
            for(let i=0; i<n; i++){
                if(str[i]==='a'){
                    aCount += 1;
                }
                if(str[i]==='g'){
                    count = count+aCount;
                }
            }
            return count;
        }

        return {bf:bf(), opt:opt()};
    }

    /**
     * Print all sub array
     */
    printSubArr(ar=[1, 2, 3, 4, 5, 6]){
        const n = ar.length;

        const bf = () => {
            let ans = [];
            for(let i=0; i<n; i++){
                for(let j=i; j<n; j++){
                    let sub_arr = [];
                    for(let k = i; k<=j; k++){
                        sub_arr.push(ar[k]);
                    }
                    // console.log("sub_arr : ",sub_arr);
                    ans.push(sub_arr);
                }
            }

            return ans;
        }

        const opt = () => {
            let ans = [];
            for(let i=0; i<n; i++){
                let subArr = [];
                for(let j=i; j<n; j++){
                    subArr.push(ar[j]);
                    console.log("subArr : ", subArr);
                }
            }
        }

        return {bf:bf(), opt:opt()};
    }

    /**
     * Question: Given an array of N integers return the length of the
     *      smallest subarray which contains both maximum 
     *      and minimum of the array.
     */
    smallestSubArray(arr=[1, 2, 3, 1, 3, 4, 6, 4, 6, 3]){
        let n = arr.length
        let min = Infinity;
        let max = -Infinity;
        console.log("min, max: ", min, max);
        
        for(let i=0; i<n; i++){
            if(arr[i]>max) max = arr[i];

            if(arr[i]<min) min = arr[i];
        }

        let ansLen = n;
        let mn = -1;
        let mx = -1;
        for(let i=0; i<n; i++){
            if(arr[i]===min){
                mn = i;//arr[i]
                if(mx !== -1){
                    ansLen = Math.min(ansLen, mn-mx+1);
                }
            }

            if(arr[i] === max){
                mx = i;
                if(mn !== -1){
                    ansLen = Math.min(ansLen, mx-mn+1);
                }
            }
        }


        return {max, min, ansLen, mx, mn}
    }
}

let cf = new CF();