import { divHContainer, divMContainer } from "./createDOM.js";
import { cellCheck, cellDelete, addNew, delAll, delLast, showAll, showCompleted, search } from './functions.js';
import { fromLocalStorage } from "./fromLocalStorage.js";
export { amount } from "./amount.js";

if (localStorage.length > 0) {
    fromLocalStorage();
}

divMContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('cell__check')) cellCheck(event.target);
    if (event.target.classList.contains('cell__delete')) cellDelete(event.target);
});

divHContainer.addEventListener('click', (event) => {
    let et = event.target;
    if (et.classList.contains('header__add')) addNew();
    if (et.classList.contains('header__delete-all')) delAll();
    if (et.classList.contains('header__delete-last')) delLast();
    if (et.classList.contains('header__show-all')) showAll();
    if (et.classList.contains('header__show-completed')) showCompleted();
});

divHContainer.addEventListener('input', (event) => {
    let et = event.target;
    if (et.classList.contains('header__search')) search();
});

divHContainer.addEventListener('keydown', (event) => {
    if (event.target.classList.contains('header__enter')) {
        if (event.keyCode === 13) addNew();
    }
});