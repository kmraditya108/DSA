const QuestionsLists = [
    "Question lists"
];

listObject('class_topic', QuestionsLists);


class Animal{
    constructor(name){
        this.name = name;
        this.speed = 0;
    }

    run(speed){
        this.speed = speed
        alert(`${this.name} runs with speed ${this.speed}`);
    }

    stop(){
        this.speed = 0;
        alert(`${this.name} stands still.`);
    }
}   

class Rabbit extends Animal{

    constructor(name, earlength){
        super(name);
        this.name = name;
        this.earlength = earlength;
        this.speed = 0;
    }

    hide(){
        alert(`${this.name} hides!`);
    }

    stop() {
        setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
        // setTimeout(function() { super.stop() }, 1000);
    }
}

const rabbit = new Rabbit('White Rabbit')
// rabbit.run();
// rabbit.hide();

// const animal = new Animal('My Animal');

