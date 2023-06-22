function cellCheck(et) {
    const arrKeys = Object.keys(localStorage);
    const objAll = {};
    for (let key of arrKeys) {
      let value = localStorage.getItem(key);
      objAll[key] = JSON.parse(value);
    }

    if (et.innerHTML === '✓') {
        et.innerHTML = '';
        et.parentElement.classList.remove('check');
        amount.amountCheck--;
        pHCompleted.innerHTML = 'Compleeted: ' + amount.amountCheck;
    } else {
        et.innerHTML = '✓';
        et.parentElement.classList.add('check');
        amount.amountCheck++;
        pHCompleted.innerHTML = 'Compleeted: ' + amount.amountCheck;
    }

    for (let i in objAll) {
        if (et.nextElementSibling.innerHTML === objAll[i].text) {
            if (et.innerHTML === '') objAll[i].check = false;
            else objAll[i].check = true;
            let objJSON = JSON.stringify(objAll[i]);  
            localStorage.setItem(i, objJSON);
        }
    }
}
function cellDelete(et) {
    const arrKeys = Object.keys(localStorage);
    const objAll = {};
    for (let key of arrKeys) {
      let value = localStorage.getItem(key);
      objAll[key] = JSON.parse(value);
    }

    let check = et.parentElement.previousElementSibling.previousElementSibling;
    if (check.innerHTML === '✓') {
        amount.amountCheck--;
        pHCompleted.innerHTML = 'Compleeted: ' + amount.amountCheck;
    }
    et.parentElement.parentElement.remove();
    amount.amountTodo--;
    pHAll.innerHTML = 'All: ' + amount.amountTodo;

    for (let i in objAll) {
        if (et.parentElement.previousElementSibling.innerHTML === objAll[i].text) {
            localStorage.removeItem(i);
        }
    }
}

function addNew() {
    const arrKeys = Object.keys(localStorage);
    const objAll = {};
    for (let key of arrKeys) {
      let value = localStorage.getItem(key);
      objAll[key] = JSON.parse(value);
    }

    const text = inputHEnter.value;
    if (text === '') return;
    for (let i in objAll) {
        if (text === objAll[i].text) return;
    }
    let today = new Date();
    let date = today.toLocaleTimeString();

    const obj = {
        text: '',
        date: '',
        check: false,
        setText: function(text) {
            this.text = text;
        },
        setDate: function(date) {
            this.date = date;
        },
    };
    obj.setText(text);
    obj.setDate(date);
    let name = 'todo' + ++amount.amountAllTime;
    let objJSON = JSON.stringify(obj);
    localStorage.setItem(name, objJSON);
    addElement(text, date, false);
}
function delAll() {
    divMContainer.innerHTML = '';
    localStorage.clear();
    amount.amountTodo = 0;
    pHAll.innerHTML = 'All: ' + amount.amountTodo;
    amount.amountCheck = 0;
    pHCompleted.innerHTML = 'Compleeted: ' + amount.amountCheck;
    amount.amountAllTime = -1;
}
function delLast() {
    if (divMContainer.lastElementChild === null) return;
    const arrKeys = Object.keys(localStorage);
    const objAll = {};
    for (let key of arrKeys) {
      let value = localStorage.getItem(key);
      objAll[key] = JSON.parse(value);
    }
    for (let i in objAll) {
        if (divMContainer.lastElementChild.children[1].innerHTML === objAll[i].text) {
            localStorage.removeItem(i);
        }
    }
    if (divMContainer.lastElementChild.firstElementChild.innerHTML === '✓') {
        amount.amountCheck--;
        pHCompleted.innerHTML = 'Compleeted: ' + amount.amountCheck;
    }
    divMContainer.lastElementChild.remove();
    amount.amountTodo--;
    pHAll.innerHTML = 'All: ' + amount.amountTodo;
}
function showAll() {
    for (let i of divMContainer.children) {
        i.style.display = 'flex';
    }
    amount.btnCompleted = 0;
}
function showCompleted() {
    for (let i of divMContainer.children) {
        if (!i.classList.contains('check')) {
            i.style.display = 'none';
        }
    }
    amount.btnCompleted = 1;
}

function search() {
    let inputValue = inputHSearch.value;
    if (inputValue.length > 2) {
        const cellTexts = document.getElementsByClassName('cell__text');
        for (let i = 0; i < cellTexts.length; i++) {
            if (amount.btnCompleted && !cellTexts[i].parentElement.classList.contains('check')) continue;
            const text = cellTexts[i].innerHTML;
            if (text.includes(inputValue)) {
                cellTexts[i].parentElement.style.display = 'flex';
            } else {
                cellTexts[i].parentElement.style.display = 'none';
            }
        }      
    } else {
        for (let i of divMContainer.children) {
            if (amount.btnCompleted) {
                if (i.classList.contains('check')) i.style.display = 'flex';
                else i.style.display = 'none';
            } else {
                i.style.display = 'flex';
            }
        }
    }
}

import { divMContainer, inputHEnter, inputHSearch, pHAll, pHCompleted } from "./createDOM.js";
import { amount } from "./script.js";
import { addElement } from "./addElement.js";
export { cellCheck, cellDelete, addNew, delAll, delLast, showAll, showCompleted, search };