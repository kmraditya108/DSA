const QuestionsLists = [
    "Check whether ith Bit is set or not?",
    "Set ith bit for any given number.",
    "Clear the ith bit for any given number.",
    "Toggle the bit for any given number",
    "Count total set bits for any given integer number.",
    "Set ith bit for any given integer number in combination."
];

listObject('class_topic', QuestionsLists);

class BitMasking{
    isIthBitSet(num=8, i=2){
        let mask = (1 << i);

        if((num & mask) !== 0){
            return 'Set';
        }
        else{
            return 'Unset';
        }

        // return (num & (1<<i)) !== 0; //---> One liner solution
    }

    setIthBit(num, i){
        let mask = (1<<i);

        return (num | mask);
    }

    clearIthBit(num, i){
        let mask = isNaN(i) ? null : ~(1<<i);
        // console.log(mask);
        
        return (num&mask);
    }

    toggleIthBit(num, i){
        let mask = isNaN(i) ? null : (1<<i);
        return (num^mask);
    }

    countSetBits(num){
        const method1 = () => {
            let cnt = 0;
            let ans = []
            for(let i=0; i<32; i++){
                let mask = (1<<i);
                
                if((num&mask)!==0){
                    cnt++
                    ans.push(i)
                }
            }
            return {ans,cnt};
        }

        const method2 = () => {
            let cnt = 0;
            let ans = [];
            let i = 0;

            while(num > 0){
                if((num & 1)===1){
                    cnt++;
                    ans.push(i);
                }
                
                i++;

                num = num>>1; // it will be treated as "num/2" in each iteration number will be reduce by a bit(2)
            }

            return {ans,cnt};
        }

        return {method1 : method1(), method2:method2()}
    }

    setIthBitInRange(A, B, C){ // 0110
        let range = C+B-1;
        let ans = 0;
        for(let i=C; i<=range; i++){
            ans = (ans|(1<<i));
        }
        return ans;
    }
}
let bit1 = new BitMasking();