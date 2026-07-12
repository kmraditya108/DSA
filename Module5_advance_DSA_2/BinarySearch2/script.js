const QuestionsLists = [
    "Given one integer K and an array in Rotated sorted form Ex: arr=[4, 5, 6,7, 8, 9, 1, 2, 3], find the target and return index.",
    "Find Square root of a given integer A",
    `Find Ath Mmagical number : <br/>&emsp; Given A, B and C return the Ath magical number. 
        <br/>&emsp; A magical number, that is divisible by either B or C both
        <br/>&emsp; Ex: A = 8, B=2, C=3 then Ath megical number = 12
        <br/>&emsp;&emsp; Here divisible numbers are (2, 3, 4, 6, 8, 9, 10, 12) --- 12 will be the Ath(8th) megical number
        <br/>&emsp;&emsp; range are from min(B, C) to A*min(B, C)`,
        `Given two sorted array, find it's median of the main sorted arrays`
];

listObject('class_topic', QuestionsLists);


class BinarySearchII{
    findTargetInRotatedArray(arr=[4, 5, 6,7, 8, 9, 1, 2, 3], k=9){
        console.log(arr, k);
        
        let n = arr.length;

        const opt = () => {
            let s =0, e=n-1;
            while(s<=e){
                let mid = Math.floor((e-s)/2)+s;

                // If found K at index mid
                if(arr[mid] === k){
                    return {idx:mid, ele:k};
                }

                /**
                 * If not found 1st check in which part K available
                 * 
                 */

                // If K available in part-II
                if(k < arr[0]){

                    /**
                     * Now check where mid is,
                     * If it's in part-I, then shift it to part-II
                     */
                    if(arr[mid]>=arr[0]){
                        s = mid+1;
                    }else{
                        if(arr[mid]>k){
                            e = mid-1;
                        }else{
                            s = mid+1;
                        }
                    }
                }else{

                    /**
                     * If check where the mid index is,
                     * If it's in part-II, shift it to part-I
                     */
                    if(arr[mid] < arr[0]){
                        e = mid-1;
                    }else{
                        if(arr[mid]>k){
                            e = mid-1;
                        }else{
                            s=mid+1;
                        }
                    }
                }
            }
        }
        return{opt: opt()}
    }

    findFloorSqrt(A = 50){
        console.log("sqrt of A: ", A);
        
        // TC: O(sqrt(N))
        const bf1 = () => {
            let i = 1;
            let ans = 1;
            while((i*i) <= A){
                ans = i;
                i++;
            }
            return ans;
        }

        // TC: O(log n)
        const opt = () => {
            let l = 1, r = A;
            let ans = 0;
            while(l<=r){
                let mid = Math.floor((r+l)/2);
                let sqrt = mid*mid;
                if(sqrt === A){
                    return mid;
                }else if(sqrt < A){
                    l = mid+1;
                    ans = mid;
                }else{
                    r = mid-1;
                }
            }
            return ans;
        }

        return {bf1: bf1(), opt: opt()}
    }

    findAthMegicalNumber(A=8, B=2, C=3){

        const bf1 = () => {
            let ans = 0;
            let count = 0;
            let num = 1;
            while(count<A){
                if((num%B==0) || (num%C==0)){
                    count++;
                }
                ans = num;
                num++;
            }
            return ans;
        }

        const opt = () => {
            const GCD = (a, b) => {
                while(b>0){
                    let temp = b;
                    b = a%b;
                    a = temp;
                }
                return a;
            }

            const LCM = (B*C)/GCD(B, C);

            const getCandidateAthMagicalNumber = (mid) =>{
                return Math.floor(mid/B)+Math.floor(mid/C)-Math.floor(mid/LCM)
            }

            let ans = 0;
            let s = Math.min(B, C);
            let e = A*(Math.min(B, C));
            while(s<=e){
                const mid_divisorCount = Math.floor((e-s)/2)+s;
                let candidateAthMagicalCount = getCandidateAthMagicalNumber(mid_divisorCount);
                
                if(candidateAthMagicalCount===A){
                    ans = mid_divisorCount;
                    e = mid_divisorCount-1;
                }else if(candidateAthMagicalCount<A){
                    s = mid_divisorCount+1;
                }else{
                    e = mid_divisorCount-1;
                }
            }
            return ans;

        }
        return {bf1:bf1(), opt: opt()};
    }

    findMedian = (arr1 = [1,3,4,7,10,12], arr2=[2,3,6,15]) => {
        let n1 = arr1.length;
        let n2 = arr2.length;

        let m1 = Math.floor((n1+n2)/2)-1;
        let m2 = Math.floor((n1+n2)/2);

        let cnt = 0;
        let val1 = -1;
        let val2 = -1;
        let i = 0, j = 0;
        while(i<n1 && j<n2){
            
            if(arr1[i]<=arr2[j]){
                // console.log("if --- > cnt, i, (cnt === m1) -- (cnt === m2) : ", cnt, i, (cnt === m1), (cnt === m2));
                
                if(cnt === m1) val1 = arr1[i];
                if(cnt === m2) val2 = arr1[i];
                i++;
                cnt++;
            }else{
                // console.log("else --- > cnt, j, (cnt === m1) -- (cnt === m2) : ", cnt, j, (cnt === m1), (cnt === m2));
                if(cnt === m1) val1 = arr2[j];
                if(cnt === m2) val2 = arr2[j];
                j++;
                cnt++;
            }

            if(val1 > 0 && val2 > 0){
                break;
            }
        }

        while(i<n1){
            if(cnt === m1) val1 = arr1[i];
            if(cnt === m2) val2 = arr1[i];
            i++;
            cnt++;
        }

        while(j<n2){
            if(cnt === m1) val1 = arr2[j];
            if(cnt === m2) val2 = arr2[j];
            j++;
            cnt++;
        }

        // console.log("n1, n2, val1, val2 : ", n1, n2, val1, val2);
        const totalLength = n1+n2;
        if((totalLength%2) === 0) return Math.floor(val1+val2)/2;
        return val2;
    }
}
const binarySearchObjII = new BinarySearchII();

