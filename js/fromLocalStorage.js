import { amount } from "./script.js";
import { addElement } from "./addElement.js";

export function fromLocalStorage() {
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

    amount.amountAllTime = parseInt(arrKeys.at(-1).slice(4));
}