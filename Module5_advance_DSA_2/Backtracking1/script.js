const QuestionsLists = [
    "Print all n digits number, which can be formed using given digits",
];

listObject('class_topic', QuestionsLists);


class Backtracking1{
    formDigits(n=2, digits=[1,2]){
        const a = digits[0];
        const b = digits[1];
        let ans = 0;
        let ansAr = [];

        const solve = (n, a, b, ans) => {
            if(n===0){
                console.log(ans);
                ansAr.push(ans);
                return;
            }

            solve(n-1, a, b, ans*10+a, ansAr);
            solve(n-1, a, b, ans*10+b, ansAr);
        }

        solve(n, a, b, ans, ansAr);
        return ansAr;
    }

    generateSubSet(arr=[5,2,9]){
        let n = arr.length;
        let ans = [];
        let temp = [];
        let i=0;

        const solve = (i, n, temp, ans, arr) => {
            if(i===n){
                ans.push([...temp]);
                return;
            }

            solve(i+1, n, [...temp, arr[i]], ans, arr);
            solve(i+1, n, temp, ans, arr);
        }

        solve(i, n, temp, ans, arr);

        return ans;
    }

    generatePermutation(digits=[4,7,9]){
        let n = digits.length;
        let ans = [];
        let i=0;

        const swap = (arr, i, j) => {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            return arr;
        }

        const solve = (n, i, arr, ans) => {
            if(i===n){
                console.log('arr: ', arr);
                
                ans.push([...arr]);
                return;
            }

            for(let j=i; j<n; j++){
                swap(arr, i, j);
                solve(n, (i+1), arr, ans);
                swap(arr, i, j);
            }
        }

        solve(n, i, digits, ans);

        return ans;
    }
}

const bcktrcking1 = new Backtracking1();