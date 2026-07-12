const QuestionsLists = [
    `Painter partition: 
        <br/>&nbsp; We have to paint all n boards of length [c1,c2,c3,...cn]. There are k painters available and each of them takes 1 unit
        of time to paint 1 unit of the board calculate and return minimum time required to get the job done.
        <br/>&emsp;Constraints: 
        <br/>&emsp;&emsp;i. Two painters cannot share a board to paint That is to say a board cannot be partially painted by one painter and partially by another
        <br/>&emsp;&emsp;ii. A painter will only paint continuous boards. This means a painter paints a continuous subarray of boards<hr/>`,
    `Aggressive cows: 
        <br/>&nbsp; Given n cows and m stalls all m stalls are located at different location at x axis place all the cows such that the minimum
        distance bw any two cows is maximised.
        <br/>&emsp;Constraints:
        <br/>&emsp;&emsp;i. There can only be one cow in a stall at a time.
        <br/>&emsp;&emsp;ii. We need to place all cows.`

];

listObject('class_topic', QuestionsLists);



class BinarySearch3{
    painterPartition(arr=[3, 5, 1, 7, 8, 2, 5, 3, 10, 1, 4, 7, 5, 4, 6], k=4){
        console.log(arr);

        let n= arr.length;

        // Find the range -- start: max element | end: sum of array element
        let maxEle = Number.MIN_SAFE_INTEGER;
        let sumOfArr = 0;
        for(let i=0; i<n; i++){
            sumOfArr += arr[i];
            maxEle = Math.max(maxEle, arr[i]);
        }

        const isPartitioningDone = (partition) => {
            let painter = 1;
            let sum = 0;
            for(let i = 0; i<n; i++){
                sum += arr[i];
                if(sum>partition){
                    // console.log("\t\tsum : ", sum);
                    
                    painter++;
                    sum = arr[i];
                }
            }
            // console.log("\t\t k, painter: ", k, painter);
            
            if(painter <= k) return true;
            return false;
        }

        let candidateAns = 0;//Number.MAX_SAFE_INTEGER;
        let s=maxEle;
        let e=sumOfArr;
        while(s<=e){
            const mid = Math.floor((e-s)/2)+s;
            // console.log("mid : ", mid);
            
            const isPartition = isPartitioningDone(mid);
            // console.log("s, e, mid, isPartition : ", s, e, mid, isPartition, '\n\n');
            
            if(isPartition){
                candidateAns = mid;// Math.min(mid, candidateAns);
                console.log("isPartition >>> candidateAns >>> mid : ", isPartition, candidateAns, mid);
                
                e = mid-1;
            }else{
                s = mid+1;
            }
        }
        return candidateAns;
    }

    aggressiveCows(arr=[1,2,4,8,9], k=4){
    // aggressiveCows(arr=[2,6,11,14,19,25,30,39,43], k=4){
        console.log(arr);
        
        let n = arr.length;

        /**
         * get range : 
         *  Worst case : cow length is similar to stall length(each stall one cow are placed)
         *  best case : only 2 cows, placed on arr[0] and arr[n-1] stall
         * So range = adjDistance to (arr[n-1] - arr[0])
         * */ 
        let adjEl = arr[1]-arr[0];
        // As we already got comparision in arr[1] and arr[0]
        for(let i=2; i<n; i++){
            let min = arr[i]-arr[i-1];
            adjEl = Math.min(adjEl, min);
        }
        console.log("adjEl: ", adjEl);

        const isCowPlacedCheck = (mid) => {
            let cow = 1;
            let lastPlaceIdx = 0;

            for(let i=1; i<n; i++){
                const dist = (arr[i] - arr[lastPlaceIdx]);
                if(dist >= mid){
                    lastPlaceIdx = i;
                    cow++;
                }
            }
            if(cow>=k) return true;
            console.log("\tfalse - cows: ", cow);
            
            return;
        }

        let ans = 0;
        let s = adjEl;
        let e = (arr[n-1]-arr[0]);
        console.log("s, e: ", s, e );
        
        while(s<=e){
            let candidateMidDist = Math.floor((e-s)/2)+s;
            let isCheck = isCowPlacedCheck(candidateMidDist);
            console.log("s, e, candidateMidDist, isCheck : ", s, e, candidateMidDist, isCheck);
            

            if(isCheck){
                ans = candidateMidDist;
                s = candidateMidDist+1;
            }else{
                e = candidateMidDist-1;
            }
        }
        return ans;
        
    }

}

const binarySearchObj3 = new BinarySearch3();