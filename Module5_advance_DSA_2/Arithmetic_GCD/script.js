const QuestionsLists = [
    "Given N array element, find count of pair i, j such that (arr[i]+arr[j])%m = 0.",
    "Calculate GCD of two numbers.-->[gcd(a, b)]\n use Eular's formula: gcd(a,b) = gcd(a-b, b) or gcd(a%b, b)",
    "Given arr[N], delete one such that GCD of remaining becomes maximum of returned max value"
];

listObject('class_topic', QuestionsLists);


class GCD {
    countOfPair(arr = [4, 3, 6, 3, 8, 12], m = 6) {
        let n = arr.length;

        const bf = () => {
            let pairs = 0;
            for (let i = 0; i < n - 1; i++) {
                for (let j = i + 1; j < n; j++) {
                    let sum = ((arr[i]%m) + (arr[j]%m));
                    let modulo = sum%m;
                    if (modulo === 0) {
                        pairs++;
                    }
                }
            }
            return pairs;
        }

        const opt = () => {
            let a = new Array(m).fill(0);
            for (let i = 0; i < n; i++) {
                let index = arr[i] % m;
                a[index] += 1;
            }

            let pairCount = (a[0] * (a[0] - 1)) / 2;

            let s = 1, e = m - 1;
            while (s < e) {
                pairCount += (a[s] * a[e]);

                s++;
                e--;
            }

            if (s === e) {
                pairCount += (a[s] * (a[s] - 1)) / 2;
            }
            return pairCount;
        }

        return { bf:bf(), opt: opt() }
    }

    calculateGCD(x=8, y=16){
        if(x<0 || y<0) return this.calculateGCD(Math.abs(x), Math.abs(y));

        if(x<y) return this.calculateGCD(y, x);
        if(y===0) return x;

        return this.calculateGCD(x%y, y);
    }

    deleteOne(arr=[24, 16, 18, 30, 15]){
        let n = arr.length;
        
        /**
         * Get prefix and suffix GCD
         */
        let pf = [];
        pf[0] = arr[0];
        for(let i=1; i<n; i++){
            pf[i] = this.calculateGCD(pf[i-1], arr[i]);
        }

        let sf = [];
        sf[n-1] = arr[n-1];
        for(let i=n-2; i>=0; i--){
            sf[i] = this.calculateGCD(sf[i+1], arr[i]);
        }
        console.log("pf: ", pf, "\nsf: ", sf);
        

        let ans = 1;
        // Calculate max GCD for index 0
        ans = sf[1];
        console.log("1st ans : ", ans);
        

        // Calculate max GCD for last index
        ans = Math.max(ans, pf[n-2]);
        console.log("2nd ans : ", ans);

        for(let i=1; i<n-1; i++){
            ans = Math.max(ans, this.calculateGCD(pf[i-1], sf[i+1]));
            console.log("ith ans : ", i, ans);
        }

        return ans;

    }
}

let gcd = new GCD();