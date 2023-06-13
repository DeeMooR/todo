const root = document.querySelector('#root');

let sectionHeader = document.createElement('section');
sectionHeader.classList = "header";
root.append(sectionHeader);

let divHContainer = document.createElement('div');
divHContainer.setAttribute('class', 'header__container container');
sectionHeader.append(divHContainer);

let divHRow = document.createElement('div');
divHRow.classList = "header__row";
divHContainer.append(divHRow);

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

divHRow = document.createElement('div');
divHRow.classList = "header__row";
divHContainer.append(divHRow);

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

let sectionMain = document.createElement('section');
sectionMain.classList = "main";
root.append(sectionMain);

let divMContainer = document.createElement('div');
divMContainer.setAttribute('class', 'main__container container');
sectionMain.append(divMContainer);

let divMCell, buttonMCheck, pMText, divMRight, buttonMDel, pMDate;
let amountTodo = 0, amountCheck = 0;

buttonHAdd.addEventListener('click', function() {
    const text = inputHEnter.value;
    if (text === '') return;
    var today = new Date();
    var date = today.toLocaleTimeString();

    divMCell = document.createElement('div');
    divMCell.classList = "main__cell";
    divMContainer.append(divMCell);

    buttonMCheck = document.createElement('button');
    buttonMCheck.classList = "cell__check";
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

    amountTodo++;
    pHAll.innerHTML = 'All: ' + amountTodo;
});

divMContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('cell__check')) {
        if (event.target.innerHTML === '✓') {
            event.target.innerHTML = '';
            event.target.parentElement.classList.remove('check');
            amountCheck--;
            pHCompleted.innerHTML = 'Compleeted: ' + amountCheck;
        } else {
            event.target.innerHTML = '✓';
            event.target.parentElement.classList.add('check');
            amountCheck++;
            pHCompleted.innerHTML = 'Compleeted: ' + amountCheck;
        }
    }

    if (event.target.classList.contains('cell__delete')) {
        let check = event.target.parentElement.previousElementSibling.previousElementSibling;
        if (check.innerHTML === '✓') {
            amountCheck--;
            pHCompleted.innerHTML = 'Compleeted: ' + amountCheck;
        }
        event.target.parentElement.parentElement.remove();
        amountTodo--;
        pHAll.innerHTML = 'All: ' + amountTodo;
    }
});

buttonHDelAll.addEventListener('click', () => {
    while (divMContainer.firstElementChild) {
        divMContainer.firstElementChild.remove();
        amountTodo--;
    }
    pHAll.innerHTML = 'All: ' + amountTodo;
    amountCheck = 0;
    pHCompleted.innerHTML = 'Compleeted: ' + amountCheck;
});
buttonHDelLast.addEventListener('click', () => {
    if (divMContainer.lastChild.firstChild.innerHTML === '✓') {
        amountCheck--;
        pHCompleted.innerHTML = 'Compleeted: ' + amountCheck;
    }
    divMContainer.lastElementChild.remove();
    amountTodo--;
    pHAll.innerHTML = 'All: ' + amountTodo;
});

buttonHShowAll.addEventListener('click', () => {
    for (let i of divMContainer.children) {
        i.style.display = 'flex';
    }
});
buttonHShowCompleted.addEventListener('click', () => {
    for (let i of divMContainer.children) {
        if (!i.classList.contains('check')) {
            i.style.display = 'none';
        }
    }
});

inputHSearch.addEventListener('input', () => {
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
});