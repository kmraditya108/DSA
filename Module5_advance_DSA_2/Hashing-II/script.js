const QuestionsLists = [
    `Given an array of size N and an integer K, check if there exist a pair(I, j), such that arr[I]+arr[j] = K. <br>&emsp;[J != I]`,
    "Count number of pair with sum = K <br> Given an array of size N, count number of pair such that arr[i]+arr[j]=K <br>&emsp; [j!=i]",
    "Given an Array of size N check if any sub-array exists with sum K",
    "Distinct element in each window<br>&emsp;Given arr[N] and k, find the count of distinct elements in each window of size kin the array."
];

listObject('class_topic', QuestionsLists);


class HashingII {
    pairSum(arr = [8, 9, 1, -2, 4, 5, 11, -6, 4], k = 6) {
        console.log(arr);
        
        let n = arr.length;

        /**
         * TC: O(n^2)
         * SC: O(1)
         */
        const bf = () => {
            for (let i = 0; i < n; i++) {
                // if(arr[i]>k) continue; ------> Uncomment this line if arr has only +ve element.
                let sum = arr[i];
                for (let j = i + 1; j < n; j++) {


                    if ((sum + arr[j]) === k) return true;

                    // Below will give total pairs
                    // if((sum+arr[j])===k){
                    //     console.log(arr[i], sum, (sum+arr[j]), arr[j]);
                    // }
                }
            }
            return false;
        }

        /**
         * TC: O(n)
         * SC: O(n)
         */
        const opt = () => {
            let set = new Set();
            for (let i = 0; i < n; i++) {
                let pair = k-arr[i];

                if(set.has(pair)){
                    console.log("pair, arr[i], set : ", pair, arr[i], set);
                    
                    return true; // comment this line if you want to print pairs
                }
                set.add(arr[i]);
            }

            return false
        }

        return { bf: bf(), opt:opt() }
    }

    countPair(arr=[3, 5, 1, 2, 1, 2], k=3){
        console.log(arr);
        let n = arr.length;
        let map = new Map();
        let pairCount = 0;

        for(let i=0; i<n; i++){
            let iThVal = arr[i];
            let jVal = k-iThVal;

            // If jTh val available then increase the pair count
            if(map.has(jVal)){
                let jTh_freq = map.get(jVal);
                pairCount += jTh_freq;
            }

            //Insert arr[i] to map for next pair jTh val check
            if(map.has(arr[i])){
                let iTh_freq = map.get(arr[i]);
                map.set(arr[i], iTh_freq+1);
            }else{
                map.set(arr[i], 1);
            }

        }

        return pairCount;
    }

    subArrayWithSumK(arr=[2, 3, 9, -4, 1, 5, 6, 2, 5], k=11){
        let n = arr.length;


        // TC: O(N) || SC: O(N)
        const opt1 = () => {
            let pf = [];
            pf[0] = arr[0];
            for(let i=1; i<n; i++){
                pf[i] = arr[i]+pf[i-1];
            }

            console.log("PF: ", pf, k);
            
            let set = new Set();
            for(let i=0; i<n; i++){
                if(pf[i] === k){
                    console.log(" \t\t ---> pf[i] === k", pf[i], k);
                    
                    return true;
                }
                let pairVal = pf[i]-k;
                console.log("pairVal -- set", pairVal, set);
                
                if(set.has(pairVal)){
                    console.log(" \t\t ---> set.has(pairVal)", pairVal, set);
                    return true;
                }
                set.add(pf[i]);
            }
            return false;
        }

        // TC: O(N) || SC: O(1)
        const opt2 = () => {
            console.log("\n\n");

            let set = new Set();
            let pf = 0;
            for(let i=0; i<n; i++){
                pf += arr[i];
                console.log("pf : ", pf);
                
                if(pf === k) return true;

                let pairVal = pf-k;
                if(set.has(pairVal)){
                    return true;
                }

                set.add(pf);
            }

            return false;
        }

        return {opt1: opt1(), opt2:opt2()}
    }

    distinctElement(arr=[1,2,1,3,4,2,3],k=4){
        let n = arr.length;
        const opt1 = () => {

            console.log(arr);
            
            let ans = [];
            let map = new Map();
            for(let i=0; i<k; i++){
                if(map.has(arr[i])){
                    let freq = map.get(arr[i]);
                    map.set(arr[i], freq+1);
                }else{
                    map.set(arr[i], 1);
                }
            }
            console.log(0, ' s -- map size : ',map.size, map);
            console.log(map.size);
            ans.push(map.size);

            let s = 0;
            let e = k;
            while(e<n){
                let incoming = arr[e];
                let outgoing = arr[s];

                if(map.has(incoming)){
                    let freq = map.get(incoming);
                    map.set(incoming, freq+1);
                }else{
                    map.set(incoming, 1);
                }


                // As the outgoing we already filled previously
                let out_freq = map.get(outgoing)-1;
                map.set(outgoing, out_freq);
                console.log("\t\t out_freq : ", out_freq);
                
                if(out_freq === 0){
                    map.delete(outgoing);
                }

                console.log(s, ' s -- incoming, outgoing, map size, map : ',incoming, outgoing, map.size, map);
                ans.push(map.size);
                
                e++;
                s++;
            }
            return ans;
        }

        return {opt1: opt1()}
    }

    
}

const hashing2 = new HashingII();

