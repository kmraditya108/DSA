const QuestionsLists = [
    "Basics of Sorting"
];

listObject('class_topic', QuestionsLists);


class SortingBasics{
    getFactors(val){
        let factors = 0;
        const sqrtVal = Math.sqrt(val);
        
        for(let i=1; i<=sqrtVal; i++){
            
            if(val%i===0){
                const isDivident = val/i === i;
                
                if(isDivident){
                    factors += 1;
                }else{
                    factors += 2;
                }
                console.log(i+' X '+ val/i);
            }
        }
        return factors;
    }

    sortingBasedOnFactors(ans = [9, 1, 6, 12, 13]){
        // ans = [1, 13, 9, 6, 12]
        const n = ans.length;
        const arr = JSON.parse(JSON.stringify(ans));
        const arr_copy = JSON.parse(JSON.stringify(ans));
        for(let i=0; i<n; i++){
            arr[i] = this.getFactors(arr[i]);
            arr_copy[i] = arr[i];
        }

        for(let i=n-1; i>=0; i--){
            let greaterVal_index = i;
            for(let j=i-1; j>=0; j--){
                if(arr[greaterVal_index] < arr[j]) greaterVal_index = j;
                // greaterVal = Math.min(greaterVal, arr[j]);
            }
            let temp = arr[i];
            arr[i] = arr[greaterVal_index];
            arr[greaterVal_index] = temp;
        }

        return {arr, ans, arr_copy};
    }

    /**
     * Question:-> Given an array of N integers minimise the cost to
     *      empty the given array where cost of removing an
     *      element is equal to sum of all elements in the array at that moment
     */
    getTheRemovalCost(arr = [4, 3, 9, 12]){
        arr.sort((a, b)=>b-a);
        const n = arr.length;
        let ans = 0;
        for(let i=0; i<n; i++){
            ans += arr[i]*(i+1)
        }

        return ans;
    }

    /**
     * Question: -> Given an array of distinct elements of size n 
     * find count of the nobel integers.
     * 
     * Nobel Element : arr[i] is noble, if number of elements smaller than arr[i] is equal to arr[i](i-th value)
     */
    getNobelCount_withDistinctElement(arr=[1, -5, 3, 5, -10, 4]){
        const n = arr.length;
        
        const bf = () => {
            let nobelCount = 0;
            for(let i=0; i<n; i++){
                if(arr[i] < 0) continue;

                let counter = 0;
                for(let j=0; j<n; j++){
                    if(arr[j]<arr[i]){
                        counter++;
                    }
                }
                if(counter === arr[i]){
                    nobelCount++;
                }
            }
            return nobelCount;
        }

        /**
         * 1st sort the array and check if the arr[i]-th index value is equal to arr[i] value.
         */
        const opt = () => {
            const arr_copy = JSON.parse(JSON.stringify(arr));
            arr_copy.sort((a,b) => a-b);

            let nobelCount = 0;
            for(let i=0; i<n; i++){
                if(arr_copy[i] === i){
                    nobelCount++;
                }
            }
            return {nobelCount, arr_copy};
        }

        return {bf: bf(), optimised: opt()}
    }

    getNobelCount_withDistinctElement(arr=[-3, -2, 2, 3, 5, 5.5, 6]){
        const n = arr.length;
        const opt = () => {
            const arr_copy = JSON.parse(JSON.stringify(arr));
            arr_copy.sort((a,b)=>a-b);

            let nobelCount = 0;
            let flag = false;
            for(let i=0; i<n; i++){
                if(arr_copy[i] === i){
                    flag = true;
                    nobelCount += 1;
                }else if(flag && arr_copy[i] === arr_copy[i-1]){
                    nobelCount += 1;
                }else{
                    flag = false;
                }

                console.log("nobelCount -- flag : ", nobelCount, String(flag));
            }
            return nobelCount;
        }

        const opt_way2 = () => {
            const arr_copy = JSON.parse(JSON.stringify(arr));
            arr_copy.sort((a,b)=>a-b);

            let nobelCount = 0;
            let flag = false;
            
            if(arr_copy[0]===0){
                nobelCount++;
                flag = true;
            }

            for(let i=1; i<n; i++){
                if(arr_copy[i]===arr_copy[i-1]){
                    if(flag){
                        nobelCount++
                    }
                }else{
                    if(arr_copy[i]===i){
                        flag = true;
                        nobelCount++
                    }else{
                        flag = false;
                    }
                }
            }
            return nobelCount;
        }
        return {opt: opt(), opt_way2:opt_way2()}
    }

    findSmallestKelement(arr=[10, 3, 7, 2, 8, 5, 9]){
        let n = arr.length;
        let arr_copy = JSON.parse(JSON.stringify(arr));

        /**
         * TC: O(N^2)
         * SC: O(K)
         */
        const bf = () => {
            
            const ans = [];
            for(let i=0; i<n; i++){
                let min_index = i;
                for(let j=i+1; j<n; j++){
                    if(arr[min_index]>arr[j]){
                        min_index = j;
                    }
                }
                let t = arr[min_index];
                arr[min_index] = arr[i];
                arr[i] = t;
                
            }

            return {arr, ans}
        }



        // Select(Pick) one and then sort
        const selectionSort = () => {
            for(let i=0; i<n; i++){
                let min_ele = arr[i];
                let min_i = i;

                for(let j=i+1; j<n; j++){
                    if(arr[j]<min_ele){
                        min_ele = arr[j];
                        min_i = j;
                    }
                }

                let t = arr[i];
                arr[i] = min_ele;
                arr[min_i] = t;
            }
            return arr;
        }

        // Insert it and then sort.
        const insertionSort = () => {
            for(let i=1; i<n; i++){
                let min_i = i;
                console.log("i : ", i);
                
                for(let j=i-1; j>=0; j--){
                    
                    if(arr[min_i] < arr[j]){
                        let t = arr[j];
                        arr[j] = arr[min_i];
                        arr[min_i] = t;

                        min_i = j;

                    }
                }
            }
            return arr;
        }

        const insertionSort_way2 = () => {

            for(let i = 1; i<n; i++){
                let j = i-1;
                let curr_ele = arr_copy[i];

                while(j>=0 && arr[j]>curr_ele){
                    let temp = arr_copy[j];
                    arr_copy[j] = arr_copy[j+1];
                    arr_copy[j+1] = temp;
                    
                    curr_ele = arr_copy[j];

                    j--;
                }

            }
            return arr_copy
        }

        // return {bf: bf(), selectionSort: selectionSort()}
        return {insertionSort:insertionSort(), insertionSort_way2:insertionSort_way2()} 

        // return {bf: bf()}
    }
}

const sb = new SortingBasics();