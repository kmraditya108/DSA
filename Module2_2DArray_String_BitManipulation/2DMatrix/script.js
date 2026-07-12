const QuestionListArray = [
    "Intro to 2D Matrices",
    "Row-wise and Column-wise sum",
    "Diagonal of Matrices",
    "Transpose of Matrices",
    "Rotate Matrice by 90 degree"
]
listObject("class_topic", QuestionListArray)

class Matrice_2D{
    /**
     * Given a matrix print row wise sum
     * TC: O(NxM)
     * SC: O(N | 1)
     */
    rowWiseSum(ar=[]){
        const arr = ar.length ? ar : [
            [3, 1, 6, 8],
            [2, 0, 0, 2],
            [4, 1, 2, 0]
        ];
        let n = arr.length;
        let m = arr[0].length;

        let ans = [];

        for(let i=0; i<n; i++){
            let sum = 0;
            for(let j=0; j<m; j++){
                sum += arr[i][j];
            }
            ans.push(sum);
        }

        return ans;
    }

    /**
     * Given a matrices, print the column wise sum
     * TC: O(NxM)
     * SC: O(N | 1)
     */
    colWiseSum(ar=[]){
        const arr = ar.length ? ar : [
            [3, 1, 6, 8],
            [2, 0, 0, 2],
            [4, 1, 2, 0]
        ];
        let n = arr.length;
        let m = arr[0].length;

        let ans = [];

        for(let i=0; i<m; i++){
            let sum = 0;
            for(let j=0; j<n; j++){
                sum += arr[j][i];
            }
            ans.push(sum);
        }
        return ans;
    }

    /**
     * Given a square matrice, print its diagonal element.
     */
    getDiagonals(ar=[]){
        const arr = ar.length ? ar : [
            [1, 3, 0, 4],
            [2, 1, 2, 3],
            [1, 0, 0, 9],
            [2, 1, 7, 2]
        ];

        const n = arr.length;
        const m = arr[0].length;

        const pricinpleDiagonal = () => {
            
            // TC: O(N^2) | SC : O(1)
            const bf = ()=> {
                let ans = [];
                for(let i=0; i<n; i++){
                    for(let j = 0; j<m; j++){
                        if(i==j){
                            ans.push(arr[i][j]);
                        }
                    }
                }
                return ans;
            }

            // Diagonal element that means i==j, i.e: i==i
            // TC: O(N) | SC : O(1)
            const opt = () => {
                let ans = [];
                for(let i = 0; i< n; i++){
                    ans.push(arr[i][i]);
                }
                return ans;
            }
            return {principalDiagonal_BF : bf(), principalDiagonal_opt: opt()};
        }

        const antiDiagonal = () => {
            // arr[N][M]
            // arr[0][4], arr[1][3], arr[2][2], arr[3][1], arr[4][0]
            // arr[i][arr.length - i]
            const method1 = () => {
                let ans = [];
                for(let i=0; i<n; i++){
                    ans.push(arr[i][n-1-i])
                }
                return ans;
            }

            const method2 = () => {
                let ans = [];
                let s = 0, e = n-1;
                while(s<n){
                    ans.push(arr[s][e]);
                    s++;
                    e--;
                }
                return ans;
            }
            return {antiDiagonal_method1: method1(), antiDiagonal_method2: method2()}
            
        }

        return {pricinpleDiagonal: pricinpleDiagonal(), antiDiagonal: antiDiagonal()}
    }

    prinAllDiagonalOfAnyMatrix(ar = []){
        const arr = ar.length ? ar : [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 0, 0, 1]
        ];

        let n = arr.length;
        let m = arr[0].length;

        let col = 0;
        let row = n-1;

        let ans = [];

        // the outer iteration will happen untill [col < m] and col will increase only after row == 0 
        // so if(row !==0){row--}else{col++}
        while(col<m){
            let internalArr = [];
            let r = row;
            let c = col;
            while(c<m && r<n){
                internalArr.push(arr[r][c]);
                c++;
                r++;
            }
            ans.push(internalArr);

            if(row !== 0){
                row--;
            }else{
                col++;
            }
        }
        return ans;
    }

    printAllDiagonalFromTopLeft(ar =[]){
        const arr = ar.length ? ar : [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 0, 0, 1]
        ];

        const n = arr.length;
        const m = arr[0].length;

        let row = 0;
        let col = m-1;

        let ans = [];
        while(row < n){

            let r = row;
            let c = col;
            let internalArr = [];
            while(r<n && c<m){
                internalArr.push(arr[r][c]);
                r++;
                c++;
            }
            ans.push(internalArr);

            if(col !== 0){
                col--;
            }else{
                row++;
            }
        }
        return ans;
    }

    /**
     * Transpose Matrix : This means, shift the row into col and col into row
     * 
     * Note: For Rectangular Matrix, only copy element from one arr to another will help to solve the question
     */
    transposeMatrix(ar = []){
        const arr = ar.length ? ar : [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [0, 0, 1, 2]
        ];

        let n = arr.length;
        let m = arr[0].length;


        /**
         * TC: O(NxM)
         * SC: O(NxM)
         */
        const bf = () => {
            let ans = [];
            for(let i = 0; i<m; i++){
                ans[i] = [];
                for(let j = 0; j<n; j++){
                    ans[i].push(arr[j][i])
                }
            }
            return ans;
        }

        /**
         * TC: O(NxM)
         * SC: O(1)
         */
        const opt = () => {
            let ans = JSON.parse(JSON.stringify(arr));
            for(let i = 0; i<n; i++){
                for(let j = i+1; j<m; j++){ // -------> j = i+1; Because only shift required below and after diagonals element
                    let temp = ans[i][j];
                    ans[i][j] = ans[j][i];
                    ans[j][i] = temp;
                }
            }
            console.log("arr", arr);
            return ans;
        }

        return {bf: bf(), opt: opt()}
    }


    // Total TC: O(N^2) + O(N^2) = O(N^2)
    rotateMatrixBy90Degree(ar = []){
        const arr = ar.length ? ar : [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]

        let n = arr.length;
        let m = arr[0].length;

        // 1st transpose the matrix
        // TC: O(N^2)
        for(let i = 0; i<n; i++){
            for(let j=i+1; j<m; j++){
                let temp = arr[i][j];
                arr[i][j] = arr[j][i];
                arr[j][i] = temp;
            }
        }

        // TC: O(N)
        const reverseArr = (arrayData) => {
            let n = arrayData.length;
            let s = 0;
            let e = n-1;
            while(s<e){
                let temp = arrayData[s];
                arrayData[s] = arrayData[e];
                arrayData[e] = temp;
                s++;
                e--;
            }
            return arrayData;
        }

        // TC: O(N^2)
        for(let i = 0; i<n; i++){
            reverseArr(arr[i]);
        }

        return arr;
    }
}

let m2d = new Matrice_2D();