const QuestionsLists = [
    "Given a sorted array return the index of an element K, if not return -1",
    "Given arr[n], find the 1st occurance of the target element(K - given)",
    "Given an sorted array with duplicate elements find the frequency of K in the given array",
    "Given an array every element occure twice except one element, find that element.",
    "Given an array where elements are sorted in two parts increasing and decreasing both parts are divide by a peak element, find the peak element.",
    `Given an array of N distinct element, find any one local minima. Ex:-<hr/>
        <br>&emsp; - arr = [3, 5, 10, 2, 9, 20] &emsp; O/P=3(index:0)<hr/>
        <br>&emsp; - arr = [15, 5, 4, 2, 9, 6] &emsp; O/P=6(index:)<hr/>
        <br>&emsp; - arr = [15, 5, 4, 2, 9, 10] &emsp; O/P=2(index:3)<hr/>`
];

listObject('class_topic', QuestionsLists);


class BinarySearch1{
    findElement(arr=[3, 8, 11, 19, 28], k=19){
        console.log(arr, k);
        
        let n = arr.length;
        // TC: O(log n)
       const opt = () => {
            let i=0, j=n-1;
            while(i<=j){
                let mid = Math.floor((i+j)/2);

                if(arr[mid]===k){
                    return mid;
                }else if(arr[mid]>k){
                    j = mid-1;
                }else{
                    i = mid+1;
                }
            }
            return -1;
       }
       return {opt : opt()}
    }

    findFirstOccurence(arr=[-5,-5,-3,0,0,1,1,5,5,5,5,5,10,10,15,15], k = 5){
        console.log(arr, k);
        let n = arr.length;
        
        // TC : O(log n)
        const opt1 = ()=>{
            let s = 0, e=n-1;
            while(s<=e){
                let mid = parseInt((e-s)/2)+s;

                if(arr[mid] === k){
                    if(arr[mid-1] === k){
                        e = mid-1;
                        continue;
                    }
                    return mid;
                }else if(arr[mid]>k){
                    e = mid-1;
                }else{
                    s = mid+1;
                }
            }
            return -1;
        }

        const opt2 = ()=>{
            let s = 0, e=n-1;
            let occurance = -1;
            while(s<=e){
                let mid = parseInt((e-s)/2)+s;

                if(arr[mid] === k){
                    occurance = mid;
                    e = mid-1;
                }else if(arr[mid]>k){
                    e = mid-1;
                }else{
                    s = mid+1;
                }
            }
            return occurance ? occurance : -1;
        }

        return {opt1: opt1(), opt2: opt2()}
    }

    findFrequencyOfK(arr=[-5,-5,-3,0,0,1,1,5,5,5,5,5,10,10,15,15], k = 5){
        console.log(arr, k);
        
        let n = arr.length;

        const opt = (occuranceType) => {
            let s = 0, e = n-1;
            let fo = -1;
            while(s<=e){
                let mid = Math.floor((e-s)/2)+s;

                if(arr[mid] === k){
                    fo = mid;
                    if(occuranceType === 'left') e = mid-1;
                    if(occuranceType === 'right') s = mid+1;

                }else if(arr[mid]<k){
                    s = mid+1;
                }else{
                    e = mid-1
                }
            }
            return fo;
        }

        let firstOccurence = opt('left');
        let lastOccurence = opt('right');

        return (lastOccurence - firstOccurence + 1);
    }

    findUniqueElement(arr = [8,8,5,5,6,2,2]){
        console.log(arr);
        
        let n = arr.length;

        // Using XOR -- TC: O(n)
        const bf1 = () => {
            let xor = 0;
            for(let i = 0; i< n; i++){
                xor = xor^arr[i];
            }
            return xor;
        }

        // Using Binary search -- TC: O(log n)
        const opt1 = () => {
            let s = 0, e=n-1;
            while(s<=e){
                let mid = Math.floor((e-s)/2)+s;
                let ele = arr[mid];
                
                if((ele !== arr[mid-1]) && (ele !== arr[mid+1])){
                    return {val:arr[mid], idx: mid};
                } 
                
                // Getting 1st occurance index for dublicate elements
                let fo = -1;
                if(ele === arr[mid-1]){
                    fo = mid-1;
                }else if(ele === arr[mid+1]){
                    fo = mid;
                }

                if(fo%2===0){
                    s = mid+1;
                }else if(fo%2 !== 0){
                    e = mid-1;
                }
            }
            return -1;
        }

        return {bf1: bf1(), opt1:opt1()}
    }

    findPeakElement(arr=[1,3,5,10,15,12,6]){
        console.log(arr);
        
        let n = arr.length;

        // TC: O(n) || SC: O(1)
        const bf1 = () => {
            for(let i=1; i<n; i++){
                if((arr[i-1]<arr[i]) && (arr[i+1]<arr[i])){
                    return arr[i];
                }
            }
            return -1;
        }

        // TC:O(log n) | SC: O(1)
        const opt = () => {
            let s = 0, e = n-1;
            while(s<=e){
                let mid = Math.floor((e-s)/2)+s;

                if((arr[mid]>arr[mid-1]) && (arr[mid]>arr[mid+1])){
                    return arr[mid];
                }else if(arr[mid]>arr[mid-1]){
                    s = mid+1;
                }else{
                    e = mid-1;
                }
            }
            return -1;
        }

        return {bf1: bf1(), opt:opt()}
    }

    findAnyLocalMinia(arr=[15, 5, 4, 2, 9, 10]){
        console.log(arr);
        
        let n = arr.length;

        const opt = () => {

            // edge case
            if(n===1) return arr[0];

            if(arr[n-1] < arr[n-2]) return arr[n-1];

            if(arr[0]<arr[1]) return arr[0];


            let s=0, e=n-1;
            while(s<=e){
                let mid = Math.floor((e-s)/2)+s;

                if((arr[mid]<arr[mid+1]) && (arr[mid]<arr[mid-1])){
                    return arr[mid];
                }else if(arr[mid]>arr[mid+1]){
                    s = mid+1;
                }else{
                    e = mid-1;
                }
            }
            return -1;
        }
        return {opt: opt()};
    }
}

const binarySearchObj1 = new BinarySearch1();