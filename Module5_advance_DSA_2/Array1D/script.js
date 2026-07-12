const QuestionsLists = [
    "To find max sum among all subarray. (Kanden's algorithm)",
    "Beggers outside temple",
    "Rainwater trapping"
];

listObject('class_topic', QuestionsLists);


class Array1D{
    findMaxSum(arr=[-2, 3, 4, -1, 5, -10, 7]){
        let n = arr.length;

        /**
         * generate all subarray and then get the sum of all subarrays
         * Compare the sums and get the max one
         * 
         * TC : O(N^2) | SC: O(1)
         */
        const bf= () => {
            let ans =  Number.MIN_SAFE_INTEGER;

            for(let i=0; i<n; i++){
                let sum = 0;
                for(let j=i; j<n; j++){
                    sum += arr[j];
                    ans = Math.max(ans, sum);
                }
            }

            return ans;
        }

        // Kendance algorithm
        // TC : O(N) | SC: O(1)
        const opt = () => {
            let ans = Number.MIN_SAFE_INTEGER;
            let sum = 0;

            for(let i=0; i<n; i++){
                sum += arr[i];
                ans = Math.max(sum, ans);
                if(sum < 0){
                    sum = 0;
                }
            }
            return ans;
        }

        return {bf: bf(), opt:opt()}
    }

    beggersOutside(N = 6, Q=[[1, 3], [4, 1], [2, -1]]){
        

        const bf = () => {
            let arr = new Array(N).fill(0);
            for(let j=0; j<Q.length; j++){
                let id = Q[j][0];
                let val = Q[j][1];

                for(let k=id; k<N; k++){
                    arr[k] = arr[k]+val;
                }
                console.log(arr);
                
            }
            return arr;
        }

        // TC: O(N+Q) | SC: O(1)
        const opt = () => {
            let arr = new Array(N).fill(0);
            for(let i=0; i<Q.length; i++){
                let id = Q[i][0];
                let val = Q[i][1];
                arr[id] += val;
            }

            for(let i = 1; i<N; i++){
                arr[i] = arr[i]+arr[i-1];
            }

            return arr;
        }

        return {bf: bf(), opt:opt()}
    }

    beggerOutside1(N=7, Q=[[2, 4, 2], [1,3,1], [0,2,3],[3,5,4]]){
        let arrVal = new Array(N).fill(0);
        console.log("arrVal : ", arrVal);
        
        let q = Q.length;

        // TC: O(Q*N) | SC: O(1)
        const bf = () => {
            let arr = new Array(N).fill(0);
            for(let i=0; i<q; i++){
                let start_id = Q[i][0];
                let end_id = Q[i][1];
                let val = Q[i][2];
                if(start_id<0 || end_id>=N) continue;
                
                for(let j=start_id; j<=end_id; j++){
                    arr[j] += val;
                }
            }

            return arr;
        }


        const opt = () => {
            let arr = new Array(N).fill(0);

            for(let i = 0; i<q; i++){
                let s_id = Q[i][0];
                let e_id = Q[i][1];
                let val = Q[i][2];

                if(s_id<0 || e_id>=N) continue;
                arr[s_id] = arr[s_id] + val;
                if(e_id+1 < N)
                    arr[e_id+1] = arr[e_id+1] - val;
            }


            // Prefix sum
            for(let i=1; i<N; i++){
                arr[i] = arr[i-1]+arr[i];
            }

            return arr;
            
        }

        return {bf: bf(), opt: opt()}
    }

    trappedWater(arr=[2, 1, 4, 7, 5, 2, 1, 3, 4, 5, 6, 4, 3, 2, 3, 1, 5, 6, 4, 2]){
        let n = arr.length;


        // TC: O(N^2) --> leftMax() | rightMax() | main for() loop
        // SC: O(N) ---> ans array
        const bf = () => {
            const leftMax = (id) => {
                let max = arr[id];
                for(let i = id-1; i>=0; i--){
                    max = Math.max(arr[i], max);
                }
                return max;
            }

            const rightMax = (id) => {
                let max = arr[id];
                for(let i = id+1; i<n; i++){
                    max = Math.max(arr[i], max);
                }
                return max;
            }

            let ans = [];
            ans[0] = 0;
            ans[n-1] = 0;
            let trappedWater = 0
            for(let i = 1; i<n-1; i++){
                let lMax = leftMax(i);
                let rMax = rightMax(i);
                ans[i] = Math.min(lMax, rMax) - arr[i];
                trappedWater += Math.min(lMax, rMax)-arr[i];
            }

            return {ans, trappedWater};
        }

        // TC: O(N)
        // SC: O(N)
        const opt = () => {
            let leftMax = [];
            leftMax[0] = arr[0];
            for(let i = 1; i<n; i++){
                leftMax[i] = Math.max(leftMax[i-1], arr[i]);
            }

            let rightMax = [];
            rightMax[n-1] = arr[n-1];
            for(let i = n-2; i>=0; i--){
                rightMax[i] = Math.max(rightMax[i+1], arr[i]);
            }

            let ans = [];
            let trappedWater = 0
            for(let i = 0; i<n; i++){
                ans[i] = Math.min(leftMax[i], rightMax[i])-arr[i];
                trappedWater += Math.min(leftMax[i], rightMax[i])-arr[i];
            }

            return {ans, trappedWater};
        }

        return {bf: bf(), opt:opt()}
    }
}

const arr_1d = new Array1D();