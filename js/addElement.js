let divMCell, buttonMCheck, pMText, divMRight, buttonMDel, pMDate;
function addElement(text, date, bool) {
    divMCell = document.createElement('div');
    divMCell.classList = "main__cell";
    if (bool === true) {
        divMCell.classList.add('check');
        amount.amountCheck++;
        pHCompleted.innerHTML = 'Compleeted: ' + amount.amountCheck;
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

    amount.amountTodo++;
    pHAll.innerHTML = 'All: ' + amount.amountTodo;
}

import { amount } from "./script.js";
import { divMContainer, pHAll, pHCompleted } from "./createDOM.js";
export { addElement };