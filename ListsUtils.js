class ListCreater{
    
    simpleLists(idName, questionArr){
        let elementVal = document.getElementById(idName);
        if(!elementVal) throw new Error("Element ID not found error!!");
        
        let listItems = "";
        for(let ele of questionArr){
            listItems += `<li><h4>${ele}</h4></li>`;
        }
        elementVal.innerHTML += listItems;
    }
}

const lc = new ListCreater();

function listObject(idName, QuestionListArray){
    lc.simpleLists(idName, QuestionListArray);
}