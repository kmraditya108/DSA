const QuestionsLists = [
    "Find factors of given integer N."
];

listObject('class_topic', QuestionsLists);

class PrimeNumber{
    findFactors(N){
        let factors = 0;
        for(let i=1; (i*i)<=N; i++){
            if(N%i === 0){
                if(N/i === i){
                    factors += 1;
                    // console.log('i: ', i," x ",i);
                }else{
                    factors += 2;
                    // console.log('i-N : ', i," x ", N/i);
                }
            }
        }
        return factors;
    }

    isPrimeNumber(N){
        let validateForPrime = this.findFactors(N);
        return validateForPrime>2 ? false : true;
    }

    sieveOfEratosthenes_countTotalPrimes(N=5){
        let soe = [...Array(N+1)].fill(true);
        soe[0] = false;
        soe[1] = false;

        if(N<=2) throw new Error("Prime validation should be greater than 2.");


        // TC: O(sqrt(N))
        for(let i=2; (i*i)<=N; i++){
            if(soe[i]){
                for(let j=2*i; j<=N; j=j+i){
                    soe[j] = false;
                }
            }
        }
        // console.log(soe);

        // TC: O(N)
        let ans = [];
        for(let i=2; i<=N; i++){
            if(soe[i]) ans.push(i);
        }
        return ans;
    }

    optimised_sieveOfEratosthenes_countTotalPrimes(N=5){
        let soe = [...Array(N+1)].fill(true);
        soe[0] = false;
        soe[1] = false;

        if(N<=2) throw new Error("Prime validation should be greater than 2.");


        // TC: O(sqrt(N))
        for(let i=2; (i*i)<=N; i++){
            if(soe[i]){
                for(let j=i*i; j<=N; j+=i){
                    soe[j] = false;
                }
            }
        }
        // console.log(soe);

        // TC: O(N)
        let ans = [];
        for(let i=2; i<=N; i++){
            if(soe[i]) ans.push(i);
        }
        return ans;
    }


    // Just test of SieveOfEratosthenes solution
    testSOE(n){
        console.time('t1');
        const a = this.sieveOfEratosthenes_countTotalPrimes(n);
        console.log(a);
        
        console.timeEnd('t1');


        console.time('t2');
        const b = this.optimised_sieveOfEratosthenes_countTotalPrimes(n)
        console.log(b);
        console.timeEnd('t2');
    }


    //Get the smallest prime factors of numbers from 1 to N
    getSmallestPrimeFactors(N){
        let spf = Array.from(Array(N+1), (_, id)=> id);
        console.log('...spf : ', [...spf]);


        // TC: O(N*SQRT(N)) || SC: O(N)
        for(let i=2; (i*i)<=N; i++){
            if(spf[i] === i){
                for(let j = i*i; j<=N; j+=i){
                    spf[j] = i;
                }
            }
        }
        return spf;
    }

    /**
     * After observation we have seen the relation of any number with their factors are: eg N = a^x * b^y
     *      then total factors  = (x+1)*(y+1) ---------------------------> Equ(1)
     *      EG: 72 = 2*2*2*3*3 => (2^3) * (3^2), Hence total factors = (3+1)*(2+1) => 4*3 = 12
     * 
     * get the spf(smallest prime factors) from 1 to given number(N).
     * Now check how many times the spf[N] divides N and calculate totalFactors => (count+1) || as from Equ(1)
     * Finally return the totalFactors
     * 
     */
    getTotalNumberOfFactors(N){
        let spf = this.getSmallestPrimeFactors(N);

        let totalFactors = 1;
        while(N>1){
            let cnt = 0;
            let p = spf[N];
            while(N%p === 0){
                cnt++;
                N = N/p;
            }

            totalFactors = totalFactors*(cnt+1);
        }
        return totalFactors;
    }
}


const primeNumber = new PrimeNumber();