let size = 5;
const queue = [];
let lastAction = '';

function updateLength() {
    return queue.length;
}
function updateView(animateLastItem = false) {
    const container = document.getElementById('queueView');
    container.innerHTML = queue.map((item, index) => {
        const shouldAnimate = animateLastItem && index === queue.length - 1;
        return `<div class="queue-item ${shouldAnimate ? 'queue-item-enter' : ''}">
                    ${index === (queue.length - 1) ? "<p class='rear-label'><span>&#9660;</span>rear</p>" : '<p class="rear-label"></p>'}
                    <p class="queue-item-val">${item}</p>
                ${index === 0 ? '<p class="front-label"><span>&#9650;</span>front</p>' : '<p class="front-label"></p>'}
                    </div>`;
    }).join('');
}
async function enqueue() {
    if (queue.length === size) {
        showError("Queue has already reached to it's max limit");
        return;
    };

    lastAction = 'Enqueue'
    const val = document.getElementById('elementInput').value.trim();
    if (val) {
        queue.push(val);
        updateView(true);
    }
    await updateLength();
    bottomDisplayData();

    const inputField = document.getElementById('elementInput');
    inputField.value = '';
    inputField.focus();
}

async function dequeue() {
    if (queue.length) {
        queue.shift();
        updateView(false);
    }
    lastAction = 'Dequeue'
    await updateLength();
    bottomDisplayData();
}


let errorTimer = null;
let errorInterval = null;
function showError(msg) {
    // const lastContainer = document.getElementById('last_label_container');
    // lastContainer.innerHTML = `<p class="error-msg">${msg}<p>`
    console.log("message : ", msg);

    const errorMsgContainer = document.querySelector('.error-msg');
    errorMsgContainer.textContent = msg;

    // Clear any active timers from previous errors
    clearTimeout(errorTimer);
    clearInterval(errorInterval);

    let count = 0;
    errorInterval = setInterval(() => {
        count++;
        if(count > 3){
            clearInterval(errorInterval);
            errorMsgContainer.textContent = '';
        }else{
            errorMsgContainer.textContent = msg +' ----->'+ count;
        }
    }, 1000);
    
    errorTimer = setTimeout(() => {
        errorMsgContainer.textContent = '';
        clearInterval(errorInterval);
    }, 4000);
}

function peek() {
    if (!queue.length) {
        showError('No data found in queue, 1st enter data then select')
    }

    lastAction = 'Peek';

    bottomDisplayData();

    const peekElement = document.getElementsByClassName('queue-item');
    // const len = peekElement.length;
    if (peekElement.length > 0) {

        Object.assign(peekElement[0].style, {
            border: '2px solid red'
        })
        // Change background color
        // peekElement[0].style.backgroundColor = 'yellow';

        // // Highlight border
        // peekElement[0].style.border = '2px solid red';
    }
    console.log("peekElement: ", peekElement);
}

function bottomDisplayData() {
    const sizeValContainer = document.getElementById('size_max');
    sizeValContainer.innerHTML = `<p style='color:red; margin:0px; padding:0px; z-index:9999;'>${updateLength()}/${size}</p>`

    const frontRear = document.getElementById('front_rear');
    let len = queue.length - 1;
    frontRear.innerHTML = len >= 0 ? `<p>${queue[0]} / ${queue[queue.length - 1]}</p>` : '';

    const lastActionEle = document.getElementById('last_Action');
    lastActionEle.innerHTML = `<p>${lastAction}</p>`
}

function init() {
    setTimeout(() => {
        bottomDisplayData();
    }, 1000);
}