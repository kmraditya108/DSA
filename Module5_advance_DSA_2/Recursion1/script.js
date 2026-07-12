const QuestionsLists = [
    "Recursive code for add a number N times."
];

listObject('class_topic', QuestionsLists);

class Recursion1{
    add(num=10, N=10){
        if(N===1) return num;

        return num+this.add(num, N-1);
    }

    power(num=2,N=10){
        if(N===1) return num;
        
        return num*this.multiplication(num, N-1);
    }

    fabonacci(N=5){
        if(N===1 || N===2){
            return 1;
        }

        return this.fabonacci(N-1)+this.fabonacci(N-2);
    }

    power1(num=2,N=10){
        if(N===1) return num;

        let he = this.power1(num, N-1);
        if(he%2===0){
            return he*he;
        }
        return num*he*he;
    }

    
}


const recursion1 = new Recursion1();



