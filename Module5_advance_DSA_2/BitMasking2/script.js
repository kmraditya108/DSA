const QuestionsLists = [
    "Given an array of N integer where each element has dublicate excapt one, find that unique number.",
    "Given an array of N integer where every numbers are given thrice excapt one number, find that unique number.",
    "Given an array of N integer where every numbers are given thrice excapt one number that are twice, find that unique number."
];

listObject('class_topic', QuestionsLists);

//============================

class BitMasking2{
    isIthBitSet(num, i){
        return (num & (1<<i)) !== 0;
    }

    setIthBit(num, i){
        // let mask = 1<<i;
        // let ans = (num|mask);
        // console.log("       ans : ", ans);
        // return ans;//
        return (num|(1<<i));
    }

    findUnique(arr= [4,5,5,4,1,6,6]){
        let n = arr.length;
        let ans = 0;
        for(let i=0; i<n; i++){
            ans = ans^arr[i];
        }

        return ans;
    }

    findUniqueInThriceDublicacy(arr=[5, 7, 5, 9, 7, 11, 11, 7, 5, 11]){
        let n = arr.length;
        let ans = 0;

        for(let i=0; i<32; i++){
            let cnt = 0;
            for(let j=0; j<n; j++){
                if(this.isIthBitSet(arr[j], i)){
                    cnt++;
                }
            }
            
            if((cnt%3) !== 0){
                ans = this.setIthBit(ans, i);
            }
        }
        return ans;
    }

    findUniqueInThriceDublicacy1(arr=[5, 7, 5, 9, 7, 11, 11, 7, 5, 9, 11]){
        let n = arr.length;
        let ans = 0;

        for(let i=0; i<32; i++){
            let cnt = 0;
            for(let j=0; j<n; j++){
                if((arr[j]&(1<<i))!==0){
                    cnt++;
                }
            }
            if((cnt%3)!==0){
                ans = (ans|(1<<i));
            }
        }
        return ans;
    }

    findTwoUniqueInDuplicateArray(arr=[10,8,8,9,12,9,6,11,10,6,12,17]){
        let n = arr.length;
        let xorAll = 0;

        for(let i=0; i<n; i++){
            xorAll = xorAll^arr[i];
        }
        console.log("xorAll : ", xorAll);
        

        // Now we have XOR of only 2 values those are unique
        // We know XOR of any 2 number will get the bits in that the set bits are means of one number's unset bit and other number's set bit.
        // So find the 1st set bit
        let partition = 0;
        for(let i=0; i<32; i++){
            if((xorAll&(1<<i)) !== 0){
                partition = i;
                break;
            }
        }
        console.log("partition: ", partition);
        

        // now we will try to divide the whole array into this partition bits.
        let num1 = 0;
        let num2 = 0;
        for(let i=0; i<n; i++){
            // check the numbers whose 'partition' bits are set, those will be in num1
            if((arr[i]&(1<<partition))!==0){
                num1 = num1^arr[i];
            }else{
                num2 = num2^arr[i];
            }
        }

        return {num1, num2};
    }

    findTheMaxAndValue(arr = [26,13,23,28,27,7,25]){
        let n = arr.length;
        let ans = 0;

        for(let i=31; i>=0; i--){
            let cnt = 0;
            for(let j=0; j<n; j++){
                if((arr[j]&(1<<i))!==0){
                // if(this.isIthBitSet(arr[j],i)){
                    cnt++;
                }
            }
            if(cnt>=2){
                ans = (ans|(1<<i));//this.setIthBit(ans, i);// (ans|(1<<i));

                // Setting rest bits as 0 where the current bit is 0
                for(let j=0; j<n; j++){
                    if((arr[j]&(1<<i))!==0){
                    // if(this.isIthBitSet(arr[j],i)){
                        continue;
                    }
                    arr[j] = 0;
                }
            }
        }
        return ans;
    }
}

let bit2 = new BitMasking2();