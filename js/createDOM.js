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

export { divHContainer, divMContainer, inputHEnter, inputHSearch, pHAll, pHCompleted };