const QuestionsLists = [
    `Given sorted list of overlapping intervals(Sorted basis on start time).<br>Find and merge the interval and return the new list`,
    `Given a sorted list of non-overlapping interval and one new interval.<br>Merge this new interval with existing inerval set and return the final interval.`,
    `Given an array find the first missing natural number.`
];
listObject('class_topic', QuestionsLists);
// ==============================================End of UI ==================================================


class Array3{

    // TC: O(N) | SC: O(N)
    mergeIntervals(intervals=[[0,2],[1,4],[5,6],[6,8],[7,10],[8,9],[12,14]]){
        let n = intervals.length;

        // TC: O(N^2) | SC: O(N)
        const bf = () => {
            let cur_start = intervals[0][0];
            let cur_end = intervals[0][1];
            let ans = [];
            let i=1;

            // for(let i=1; i<n; i++){
            while(i<n){

                let start = intervals[i][0];
                let end = intervals[i][1];

                while(start<=cur_end && i<n){
                    cur_end = Math.max(cur_end, end);

                    i++;
                    start = intervals[i][0];
                    end = intervals[i][1];
                }
                ans.push(new Array(cur_start, cur_end));
                cur_start = start;
                cur_end = end;
                i++;
            }
            ans.push(new Array(cur_start, cur_end));

            return ans;
        }

        let opt = () => {
            let cur_start = intervals[0][0];
            let cur_end = intervals[0][1];
            let ans = [];
            let i=1;
            while(i<n){
                let start = intervals[i][0];
                let end = intervals[i][1];
                if(start <= cur_end){
                    cur_end = Math.max(cur_end, end);
                }else{
                    ans.push(new Array(cur_start, cur_end));
                    cur_start = start;
                    cur_end = end;
                }
                i++;
            }

            ans.push(new Array(cur_start, cur_end));

            return ans;
        }

        return {bf:bf(), opt:opt()}
    }

    mergeInterval2(intervals=[[1,3],[4,7],[10,14],[16,19],[21,24],[27,30],[32,35]], interval1=[12,22]){
        let n = intervals.length;
        let ans = [];
        let iStart = interval1[0];
        let iEnd = interval1[1];

        for(let i=0; i<n; i++){
            let s = intervals[i][0];
            let e = intervals[i][1];
            console.log(s,e);

            // case - I
            if(e<iStart){
                ans.push(intervals[i]);
            }else if(s > iEnd){ //----------------------------- case - III
                ans.push(new Array(iStart, iEnd));
                while(i<n){
                    ans.push(intervals[i]);
                    i++;
                }

                return ans;
            }else{ // --------------------------- case-II (e <= iStart)
                iStart = Math.min(iStart, s);
                iEnd = Math.max(iEnd, e);
            }
        }

        // edge case if intervel never fall under case-III
        ans.push(new Array(iStart, iEnd));
        return ans;
    }

    firstMissingNumber(arr=[4, -1, 0,6,1,2]){
        let n = arr.length;
        let i=0;
        while(i<n){
            if(i>=1 && i<=n){
                let correct_i = arr[i]-1;
                if(arr[correct_i] !== arr[i]){
                    let t = arr[correct_i];
                    arr[correct_i] = arr[i];
                    arr[i] = t;
                }else{
                    i++
                }
            }else{
                i++
            }
        }
        for(let i=0; i<n; i++){
            if(arr[i] !== i+1){
                return i+1;
            }
        }
        return n+1;
    }
}


let arr3 = new Array3();
