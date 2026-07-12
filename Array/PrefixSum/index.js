class PrefixSum {
    /**
     * Given N array and Q query
     * For each query calculate sum of all elements from left to right
     */
    querySum() {
        const query = [[1, 4], [1, 6], [1, 3], [2, 4], [0, 7]];
        const arr = [-3, 6, 2, 4, 5, 2, 8, -9, 3, 1];
        const n = arr.length;
        const q = query.length;

        /**
         * Time Complexity : O(Q*N)
         * Space Complexity : O(1)
         */
        const bruteForce = () => {
            let ansArr = [];

            for (let k = 0; k < q; k++) {
                let l = query[k][0];
                let r = query[k][1];
                let sum = 0;
                for (let i = l; i <= r; i++) {
                    sum += arr[i];
                }
                ansArr.push(sum);
            }
            return ansArr;
        }


        /**
         * Time Complexity : O(N+Q)
         * Space Complexity : O(N) --- It could be modified to O(1) if we use the given array for prefix array.
         */
        const optimised = () => {
            let ansArray = [];


            // Get prefix sum array from the given array.
            const prefix_sum = [];
            prefix_sum[0] = arr[0];
            for (let i = 1; i < n; i++) {
                prefix_sum[i] = prefix_sum[i - 1] + arr[i];
            }


            for (let i = 0; i < q; i++) {
                let l = query[i][0];
                let r = query[i][1];

                let sum = l > 0 ? (prefix_sum[r] - prefix_sum[l - 1]) : prefix_sum[r];

                ansArray.push(sum);
            }
            return ansArray;
        }

        return { bruteForce: bruteForce(), optimised: optimised() };
    }


    /**
     * Question : Given an Array and Query of size N and Q,
     *  For every query return the sum of only even indexed elements from L to R
     * 
     * Time Complexity: 
     * Time Complexity: 
     */
    even_IndexedPF() {
        const query = [[1, 4], [1, 6], [1, 3], [2, 4], [0, 7]];
        const arr = [-3, 6, 2, 4, 5, 2, 8, -9, 3, 1];
        const n = arr.length;
        const q = query.length;

        const even_pf_sum = [];
        even_pf_sum[0] = arr[0];
        for (let i = 1; i < n; i++) {
            if (i % 2 == 0) {
                even_pf_sum[i] = even_pf_sum[i - 1] + arr[i];
            } else {
                even_pf_sum[i] = even_pf_sum[i - 1];
            }
        }

        let even_indexed_query_sum_arr = [];
        for (let i = 0; i < q; i++) {
            let l = query[i][0];
            let r = query[i][1];

            let sum_even_indexed = l > 0 ? (even_pf_sum[r] - even_pf_sum[l - 1]) : (even_pf_sum[r])
            even_indexed_query_sum_arr.push(sum_even_indexed)
        }

        return { arr, query, even_pf_sum, even_indexed_query_sum_arr }
    }


    /**
     * Question : Given an Array and Query of size N and Q,
     *  For every query return the sum of only odd indexed elements from L to R
     * 
     * Time Complexity: O(Q+N)
     * Time Complexity: O(n)
     */
    odd_IndexedPF() {
        const query = [[1, 4], [1, 6], [1, 3], [2, 4], [0, 7]];
        const arr = [-3, 6, 2, 4, 5, 2, 8, -9, 3, 1];
        const n = arr.length;
        const q = query.length;

        const odd_pf_sum = [];
        odd_pf_sum[0] = 0;
        for (let i = 1; i < n; i++) {
            if (i % 2 == 0) {
                odd_pf_sum[i] = odd_pf_sum[i - 1];
            } else {
                odd_pf_sum[i] = odd_pf_sum[i - 1] + arr[i];
            }
        }

        let odd_indexed_query_sum_arr = [];
        for (let i = 0; i < q; i++) {
            let l = query[i][0];
            let r = query[i][1];

            let odd_indexed_sum = l > 0 ? (odd_pf_sum[r] - odd_pf_sum[l - 1]) : (odd_pf_sum[r]);
            odd_indexed_query_sum_arr.push(odd_indexed_sum);
        }

        return { arr, query, odd_pf_sum, odd_indexed_query_sum_arr }
    }

    /**
     * Question: Given an array of size N count the no of special index in the array
     * Hint: A special index is the index after removing that indexed element, sum of 
     *      even index element become equal to the sum of odd index element.
     * Time Complexity: O(N)
     * Space Complexity: O(N)
     */
    specialIndex() {
        const arr = [4, 3, 2, 7, 6, -2];
        const n = arr.length;

        let odd_pf_sum = [];
        odd_pf_sum[0] = 0;
        let even_pf_sum = [];
        even_pf_sum[0] = arr[0];
        for (let i = 1; i < n; i++) {
            if (i % 2 == 0) {
                even_pf_sum[i] = even_pf_sum[i - 1] + arr[i];
                odd_pf_sum[i] = odd_pf_sum[i - 1];
            } else {
                even_pf_sum[i] = even_pf_sum[i - 1];
                odd_pf_sum[i] = odd_pf_sum[i - 1] + arr[i];
            }
        }

        console.log("arr : ", arr);
        console.log("odd_pf_sum : ", odd_pf_sum);
        console.log("even_pf_sum : ", even_pf_sum);
        

        // get special index
        let ans = {};
        for (let i = 0; i < n; i++) {
            let even_sum = 0;
            let odd_sum = 0;

            if (i === 0) {
                even_sum = odd_pf_sum[n - 1] - odd_pf_sum[0];
                odd_sum = even_pf_sum[n - 1] - even_pf_sum[0];
                console.log("i, even_sum, odd_sum : ", i, even_sum, odd_sum);
            } else {
                even_sum = even_pf_sum[i - 1] + (odd_pf_sum[n - 1] - odd_pf_sum[i]);
                odd_sum = odd_pf_sum[i - 1] + (even_pf_sum[n - 1] - even_pf_sum[i]);

                console.log("even_pf_sum[i - 1] ----- odd_pf_sum[n - 1] ---  odd_pf_sum[i + 1]: ", (even_pf_sum[i - 1]), ' : ------ : ', odd_pf_sum[n - 1], ' ----- ', odd_pf_sum[i + 1]);
                
                console.log("i, even_sum, odd_sum : ", i, even_sum, odd_sum);
            }
            if (even_sum === odd_sum) {
                ans[i] = even_sum;
            }
        }

        return ans;

    }
}

let pf = new PrefixSum();
