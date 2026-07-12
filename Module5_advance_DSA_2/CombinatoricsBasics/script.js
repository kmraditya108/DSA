const QuestionsLists = [
    "Generate Pascal triangle of number N."
];

listObject('class_topic', QuestionsLists);


class CombinatoricsBasics{
    pascalTriangle(N=3){
        let pscl = [];
        for(let i=0; i<N; i++){
            pscl[i] = [];

            pscl[i][0]=1;
            pscl[i][i]=1;
            for(let j=1; j<i; j++){
                pscl[i][j] = pscl[i-1][j-1]+pscl[i-1][j];
            }
        }
        return pscl;
    }


    generateExcelTitle(N=2002){

        const alphaMap = (num) => {
            return String.fromCharCode(num+97)
        }


        let ans = '';
        while(N>0){
            N--;

            let mod = N%26;
            let char = alphaMap(mod);
            console.log(N, char);
            
            ans = char+ans;
            N = Math.floor(N/26);
        }
        // ans = ans.split('').reverse().join('');
        return ans;
    }
}


const combinatorics = new CombinatoricsBasics()

