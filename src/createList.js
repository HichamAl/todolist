export {createList}
import {addListToDom} from "./addToDom";

function createList(listName){
    const array = [];
    array.push(listName);
    arrayStorage.push(array);
    addListToDom(arrayStorage.at(-1));
    return;
}
