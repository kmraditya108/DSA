const QuestionList = [
    'Max sum among all sub array',
    'Find Sum of all subarray',
    'Max subarray sum'
];

listObject('class_topic', QuestionList)



class SlidingWindow {
    /**
     * Max sum of all sub array : 
     *  Find the max sum among of each subarray.
     */
    maxSum(arr=[4, -2, 7]){

        let n = arr.length;

        /**
         * Generate subarray
         * get the sum of each subarrays
         * Compare and keep the max one and return
         * TC: O(n^3) | SC: O(1)
         */
        const bf = () => {
            let ans = 0;
            for(let i=0; i<n; i++){
                for(let j=i; j<n; j++){
                    let sum = 0;
                    for(let k=i; k<=j; k++){
                        sum += arr[k];
                    }
                    console.log("sum : ", sum);
                    
                    ans = Math.max(ans, sum);
                }
            }

            return ans;
        }


        /**
         * Using Range sum(prefix sum) method :->
         * 1st get prefix sum, then
         * Use the Range sum to get the max sum
         * 
         * TC: O(n^2) ||  SC: O(n)
         */
        const opt0 = () => {
            let pf = [];
            pf[0] = arr[0];
            for(let i=1; i<n; i++){
                pf[i] = pf[i-1]+arr[i];
            }

            let ans = -Infinity;
            for(let i=0; i<n; i++){
                let sum = 0;
                for(let j=i; j<n; j++){
                    if(i==0){ 
                        sum = pf[j];
                    }else{
                        sum = pf[j]-pf[i-1];
                    }
                    ans = Math.max(ans, sum)
                }
            }

            return ans;
        }
        
        /**
         * Carry forward Method:--> 
         * Here instead of keep/printing all subarray, 
         * we are just using all of the subarrays.
         * 
         * TC: O(n^2) | SC: O(1)
         */
        const opt1 = () => {
            let ans = 0;
            for(let i=0; i<n; i++){
                let sum = 0;
                for(let j=i; j<n; j++){
                    sum = sum+arr[j];
                    console.log("sum+arr[j] : ", sum);
                    
                    ans = Math.max(ans, sum);
                }
            } 
            return ans;  
        }

        return {bf: bf(), opt0:opt0(), opt1:opt1()}
    }


    // i+1 * n-1-i
    /**
     * Que:- Given an array find sum of all subarray sums.
     */
    sumOfAllSubArraySum(arr=[1, 2, 3, 4]){
        let n = arr.length;

        /**
         * Generate all sub array get the sum and add them togather
         */
        const bf =()=> {
            let ans = 0;
            for(let i=0; i<n; i++){
                let sum = 0;
                for(let j=i; j<n; j++){
                    sum += arr[j];
                    ans += sum;
                }
            }
            return ans;
        }

        /**
         * Contribution technique
         * TC: O(n)
         */
        const opt = () => {
            // total contribution by each element in sub array = [(i+1)*(n-i)]
            let sum = 0;
            for(let i=0; i<n; i++){
                let totalContributionOfElement = arr[i]*((i+1)*(n-i));
                sum += totalContributionOfElement;
            }

            return sum;
        }

        return {bf: bf(), opt:opt()}
    }

    /**
     * Que:-> Given an array of size N find the maximum subarray 
     * sum for subarrays with length K
     */
    getMaxSumForSubArrayLenK(arr=[-3, 4, -2, 5, 3, -2, 8, 2, -1, 4], k=5){
        const n = arr.length;

        const bf = () => {
            let ans = -Infinity;
            let s = 0;
            let e = k-1;
            while(e<n){
                let sum = 0;
                for(let j=s; j<=e; j++){
                    sum += arr[j];
                }
                ans = Math.max(ans, sum);
                s++;
                e++
            }

            return ans;
        }

        const opt = () => {
            let ans = -Infinity;
            let sum = 0;
            for(let i=0; i<k; i++){
                sum += arr[i];
            }
            ans = sum;
            console.log("1-ans : ", ans);
            

            let s = 1;
            let e = k;
            while(e<n){
                sum = sum - arr[s-1] + arr[e];
                console.log("2-sum : ", sum);
                ans = Math.max(ans, sum);
                s++;
                e++;
            }

            return ans;
        }

        return {bf:bf(), opt: opt()}
    }
}

const sw = new SlidingWindow();