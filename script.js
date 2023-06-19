const root = document.querySelector('#root');

let sectionHeader = document.createElement('section');
sectionHeader.classList = "header";
root.append(sectionHeader);

let divHContainer = document.createElement('div');
divHContainer.setAttribute('class', 'header__container container');
sectionHeader.append(divHContainer);

let divHRow = document.createElement('div');
divHRow.classList = "header__row";

let buttonHDelAll = document.createElement('button');
buttonHDelAll.classList = "header__delete-all";
buttonHDelAll.innerHTML = 'Delete All';
divHRow.append(buttonHDelAll);
let buttonHDelLast = document.createElement('button');
buttonHDelLast.classList = "header__delete-last";
buttonHDelLast.innerHTML = 'Delete Last';
divHRow.append(buttonHDelLast);
let inputHEnter = document.createElement('input');
inputHEnter.setAttribute('class', 'header__enter');
inputHEnter.setAttribute('type', 'text');
inputHEnter.setAttribute('placeholder', 'Enter todo ...');
divHRow.append(inputHEnter);
let buttonHAdd = document.createElement('button');
buttonHAdd.classList = "header__add";
buttonHAdd.innerHTML = 'Add';
divHRow.append(buttonHAdd);

let pHAll = document.createElement('p');
pHAll.classList = "header__all";
pHAll.innerHTML = 'All: 0';
divHRow.append(pHAll);
let pHCompleted = document.createElement('p');
pHCompleted.classList = "header__completed";
pHCompleted.innerHTML = 'Compleeted: 0';
divHRow.append(pHCompleted);
let buttonHShowAll = document.createElement('button');
buttonHShowAll.classList = "header__show-all";
buttonHShowAll.innerHTML = 'Show All';
divHRow.append(buttonHShowAll);
let buttonHShowCompleted = document.createElement('button');
buttonHShowCompleted.classList = "header__show-completed";
buttonHShowCompleted.innerHTML = 'Show Completed';
divHRow.append(buttonHShowCompleted);
let inputHSearch = document.createElement('input');
inputHSearch.setAttribute('class', 'header__search');
inputHSearch.setAttribute('type', 'text');
inputHSearch.setAttribute('placeholder', 'Search...');
divHRow.append(inputHSearch);

divHContainer.append(divHRow);

let sectionMain = document.createElement('section');
sectionMain.classList = "main";
root.append(sectionMain);

let divMContainer = document.createElement('div');
divMContainer.setAttribute('class', 'main__container container');
sectionMain.append(divMContainer);

let divMCell, buttonMCheck, pMText, divMRight, buttonMDel, pMDate;
let amountTodo = 0, amountCheck = 0, amountAllTime = -1;

function addElement(text, date, bool) {
    divMCell = document.createElement('div');
    divMCell.classList = "main__cell";
    if (bool === true) {
        divMCell.classList.add('check');
        amountCheck++;
        pHCompleted.innerHTML = 'Compleeted: ' + amountCheck;
    }

    buttonMCheck = document.createElement('button');
    buttonMCheck.classList = "cell__check";
    if (bool === true) buttonMCheck.innerHTML = '✓';
    divMCell.append(buttonMCheck);

    pMText = document.createElement('p');
    pMText.classList = "cell__text";
    pMText.innerHTML = text;
    divMCell.append(pMText);

    divMRight = document.createElement('div');
    divMRight.classList = "cell__right";
    divMCell.append(divMRight);

    buttonMDel = document.createElement('button');
    buttonMDel.classList = "cell__delete";
    buttonMDel.innerHTML = 'X';
    divMRight.append(buttonMDel);

    pMDate = document.createElement('p');
    pMDate.classList = "cell__date";
    pMDate.innerHTML = date;
    divMRight.append(pMDate);

    divMContainer.append(divMCell);

    amountTodo++;
    pHAll.innerHTML = 'All: ' + amountTodo;
}

if (localStorage.length > 0) {
    const objOld = {};
    const arrKeys = Object.keys(localStorage);
    arrKeys.sort((a, b) => {
        const numA = parseInt(a.slice(4));
        const numB = parseInt(b.slice(4));
        return numA - numB;
    });
        
    for (let key of arrKeys) {
      let value = localStorage.getItem(key);
      objOld[key] = JSON.parse(value);
    }
    for (let i in objOld) {
        addElement(objOld[i].text, objOld[i].date, objOld[i].check);
    }

    amountAllTime = parseInt(arrKeys.at(-1).slice(4));
}


divMContainer.addEventListener('click', (event) => {
    let et = event.target;
    if (et.classList.contains('cell__check')) cellCheck(et);
    if (et.classList.contains('cell__delete')) cellDelete(et);
});

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
        amountCheck--;
        pHCompleted.innerHTML = 'Compleeted: ' + amountCheck;
    } else {
        et.innerHTML = '✓';
        et.parentElement.classList.add('check');
        amountCheck++;
        pHCompleted.innerHTML = 'Compleeted: ' + amountCheck;
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
        amountCheck--;
        pHCompleted.innerHTML = 'Compleeted: ' + amountCheck;
    }
    et.parentElement.parentElement.remove();
    amountTodo--;
    pHAll.innerHTML = 'All: ' + amountTodo;

    for (let i in objAll) {
        if (et.parentElement.previousElementSibling.innerHTML === objAll[i].text) {
            localStorage.removeItem(i);
        }
    }
}

divHContainer.addEventListener('click', (event) => {
    let et = event.target;
    if (et.classList.contains('header__add')) addNew();
    if (et.classList.contains('header__delete-all')) delAll();
    if (et.classList.contains('header__delete-last')) delLast();
    if (et.classList.contains('header__show-all')) showAll();
    if (et.classList.contains('header__show-completed')) showCompleted();
});

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
    let name = 'todo' + ++amountAllTime;
    let objJSON = JSON.stringify(obj);
    localStorage.setItem(name, objJSON);
    addElement(text, date, false);
}
function delAll() {
    divMContainer.innerHTML = '';
    localStorage.clear();
    amountTodo = 0;
    pHAll.innerHTML = 'All: ' + amountTodo;
    amountCheck = 0;
    pHCompleted.innerHTML = 'Compleeted: ' + amountCheck;
    amountAllTime = -1;
}
function delLast() {
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

    if (divMContainer.lastChild.firstChild.innerHTML === '✓') {
        amountCheck--;
        pHCompleted.innerHTML = 'Compleeted: ' + amountCheck;
    }
    divMContainer.lastElementChild.remove();
    amountTodo--;
    pHAll.innerHTML = 'All: ' + amountTodo;
}
function showAll() {
    for (let i of divMContainer.children) {
        i.style.display = 'flex';
    }
}
function showCompleted() {
    for (let i of divMContainer.children) {
        if (!i.classList.contains('check')) {
            i.style.display = 'none';
        }
    }
}

divHContainer.addEventListener('input', (event) => {
    let et = event.target;
    if (et.classList.contains('header__search')) search();
});

function search() {
    let inputValue = inputHSearch.value;
    if (inputValue.length > 2) {
        const cellTexts = document.getElementsByClassName('cell__text');
        for (let i = 0; i < cellTexts.length; i++) {
            const text = cellTexts[i].innerHTML;
            if (text.includes(inputValue)) {
                cellTexts[i].parentElement.style.display = 'flex';
            } else {
                cellTexts[i].parentElement.style.display = 'none';
            }
        }      
    } else {
        for (let i of divMContainer.children) {
            i.style.display = 'flex';
        }
    }
}

divHContainer.addEventListener('keydown', (event) => {
    if (event.target.classList.contains('header__enter')) {
        if (event.keyCode === 13) addNew();
    }
});