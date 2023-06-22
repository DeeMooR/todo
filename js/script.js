import { divHContainer, divMContainer } from "./createDOM.js";
import { cellCheck, cellDelete, addNew, delAll, delLast, showAll, showCompleted, search } from './functions.js';
import { fromLocalStorage } from "./fromLocalStorage.js";
export { amount } from "./amount.js";

if (localStorage.length > 0) {
    fromLocalStorage();
}

divMContainer.addEventListener('click', ({ target }) => {
    if (target.classList.contains('cell__check')) cellCheck(target);
    if (target.classList.contains('cell__delete')) cellDelete(target);
});

divHContainer.addEventListener('click', ({ target: { classList } }) => {
    if (classList.contains('header__add')) addNew();
    if (classList.contains('header__delete-all')) delAll();
    if (classList.contains('header__delete-last')) delLast();
    if (classList.contains('header__show-all')) showAll();
    if (classList.contains('header__show-completed')) showCompleted();
});

divHContainer.addEventListener('input', ({ target }) => {
    if (target.classList.contains('header__search')) search();
});

divHContainer.addEventListener('keydown', ({ target, keyCode }) => {
    if (target.classList.contains('header__enter')) {
        if (keyCode === 13) addNew();
    }
});