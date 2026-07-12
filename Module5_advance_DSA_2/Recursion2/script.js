const QuestionsLists = [
    "Tower of Honoi : There are N disk place on Tower A, move all disk from Tower A to Tower C via Tower B.",
    "Print all valid parenthesis."
];

listObject('class_topic', QuestionsLists);


class Recursion2{
    towerOfHonoi(N=3, source='A', destination='C', via='B'){
        const TOH = (n=N, src=source, dest=destination, temp=via) => {
            if(n===0) return;

            TOH(n-1, src, temp, dest);
            console.log(src, ' -->' ,dest);
            TOH(n-1, temp, dest, src);
        }

        TOH();
    }

    printParenthesis(N=2){
        if(N==0) throw new Error("Invalid number of parenthesis!!!");
        

        let open = 0;
        let close = 0;
        let ans = "";

        const printValidParenthesis = (n, o, c, val) => {
            if(c===n && o===c){
                console.log(val);
                return;
            }
            

            if(o<n){
                printValidParenthesis(n, (o+1), c, (val+"("));
            }
            if(c<o && c<n){
                printValidParenthesis(n, o, (c+1), (val+")"));
            }
        }

        printValidParenthesis(N, open, close, ans);



        // const printValidParenthesis = (o, c, val) => {
        //     if(c===0 && o===c){
        //         console.log(val);
        //         return;
        //     }
            

        //     if(o>0){
        //         printValidParenthesis((o-1), c, (val+"("));
        //     }
        //     if(o<c && c>0){
        //         printValidParenthesis(o, (c-1), (val+")"));
        //     }
        // }

        // printValidParenthesis(open, close, ans);
    }
}

const recursion2 = new Recursion2();