class ArrayIntro {
    /*
    Given an array of size N, reverse the array
    */
    reverse_array() {
        let arr = [1, 2, 4, 7, 8];
        let n = arr.length;

        const brute_force = () => {
            let reversedArr = [];

            for (let i = n; i > 0; i--) {
                reversedArr.push(arr[i - 1]);
            }

            // Time complexity = O(n)
            // Space complexity = O(n)
            return reversedArr;
        }

        const optimised = () => {
            let s = 0;
            let e = n - 1;
            while (s < e) {
                let temp = arr[s];
                arr[s] = arr[e];
                arr[e] = temp;

                s++;
                e--;
            }

            // Time complexity = O(n)
            // Space complexity = O(1)
            return arr;
        }

        return {
            brute_force,
            optimised
        }
    }

    //Given an array, revese the given range of the array
    reverse_array_in_range(startRange = 2, endRange = 5) {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let n = arr.length;
        let s = startRange;
        let e = endRange;


        // Time complexity: O(n) | space complexity: O(n)
        const bruteForce = () => {
            let reverse_array = [...arr];
            let counter = s;
            for (let i = e; i >= s; i--) {
                reverse_array[counter] = arr[i];
                counter++;
            }
            return reverse_array;
        }

        // Time complexity: O(n) | space complexity: O(1)
        const optimised = (start_rng, end_rng) => {
            let start = start_rng ? start_rng : s;
            let end = end_rng ? end_rng : e;
            while (start < end) {
                let temp = arr[start];
                arr[start] = arr[end];
                arr[end] = temp;

                start++;
                end--;
            }
            return arr;
        }

        return {
            bruteForce,
            optimised
        }
    }


    /**
     * Given an array of size N, Rotate the array K time
     * from right to left. i.e, from end to start index
     * [last element will come first].
     */
    rotate_array_k_times() {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        //let arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];
        //let arr = [7, 8, 9, 1, 2, 3, 4, 5, 6];

        let n = arr.length;

        // time complexity: O(K*N) | Space complexity: O(1)
        const bruteforce = (k = 2) => {
            for (let i = 1; i <= k; i++) {
                let temp = arr[n - 1];
                for (let j = n - 1; j >= 1; j--) {
                    arr[j] = arr[j - 1];
                }
                arr[0] = temp;
            }
            return arr;
        }

        /**
         * Time Complexity : O(n) ---- O(N+K+N-K) --- total: O(N)
         * Space complexity : O(1);
         */
        const optimised = (k = 2) => {
            let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            let n = arr.length;

            if (k > n) k = n % k;

            const reverse_in_range = (arr, start, end) => {
                let s = start;
                let e = end;
                while (s < e) {
                    let temp = arr[s];
                    arr[s] = arr[e];
                    arr[e] = temp;
                    s++;
                    e--;
                }
                return arr;
            }

            arr = reverse_in_range(arr, 0, n - 1); // rotate whole array --- T.C : O(n)
            arr = reverse_in_range(arr, 0, k - 1); // Now rotate 1st kth items --- T.C : O(k)
            arr = reverse_in_range(arr, k, n - 1); // Now rotate last n-k th items --- T.C : O(n-k)

            return arr;
        }

        return { bruteforce, optimised }
    }




}

let arrIntro = new ArrayIntro();