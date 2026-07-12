const QuestionsLists = [
    "Given a row-wise col-wise sorted array, find if element 'k' is present or not."
];

listObject('class_topic', QuestionsLists);

class Array2D {
    findElementFromSortedArray(k = 16, ar = []) {
        let arr = ar.length ? ar : [
            [5, 10, 15, 20],
            [6, 12, 18, 24],
            [7, 14, 21, 28],
            [8, 16, 24, 32]
        ];

        let n = arr.length;
        let m = arr[0].length;
        console.log("arr: ", arr, n, m);


        let returnVal = 'Not found anything!!'
        let i = 0, j = m - 1;
        while (i < n && j >= 0) {
            if (arr[i][j] === k) {
                returnVal = { i, j };
                break;
            } else if (k > arr[i][j]) {
                i++;
            } else {
                j--;
            }
        }

        return returnVal;
    }

    findMaxOnesInRow(ar = []) {
        let arr = ar.length ? ar : [
            [0, 0, 0, 1, 1],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 1, 1],
            [0, 1, 1, 1, 1],
            [0, 0, 1, 1, 1]
        ]

        let n = arr.length;
        let m = arr[0].length;

        const method1 = () => {
            let i = 0;
            let j = m - 1;
            let ans = -1;
            let len = 0;

            while (i < n && j >= 0) {
                if (arr[i][j] === 1) {
                    len++;
                    ans = i;
                    j--;
                }
                if (arr[i][j] === 0) {
                    i++;
                }
            }
            return { len, ans }
        }

        const method2 = () => {
            let i = 0;
            let j = m - 1;
            let ans = -1;
            let len = 0;

            while (i < n && j >= 0) {
                while (j >= 0 && arr[i][j] === 1) {
                    len++;
                    ans = i;
                    j--;
                }
                i++;
            }
            return { len, ans }
        }
        return { method1: method2(), method2: method2() }
    }

    printMatrixBoundary(ar = []) {
        let arr = ar.length ? ar : [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [12, 13, 14, 15]
        ]
        let n = arr.length;

        let i = 0;
        let j = 0;
        let ans = [];
        for (let k = 0; k < n - 1; k++) {
            ans.push(arr[i][j++]);
        }
        for (let k = 0; k < n - 1; k++) {
            ans.push(arr[i++][j]);
        }
        for (let k = 0; k < n - 1; k++) {
            ans.push(arr[i][j--]);
        }
        for (let k = 0; k < n - 1; k++) {
            ans.push(arr[i--][j]);
        }

        return ans;
    }

    printMatrixInSpiralFormat(ar = []) {
        let arr = ar.length ? ar : [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25]
        ];

        let n = arr.length;
        let i = 0, j = 0
        let ans = [];
        while (n > 1) {
            for (let k = 0; k < n - 1; k++) {
                ans.push(arr[i][j++]);
            }
            for (let k = 0; k < n - 1; k++) {
                ans.push(arr[i++][j]);
            }
            for (let k = 0; k < n - 1; k++) {
                ans.push(arr[i][j--]);
            }
            for (let k = 0; k < n - 1; k++) {
                ans.push(arr[i--][j]);
            }
            i++;
            j++;
            n = n - 2;
        }
        if (n == 1) {
            ans.push(arr[i][j])
        }

        return ans;
    }

    // find the sum of all submatrixes sum
    findSumOfAllSubmatrixesSum(ar = []) {
        let arr = ar.length ? ar : [
            [4, 9, 6],
            [5, -1, 2]
        ];

        let n = arr.length;
        let m = arr[0].length;
        let ans = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                ans += arr[i][j] * (i + 1) * (j + 1) * (n - i) * (m - j);
            }
        }

        return ans;
    }
}

let arr_2d = new Array2D();