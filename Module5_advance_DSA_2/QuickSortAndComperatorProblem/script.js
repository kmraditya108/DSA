const QuestionsLists = [
    "Given an array of size N, Re-arrenge the array's element such that arr[0] arrive at it's correct index.<br>&emsp;- arr=[54, 26, 93, 17, 77, 31, 44, 55, 20]<br>&emsp;- Here arr[0](54) is pivot element.<br>&emsp;- After rearrenging the array the new arr=[26, 17, 31, 20, <b><i>54</i></b>, 93,77, 55] and the correct position of pivot element(54) is '4'",
    "Quick Sort: Given an array of size N, Re-arrenge the array's element such that arr are in sorted order",
    "Quick Sort with randomised pivots: Given an array of size N, Re-arrenge the array's element such that arr are in sorted order",
    "Sort with comparator implementation: Given an array, sort the elements on the basis of it's factors, if count of factors are same then sort on basic of it's magnitude.",
    "Given an array of coordinates points and integer B, where points[i] = [xi, yi], return the B closest points to origin."

];

listObject('class_topic', QuestionsLists);


class QuickSortAndComperatorProblem{
    partitioning(arr=[54, 26, 93, 17, 77, 31, 44, 55, 20]){
        let n = arr.length;
        let pivot = arr[0];

        let p1 = 1;
        let p2 = n-1;
        while(p1<= p2){
            if(arr[p1]<=pivot){
                p1++;
            }else if(arr[p2]>pivot){
                p2--;
            }else{
                let temp = arr[p1];
                arr[p1] = arr[p2];
                arr[p2] = temp;

                p1++;
                p2--;
            }
        }
        // finally swapping the pivot element to it's correct position and 
        // returning the index value
        let temp = arr[0];
        arr[0] = arr[p2];
        arr[p2] = temp;

        return {p2, arr};
    }

    quickSort(arr=[54, 26, 93, 17, 77, 31, 44, 55, 20]){

        const main = () => {
            let n = arr.length;
            let l = 0;
            let r = n-1;
            quickSortMain(arr, l, r);

            return arr;
        }

        const quickSortMain = (arr, l, r) => {
            if(l<r){
                let ind = pivotPartioning(arr, l, r);
                quickSortMain(arr, l, ind-1);
                quickSortMain(arr, ind+1, r);
            }
        }

        const pivotPartioning = (arr, l, r) =>{
            let pivot = arr[l];

            let p1 = l+1;
            let p2 = r;
            while(p1<=p2){
                if(arr[p1]<= pivot){
                    p1++;
                }else if(arr[p2]>pivot){
                    p2--;
                }else{
                    let tmp = arr[p1];
                    arr[p1] = arr[p2];
                    arr[p2] = tmp;

                    p1++;
                    p2--;
                }
            }

            let tmp = arr[l];
            arr[l] = arr[p2];
            arr[p2] = tmp;
            return p2;
        }
        return main();
    }

    quickSortWithRandomise(arr=[54, 26, 93, 17, 77, 31, 44, 55, 20]){

        const getRandomIdx = (min, max) => {
            return parseInt(Math.random()*(max-min+1))+min;
        }

        const swap = (arr, i, j) => {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            return arr;
        }

        const getPartition = (arr, l, r) => {
            let random_i = getRandomIdx(l, r);
            [arr[l], arr[random_i]] = [arr[random_i], arr[l]];
            // console.log("random_i, l, arr : ", random_i, l, arr);
            

            const pivot = arr[l];
            let p1 = l+1;
            let p2 = r;
            while(p1<=p2){
                if(arr[p1]<=pivot){
                    p1++;
                }else if(arr[p2]>pivot){
                    p2--;
                }else{
                    swap(arr, p1, p2);
                    p1++;
                    p2--;
                }
            }
            swap(arr, l, p2);
            return p2;
        }

        const quickSortMain=(arr, l, r)=>{
            if(l<r){
                let pivotIdx = getPartition(arr, l, r);
                quickSortMain(arr, l, pivotIdx-1);
                quickSortMain(arr, pivotIdx+1, r);
            }
        }

        const main=()=>{
            let n = arr.length;
            let l = 0;
            let r = n-1;
            quickSortMain(arr, l, r);
            return arr;
        }

        return main();
    }

    sortWithComparatorFnForFactors(arr=[9, 3, 10, 6, 4]){
        let n = arr.length;

        const factors = (val) => {
            let factorCount = 0;
            
            for(let i=1; (i*i)<=val; i++){
                if(val%i === 0){
                    if(val/i === i){
                        factorCount += 1;
                    }else{
                        factorCount += 2;
                    }
                }
            }
            return factorCount;
        }

        const comparator = (a, b) => {
            let fa = factors(a);
            let fb = factors(b);
            if(fa < fb){
                return -1;
            }else if(fa > fb){
                return 1;
            }else{
                if(a<b){
                    return -1;
                }else if(a>b){
                    return 1;
                }else{
                    return 0;
                }
            }
        }

        return arr.sort(comparator);
    }

    sortWithComparatorFnForCoordinates(arr=[[3,3], [5,-1],[-2,4]], b = 2){
        const distanceBetweenOriginToPoints = (x, y) => {
            return Math.sqrt(x*x + y*y);
        }

        let coordinatesComparator = (a, b) => {
            let distA = distanceBetweenOriginToPoints(a[0], a[1])
            let distB = distanceBetweenOriginToPoints(b[0], b[1]);

            if(distA < distB){
                return -1;
            }else if(distA > distB){
                return 1;
            }else{
                return 0;
            }
        }

        arr.sort(coordinatesComparator)
        return arr.slice(0, b)
    }
}

const quickSortObj = new QuickSortAndComperatorProblem();