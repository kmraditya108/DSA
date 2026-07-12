const QuestionsLists = [
    "Map / HashMap intro",
    "Set / HashSet intro",
    "Given an array of size N and query of size q, query has the integers. We have to find the frequencies of the query from array of size N",
    "Find 1st non repeating element in an array",
    "Find the count of distinct array element.",
    "Given arr(n) check if any subarray with sum 0 is available"
];

listObject('class_topic', QuestionsLists);


class Hashing1{
    MapIntro(){

        // creation of map
        const createMap=()=>{
            let map = new Map();
            return map;
        }

        // Setting the map values / entries
        const entringValToMap = () => {
            // Way-1
            let map1_market = new Map();
            map1_market.set('apple', 1);
            map1_market.set('banana', 5);
            map1_market.set('mango', 10);

            let map2_showroom = new Map();
            map2_showroom.set('car',10).set('bike', 100).set('cycle', 500);


            let map3_employee = new Map([
                ['emp1', 'Aditya'],
                ['emp2', 'Aadvik'],
                ['emp3', 'Viveka'],
            ]);

            return {map1_market, map2_showroom, map3_employee}
        }

        const readEntries = () => {
            let map3_employee = new Map([
                ['emp1', 'Aditya'],
                ['emp2', 'Aadvik'],
                ['emp3', 'Viveka'],
            ]);

            console.log(`is emp1 available?${map3_employee.has('emp1')}\nIf available get the emplyoee name`);
            if(map3_employee.has('emp1')){
                console.log("emp1 = ", map3_employee.get('emp1'));
            }

            map3_employee.forEach((val, id, map)=>{
                console.log('readEntries : ', val, id, map);
            });

        }

        return {createMap:createMap(), entringValToMap:entringValToMap(), readEntries: readEntries()}
    }

    setIntro(){
        let set = new Set();//------------------> creation of Set / HashSet

        const john = {name: 'John'}
        const aditya = {name: 'Aditya'}
        const vivek = {name: 'Vivek'}
        set.add(john)
        set.add(aditya)
        set.add(vivek)
        set.add(john)
        set.add(vivek);
        console.log("set val : ", set);

        let setArr = new Set([1,2,4,3,8, 6,2,4,8]);
        console.log("get set array size : ", setArr.size);
        console.log("set array has 8 : ", setArr.has(8));
    }

    findFreqency(arr=[8,6,3,8,2,8,2,3,8,10,6], query=[2,8,3,5]){
        let n = arr.length;
        let q = query.length;

        const bf = () => {
            let freq = [];
            for(let i=0; i<q; i++){
                freq[i] = new Array(2);
                freq[i][0] = query[i];
                freq[i][1] = 0;
                for(let j=0; j<n; j++){
                    if(query[i]===arr[j]){
                        freq[i][1] += 1; 
                    }
                }
            }
            return freq;
        }

        const opt = () => {
            let freq = new Map();
            for(let i = 0; i<q; i++){
                freq.set(query[i], 0);
            }

            for(let i=0; i<n; i++){
                let val = arr[i];
                if(freq.has(val)){
                    const mapVal = freq.get(val);
                    freq.set(val, mapVal+1);
                }
            }

            return freq;
        }

        return{bf: bf(), opt: opt()}
    }

    find1stNonRepeatingElement(arr=[1,2,3,1,2,5]){
        let freq = new Map();
        let n = arr.length;

        // creation of frequency map array
        for(let i=0; i<n; i++){
            if(freq.has(arr[i])){
                const freqVal = freq.get(arr[i]);
                freq.set(arr[i], (freqVal+1));
            }else{
                freq.set(arr[i], 1);
            }
        }

        // checking the 1st non repeating element from given array
        for(let i=0; i<n; i++){
            let val = freq.get(arr[i]);
            if(val === 1){
                return arr[i];
            }
        }
    }

    // Find the count of distinct array element.
    findDistinctElementCount(arr=[3,5,6,5,4]){
        let distinctArr = new Set();
        let n = arr.length;

        for(let i = 0; i<n; i++){
            distinctArr.add(arr[i]);
        }

        console.log("distinctArr : ", distinctArr);
        
        return distinctArr.size;
    }

    // Given arr(n) check if any subarray with sum 0 is available
    findSubArraySumWith0(arr=[2, 2, 1, -3, 4, 3, 1, -2, -3, 2]){
        let n = arr.length;
        
        const getPf = () => {
            let pfSum = [];
            pfSum[0] = arr[0];

            for(let i=1; i<n; i++){
                pfSum[i] = pfSum[i-1]+arr[i];
            }
            return pfSum;
        }

        // Plain for loop with TC: O(n^3)
        const bf1 = () => {
            let ans = {}
            for(let i=0; i<n; i++){
                for(let j=i; j<n; j++){
                    let sum = 0; 
                    for(let k = i; k<=j; k++){
                        sum += arr[k];
                    }
                    if(sum === 0){
                        // console.log("i, j : ", i, j);
                        // ans[i] = j;
                        return true;
                    }
                }
            }
            // return ans;
            return false;
        }


        // Plain For loop iteration with TC:O(N^2)
        const bf2=()=>{
            let ans = {};
            for(let i=0; i<n; i++){
                let pf = 0;
                for(let j=i; j<n; j++){
                    pf += arr[j];
                    if(pf === 0){
                        // ans[i] = j;
                        return true;
                    }
                }
            }
            // return ans;
            return false;
        }

        // Using prefix sum
        const bf3 = () => {
            let pfSum = getPf();

            for(let i=0; i<n; i++){
                for(let j=i; j<n; j++){
                    let sum = pfSum[j] - pfSum[i-1];
                    if(sum===0){
                        return true;
                    }
                }
            }
            return false;
        }

        // Using prefix sum
        const bf4 = () => {
            let pfSum = getPf();

            for(let i=0; i<n; i++){
                for(let j=i; j<n; j++){
                    /**
                     * Since -->  let sum = pfSum[j] - pfSum[i-1];
                     *             if(sum==0) return true
                     * 
                     * Hence direct check ---> if(pfSum[j] - pfSum[i-1] === 0) return true
                     * 
                     * 
                     * OR check ---> if(pf[j]===pf[i-1]) return true ----> duplicate / repitative element
                     */
                    if(pfSum[j]===pfSum[i-1]){
                        return true;
                    }
                }
            }
            return false;
        }


        // using contribution tech + hashMap
        const opt1 = () => {
            let map = new Map();
            let pf = 0;
            for(let i=0; i<n; i++){
                pf += arr[i];

                if(pf===0){
                    return true;
                }else if(map.has(pf)){
                    return true;
                }

                map.set(pf);
            }
            return false;
        }

        // using contribution tech + hashSet
        const opt2 = () => {
            let set = new Set();
            let pf = 0;
            for(let i=0; i<n; i++){
                pf += arr[i];

                if(pf===0){
                    return true;
                }

                set.add(pf);
            }

            if(set.size !== n){
                return true;
            }
            return false;
        }

        // using contribution tech + hashSet + prfix sum array
        const opt3 = () => {
            let set = new Set();
            let pf = getPf()
            for(let i=0; i<n; i++){
                if(pf[i]===0){
                    return true;
                }
                set.add(pf[i]);
            }
            if(set.size !== n){
                return true;
            }
            return false;
        }

        return {bf1: bf1(), bf2: bf2(), bf3: bf3(), bf4:bf4(), opt1:opt1(), opt2:opt2(), opt3:opt3()}
    }

}

const hashing1 = new Hashing1()